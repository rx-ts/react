import QRious, { QRiousOptions } from 'qrious'
import { useEffect, useState } from 'react'

export const useQrious = (options: QRiousOptions): [string, QRious] => {
  const [qrious] = useState(() => new QRious(options))
  const [dataUrl, setDataUrl] = useState(() => qrious.toDataURL(options.mime))
  useEffect(() => {
    qrious.set(options)
    setDataUrl(qrious.toDataURL(options.mime))
  }, [options, qrious])
  return [dataUrl, qrious]
}
