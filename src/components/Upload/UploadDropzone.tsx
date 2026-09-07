import { useRef, useState } from 'react'
import type { DragEvent } from 'react'

const ACCEPTED_EXTENSIONS = /\.(png|jpe?g|heic|heif)$/i

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

function filterImageFiles(fileList: FileList | null): File[] {
  if (!fileList) return []
  return Array.from(fileList).filter((file) => ACCEPTED_EXTENSIONS.test(file.name))
}

export function UploadDropzone({ onFilesSelected, disabled }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    const files = filterImageFiles(event.dataTransfer.files)
    if (files.length > 0) onFilesSelected(files)
  }

  return (
    <div
      className={`dropzone${isDragOver ? ' dropzone--active' : ''}${disabled ? ' dropzone--disabled' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        if (!disabled) setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.heic,.heif,image/png,image/jpeg,image/heic,image/heif"
        multiple
        hidden
        disabled={disabled}
        onChange={(event) => {
          const files = filterImageFiles(event.target.files)
          if (files.length > 0) onFilesSelected(files)
          event.target.value = ''
        }}
      />
      <span className="dropzone__icon">📍</span>
      <p className="dropzone__title">Drag & drop photos here</p>
      <p className="dropzone__subtitle">or click to choose files (PNG / JPG / HEIC)</p>
    </div>
  )
}
