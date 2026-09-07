import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { GeoPosition } from '../../types/photo'

interface FitBoundsProps {
  positions: GeoPosition[]
}

/** Pans/zooms the map to contain every position whenever the set of positions changes. */
export function FitBounds({ positions }: FitBoundsProps) {
  const map = useMap()

  useEffect(() => {
    if (positions.length === 0) return

    if (positions.length === 1) {
      map.setView([positions[0].lat, positions[0].lng], 13)
      return
    }

    map.fitBounds(
      positions.map((p) => [p.lat, p.lng]),
      { padding: [48, 48] },
    )
  }, [map, positions])

  return null
}
