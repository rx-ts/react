import { QRCodeSegment as _QRCodeSegment, QRCodeToDataURLOptions } from 'qrcode'

export const LEVELS = [
  'low',
  'medium',
  'quartile',
  'high',
  'L',
  'M',
  'Q',
  'H',
] as const

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const MASK_PATTERNS = [0, 1, 2, 3, 4, 5, 6, 7] as const

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type MaskPattern = typeof MASK_PATTERNS[number]

export const MODES = [
  'auto',
  'alphanumeric',
  'numeric',
  'kanji',
  'byte',
] as const

export const TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type QRCodeMode = typeof MODES[number]
export type _QRCodeValue = string | _QRCodeSegment[]

export interface QRCodeSegment {
  data: string
  mode?: QRCodeMode | null
}

export type QRCodeValue = string | QRCodeSegment[]

export type QRCodeOptions = Omit<QRCodeToDataURLOptions, 'rendererOpts'> & {
  maskPattern?: MaskPattern
  quality?: number
  value: QRCodeValue
}
