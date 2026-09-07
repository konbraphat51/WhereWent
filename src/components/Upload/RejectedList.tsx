import { useState } from 'react'
import type { RejectedPhoto } from '../../types/photo'

interface RejectedListProps {
  rejected: RejectedPhoto[]
}

export function RejectedList({ rejected }: RejectedListProps) {
  const [isOpen, setIsOpen] = useState(false)
  if (rejected.length === 0) return null

  return (
    <div className="rejected-list">
      <button type="button" className="rejected-list__toggle" onClick={() => setIsOpen((v) => !v)}>
        ⚠️ {rejected.length} 件の写真を読み込めませんでした {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && (
        <ul className="rejected-list__items">
          {rejected.map((item) => (
            <li key={item.fileName}>
              <span className="rejected-list__name">{item.fileName}</span>
              <span className="rejected-list__reason">{item.reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
