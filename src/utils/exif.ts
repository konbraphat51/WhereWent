import exifr from 'exifr'
import type { GeoPosition } from '../types/photo'

export interface ExtractedExif {
  position: GeoPosition
  /** Undefined when EXIF has no capture time; callers should fall back to file metadata. */
  takenAt: Date | undefined
}

/**
 * Reads GPS coordinates and capture time from a photo's EXIF data.
 * Throws only when GPS position is missing — location is required to plot the
 * photo, while a missing capture time can be filled in from file metadata instead.
 */
// Some HEIC files (e.g. Samsung camera output) carry a large metadata box that
// sits beyond exifr's default chunked read window, which silently drops GPS
// data. Setting firstChunkSize above any realistic photo size makes exifr read
// the whole file in one go instead of guessing how much it needs.
const READ_ENTIRE_FILE_CHUNK_SIZE = 200 * 1024 * 1024

export async function extractExif(file: File): Promise<ExtractedExif> {
  const data = await exifr.parse(file, {
    firstChunkSize: READ_ENTIRE_FILE_CHUNK_SIZE,
    gps: true,
    pick: ['latitude', 'longitude', 'GPSAltitude', 'DateTimeOriginal', 'CreateDate', 'ModifyDate'],
  })

  if (!data || typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
    throw new Error('No GPS data found')
  }

  const takenAt: Date | undefined = data.DateTimeOriginal ?? data.CreateDate ?? data.ModifyDate
  const isValidDate = takenAt && !Number.isNaN(takenAt.getTime())

  return {
    position: {
      lat: data.latitude,
      lng: data.longitude,
      altitude: typeof data.GPSAltitude === 'number' ? data.GPSAltitude : undefined,
    },
    takenAt: isValidDate ? takenAt : undefined,
  }
}
