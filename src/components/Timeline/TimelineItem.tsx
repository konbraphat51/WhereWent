import type { PhotoPoint } from '../../types/photo'
import { formatTime } from '../../utils/format'

interface TimelineItemProps {
  photo: PhotoPoint
  isSelected: boolean
  onSelect: (id: string) => void
}

export function TimelineItem({ photo, isSelected, onSelect }: TimelineItemProps) {
  return (
    <button
      type="button"
      className={`timeline-item${isSelected ? ' timeline-item--selected' : ''}`}
      onClick={() => onSelect(photo.id)}
    >
      <img src={photo.previewUrl} alt={photo.fileName} className="timeline-item__thumb" />
      <span className="timeline-item__time">{formatTime(photo.takenAt)}</span>
    </button>
  )
}
