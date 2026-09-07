interface ProcessingIndicatorProps {
  done: number
  total: number
}

export function ProcessingIndicator({ done, total }: ProcessingIndicatorProps) {
  if (total === 0) return null
  const percent = Math.round((done / total) * 100)

  return (
    <div className="processing">
      <div className="processing__bar">
        <div className="processing__bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="processing__label">
        Analyzing photos… {done} / {total}
      </span>
    </div>
  )
}
