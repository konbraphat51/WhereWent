import type { GeoPosition } from '../types/photo'

const EARTH_RADIUS_KM = 6371

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/** Great-circle distance between two points, in kilometers. */
export function haversineDistanceKm(a: GeoPosition, b: GeoPosition): number {
  const dLat = toRadians(b.lat - a.lat)
  const dLng = toRadians(b.lng - a.lng)
  const lat1 = toRadians(a.lat)
  const lat2 = toRadians(b.lat)

  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}

/** Total length of the path connecting points in order, in kilometers. */
export function totalTrackDistanceKm(positions: GeoPosition[]): number {
  let total = 0
  for (let i = 1; i < positions.length; i++) {
    total += haversineDistanceKm(positions[i - 1], positions[i])
  }
  return total
}
