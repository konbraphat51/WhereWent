import { Polyline } from 'react-leaflet'
import type { GeoPosition } from '../../types/photo'

interface TrackPolylineProps {
  positions: GeoPosition[]
}

export function TrackPolyline({ positions }: TrackPolylineProps) {
  if (positions.length < 2) return null

  return (
    <Polyline
      positions={positions.map((p) => [p.lat, p.lng])}
      pathOptions={{ color: '#2563eb', weight: 3, opacity: 0.8, dashArray: '6 6' }}
    />
  )
}
