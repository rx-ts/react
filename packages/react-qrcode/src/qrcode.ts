import React, { HTMLAttributes } from 'react'

import { QRCodeOptions } from './types.js'
import { useQRCode } from './use-qrcode.js'

export type QRCodeProps = Omit<
  HTMLAttributes<HTMLImageElement>,
  'color' | 'src'
> &
  QRCodeOptions

export const QRCode: React.FC<QRCodeProps> = ({
  color,
  errorCorrectionLevel,
  margin,
  maskPattern,
  quality,
  scale,
  toSJISFunc,
  type,
  value,
  version,
  width,
  ...props
}) =>
  React.createElement('img', {
    ...props,
    src: useQRCode({
      color,
      errorCorrectionLevel,
      margin,
      maskPattern,
      quality,
      scale,
      toSJISFunc,
      type,
      value,
      version,
      width,
    }),
  })
