import { useShallow } from 'zustand/react/shallow'
import { Header } from './components/Header/Header'
import { MapView } from './components/Map/MapView'
import { StatsBar } from './components/Stats/StatsBar'
import { Timeline } from './components/Timeline/Timeline'
import { ProcessingIndicator } from './components/Upload/ProcessingIndicator'
import { RejectedList } from './components/Upload/RejectedList'
import { UploadDropzone } from './components/Upload/UploadDropzone'
import { EmptyState } from './components/Common/EmptyState'
import { usePhotoStore } from './store/usePhotoStore'
import './App.css'

function App() {
  const { photos, rejected, selectedPhotoId, isProcessing, progress, addFiles, selectPhoto, clear } =
    usePhotoStore(
      useShallow((state) => ({
        photos: state.photos,
        rejected: state.rejected,
        selectedPhotoId: state.selectedPhotoId,
        isProcessing: state.isProcessing,
        progress: state.progress,
        addFiles: state.addFiles,
        selectPhoto: state.selectPhoto,
        clear: state.clear,
      })),
    )

  const hasPhotos = photos.length > 0

  return (
    <div className="app">
      <Header hasPhotos={hasPhotos} onClear={clear} />

      <aside className="app-sidebar">
        <UploadDropzone onFilesSelected={addFiles} disabled={isProcessing} />
        <ProcessingIndicator done={progress.done} total={progress.total} />
        <RejectedList rejected={rejected} />
        <StatsBar photos={photos} />
      </aside>

      <main className="app-main">
        {hasPhotos ? (
          <MapView photos={photos} selectedPhotoId={selectedPhotoId} onSelect={selectPhoto} />
        ) : (
          <EmptyState />
        )}
      </main>

      <Timeline photos={photos} selectedPhotoId={selectedPhotoId} onSelect={selectPhoto} />
    </div>
  )
}

export default App
