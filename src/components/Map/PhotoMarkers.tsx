import type { PhotoPoint } from '../../types/photo'
import { PhotoMarker } from './PhotoMarker'

interface PhotoMarkersProps {
  photos: PhotoPoint[]
  selectedPhotoId: string | null
  onSelect: (id: string) => void
}

export function PhotoMarkers({ photos, selectedPhotoId, onSelect }: PhotoMarkersProps) {
  return (
    <>
      {photos.map((photo) => (
        <PhotoMarker
          key={photo.id}
          photo={photo}
          isSelected={photo.id === selectedPhotoId}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
