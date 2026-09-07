import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import type { PhotoPoint } from '../../types/photo'
import { FitBounds } from './FitBounds'
import { PhotoMarkers } from './PhotoMarkers'
import { TrackPolyline } from './TrackPolyline'

interface MapViewProps {
  photos: PhotoPoint[]
  selectedPhotoId: string | null
  onSelect: (id: string) => void
}

const DEFAULT_CENTER: [number, number] = [35.681236, 139.767125] // Tokyo Station

export function MapView({ photos, selectedPhotoId, onSelect }: MapViewProps) {
  const positions = photos.map((p) => p.position)

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={5} className="map-view">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TrackPolyline positions={positions} />
      <PhotoMarkers photos={photos} selectedPhotoId={selectedPhotoId} onSelect={onSelect} />
      <FitBounds positions={positions} />
    </MapContainer>
  )
}
