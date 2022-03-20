import { QRiousOptions } from 'qrious'
import React, { HTMLAttributes } from 'react'

import { useQrious } from './use-qrious.js'

export type QriousProps = Omit<HTMLAttributes<HTMLImageElement>, 'src'> &
  QRiousOptions

export const QRious: React.FC<QriousProps> = ({
  background,
  backgroundAlpha,
  foreground,
  foregroundAlpha,
  level,
  mime,
  padding,
  value,
  size,
  ...props
}) => {
  const [dataUrl] = useQrious({
    background,
    backgroundAlpha,
    foreground,
    foregroundAlpha,
    level,
    mime,
    padding,
    size,
    value,
  })
  return React.createElement('img', {
    ...props,
    src: dataUrl,
  })
}
