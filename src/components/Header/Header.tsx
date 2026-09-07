interface HeaderProps {
  hasPhotos: boolean
  onClear: () => void
}

export function Header({ hasPhotos, onClear }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">🧭</span>
        <h1>WhereWent</h1>
      </div>
      {hasPhotos && (
        <button type="button" className="app-header__clear" onClick={onClear}>
          クリア
        </button>
      )}
    </header>
  )
}
