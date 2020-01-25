import QRCode, { QRCodeToDataURLOptions } from 'qrcode'
import { useEffect, useState } from 'react'

import { QRCodeOptions, QRCodeValue, _QRCodeValue } from './types'

export const isQRCodeValue = (
  valueOrOptions: unknown,
): valueOrOptions is QRCodeValue =>
  typeof valueOrOptions === 'string' || Array.isArray(valueOrOptions)

export const useQRCode = (valueOrOptions: QRCodeValue | QRCodeOptions) => {
  const [dataURL, setDataURL] = useState<string>()
  useEffect(() => {
    const isValue = isQRCodeValue(valueOrOptions)
    const value = (isValue
      ? valueOrOptions
      : (valueOrOptions as QRCodeOptions).value) as _QRCodeValue
    let options: QRCodeToDataURLOptions | undefined
    if (!isValue) {
      const { quality, ...props } = valueOrOptions as QRCodeOptions
      options = Object.assign(props, {
        renderOptions: {
          quality,
        },
      })
    }

    if (!value) {
      return setDataURL(undefined)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    QRCode.toDataURL(value, options).then(setDataURL)
  }, [valueOrOptions])
  return dataURL
}
