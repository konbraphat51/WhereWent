export interface GeoPosition {
  lat: number
  lng: number
  altitude?: number
}

export interface PhotoPoint {
  id: string
  fileName: string
  position: GeoPosition
  takenAt: Date
  /** Object URL usable directly in an <img> tag (converted from HEIC if needed). */
  previewUrl: string
}

export interface RejectedPhoto {
  fileName: string
  reason: string
}
