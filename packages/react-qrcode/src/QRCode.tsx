import React, { HTMLAttributes } from 'react'

import { QRCodeOptions } from './types'
import { useQRCode } from './useQRCode'

export type QRCodeProps = QRCodeOptions &
  Omit<HTMLAttributes<HTMLImageElement>, 'color' | 'src'>

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
}) => (
  <img
    {...props}
    src={useQRCode({
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
    })}
  />
)
