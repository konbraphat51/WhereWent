import { useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import type { PhotoPoint } from '../../types/photo'
import { formatDateTime } from '../../utils/format'
import { createPhotoIcon } from './photoIcon'

interface PhotoMarkerProps {
  photo: PhotoPoint
  isSelected: boolean
  onSelect: (id: string) => void
}

export function PhotoMarker({ photo, isSelected, onSelect }: PhotoMarkerProps) {
  const icon = useMemo(() => createPhotoIcon(isSelected), [isSelected])

  return (
    <Marker
      position={[photo.position.lat, photo.position.lng]}
      icon={icon}
      eventHandlers={{ click: () => onSelect(photo.id) }}
    >
      <Popup>
        <div className="photo-popup">
          <img src={photo.previewUrl} alt={photo.fileName} />
          <div className="photo-popup__caption">
            <span className="photo-popup__name">{photo.fileName}</span>
            <span className="photo-popup__time">{formatDateTime(photo.takenAt)}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
