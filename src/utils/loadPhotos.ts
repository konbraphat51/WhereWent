import type { PhotoPoint, RejectedPhoto } from '../types/photo'
import { extractExif } from './exif'
import { toDisplayableBlob } from './heic'

export interface LoadPhotosResult {
  photos: PhotoPoint[]
  rejected: RejectedPhoto[]
}

async function loadOnePhoto(file: File): Promise<PhotoPoint> {
  const { position, takenAt } = await extractExif(file)
  const displayableBlob = await toDisplayableBlob(file)
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

  await Promise.all(
    files.map(async (file) => {
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
    }),
  )

  photos.sort((a, b) => a.takenAt.getTime() - b.takenAt.getTime())
  return { photos, rejected }
}
