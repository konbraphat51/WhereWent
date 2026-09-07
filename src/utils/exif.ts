import exifr from 'exifr'
import type { GeoPosition } from '../types/photo'

export interface ExtractedExif {
  position: GeoPosition
  takenAt: Date
}

/**
 * Reads GPS coordinates and capture time from a photo's EXIF data.
 * Throws if either piece of information is missing.
 */
export async function extractExif(file: File): Promise<ExtractedExif> {
  const data = await exifr.parse(file, {
    gps: true,
    pick: ['latitude', 'longitude', 'GPSAltitude', 'DateTimeOriginal', 'CreateDate', 'ModifyDate'],
  })

  if (!data || typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
    throw new Error('GPS情報が見つかりませんでした')
  }

  const takenAt: Date | undefined = data.DateTimeOriginal ?? data.CreateDate ?? data.ModifyDate
  if (!takenAt || Number.isNaN(takenAt.getTime())) {
    throw new Error('撮影日時が見つかりませんでした')
  }

  return {
    position: {
      lat: data.latitude,
      lng: data.longitude,
      altitude: typeof data.GPSAltitude === 'number' ? data.GPSAltitude : undefined,
    },
    takenAt,
  }
}
