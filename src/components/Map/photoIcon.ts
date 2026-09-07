import L from 'leaflet'

export function createPhotoIcon(isSelected: boolean): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<span class="photo-marker${isSelected ? ' photo-marker--selected' : ''}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}
