import { useEffect, useRef } from 'react'
import type { PhotoPoint } from '../../types/photo'
import { TimelineItem } from './TimelineItem'

interface TimelineProps {
  photos: PhotoPoint[]
  selectedPhotoId: string | null
  onSelect: (id: string) => void
}

export function Timeline({ photos, selectedPhotoId, onSelect }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedPhotoId) return
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-photo-id="${selectedPhotoId}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selectedPhotoId])

  if (photos.length === 0) return null

  return (
    <div className="timeline" ref={containerRef}>
      {photos.map((photo) => (
        <div key={photo.id} data-photo-id={photo.id}>
          <TimelineItem photo={photo} isSelected={photo.id === selectedPhotoId} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}
