const HEIC_EXTENSIONS = /\.(heic|heif)$/i
const HEIC_MIME_TYPES = new Set(['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'])

export function isHeicFile(file: File): boolean {
  return HEIC_MIME_TYPES.has(file.type) || HEIC_EXTENSIONS.test(file.name)
}

/** Returns a Blob that the browser can render natively (JPEG), converting HEIC/HEIF if needed. */
export async function toDisplayableBlob(file: File): Promise<Blob> {
  if (!isHeicFile(file)) {
    return file
  }

  const heic2any = (await import('heic2any')).default
  const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 })
  return Array.isArray(converted) ? converted[0] : converted
}
