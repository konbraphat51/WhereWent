import { create } from 'zustand'
import type { PhotoPoint, RejectedPhoto } from '../types/photo'
import { loadPhotos } from '../utils/loadPhotos'

interface PhotoStoreState {
  photos: PhotoPoint[]
  rejected: RejectedPhoto[]
  selectedPhotoId: string | null
  isProcessing: boolean
  progress: { done: number; total: number }
  addFiles: (files: File[]) => Promise<void>
  selectPhoto: (id: string | null) => void
  clear: () => void
}

export const usePhotoStore = create<PhotoStoreState>((set, get) => ({
  photos: [],
  rejected: [],
  selectedPhotoId: null,
  isProcessing: false,
  progress: { done: 0, total: 0 },

  addFiles: async (files) => {
    set({ isProcessing: true, progress: { done: 0, total: files.length } })

    const { photos: newPhotos, rejected: newRejected } = await loadPhotos(files, (done, total) => {
      set({ progress: { done, total } })
    })

    const merged = [...get().photos, ...newPhotos].sort(
      (a, b) => a.takenAt.getTime() - b.takenAt.getTime(),
    )

    set((state) => ({
      photos: merged,
      rejected: [...state.rejected, ...newRejected],
      isProcessing: false,
    }))
  },

  selectPhoto: (id) => set({ selectedPhotoId: id }),

  clear: () => {
    for (const photo of get().photos) {
      URL.revokeObjectURL(photo.previewUrl)
    }
    set({ photos: [], rejected: [], selectedPhotoId: null })
  },
}))
