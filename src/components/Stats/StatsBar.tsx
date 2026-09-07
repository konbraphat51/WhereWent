import { useMemo } from 'react'
import type { PhotoPoint } from '../../types/photo'
import { formatDateTime, formatDistanceKm } from '../../utils/format'
import { totalTrackDistanceKm } from '../../utils/geo'

interface StatsBarProps {
  photos: PhotoPoint[]
}

export function StatsBar({ photos }: StatsBarProps) {
  const distanceKm = useMemo(() => totalTrackDistanceKm(photos.map((p) => p.position)), [photos])

  if (photos.length === 0) return null

  const first = photos[0]
  const last = photos[photos.length - 1]

  return (
    <div className="stats-bar">
      <div className="stats-bar__item">
        <span className="stats-bar__value">{photos.length}</span>
        <span className="stats-bar__label">photos</span>
      </div>
      <div className="stats-bar__item">
        <span className="stats-bar__value">{formatDistanceKm(distanceKm)}</span>
        <span className="stats-bar__label">traveled</span>
      </div>
      <div className="stats-bar__item stats-bar__item--range">
        <span className="stats-bar__label">{formatDateTime(first.takenAt)}</span>
        <span className="stats-bar__arrow">→</span>
        <span className="stats-bar__label">{formatDateTime(last.takenAt)}</span>
      </div>
    </div>
  )
}
