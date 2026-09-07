import type { PhotoPoint, RejectedPhoto } from '../types/photo'
import { mapWithConcurrencyLimit } from './concurrency'
import { extractExif } from './exif'
import { toDisplayableBlob } from './heic'
import { withTimeout } from './withTimeout'

export interface LoadPhotosResult {
  photos: PhotoPoint[]
  rejected: RejectedPhoto[]
}

// HEIC conversion runs a WASM decoder per file; too many at once exhausts
// memory and can hang the tab silently, so files are processed in small batches.
const CONCURRENCY_LIMIT = 4

// Guards against a single corrupt/unsupported file stalling one of the
// concurrency slots forever and stopping the whole batch from finishing.
const PER_FILE_TIMEOUT_MS = 30_000

async function loadOnePhoto(file: File): Promise<PhotoPoint> {
  const { position, takenAt } = await extractExif(file)
  const displayableBlob = await withTimeout(
    toDisplayableBlob(file),
    PER_FILE_TIMEOUT_MS,
    'Timed out converting image',
  )
  const previewUrl = URL.createObjectURL(displayableBlob)

  return {
    id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
    fileName: file.name,
    position,
    takenAt: takenAt ?? new Date(file.lastModified),
    previewUrl,
  }
}

/** Processes a batch of image files, separating those with usable location/time data from the rest. */
export async function loadPhotos(
  files: File[],
  onProgress?: (done: number, total: number) => void,
): Promise<LoadPhotosResult> {
  const photos: PhotoPoint[] = []
  const rejected: RejectedPhoto[] = []
  let done = 0

  await mapWithConcurrencyLimit(files, CONCURRENCY_LIMIT, async (file) => {
    try {
      photos.push(await loadOnePhoto(file))
    } catch (error) {
      rejected.push({
        fileName: file.name,
        reason: error instanceof Error ? error.message : 'Failed to load',
      })
    } finally {
      done += 1
      onProgress?.(done, files.length)
    }
  })

  photos.sort((a, b) => a.takenAt.getTime() - b.takenAt.getTime())
  return { photos, rejected }
}
