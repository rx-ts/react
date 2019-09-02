import { QRiousOptions } from 'qrious'
import React, { HTMLAttributes } from 'react'

import { useQrious } from './use-qrious'

export type QriousProps = QRiousOptions &
  Omit<HTMLAttributes<HTMLImageElement>, 'src'>

export const QRious: React.FC<QriousProps> = props => {
  const [dataUrl] = useQrious(props)
  return <img {...props} src={dataUrl} />
}
