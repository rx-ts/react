import QRCode, { QRCodeToDataURLOptions } from 'qrcode'
import { useEffect, useState } from 'react'

import { QRCodeOptions, QRCodeValue, _QRCodeValue } from './types.js'

export const isQRCodeValue = (
  valueOrOptions: unknown,
): valueOrOptions is QRCodeValue =>
  typeof valueOrOptions === 'string' || Array.isArray(valueOrOptions)

export const useQRCode = (valueOrOptions: QRCodeOptions | QRCodeValue) => {
  const [dataURL, setDataURL] = useState<string>()
  useEffect(() => {
    const isValue = isQRCodeValue(valueOrOptions)
    const value = (
      isValue ? valueOrOptions : valueOrOptions.value
    ) as _QRCodeValue
    let options: QRCodeToDataURLOptions | undefined
    if (!isValue) {
      const { quality, ...props } = valueOrOptions
      options = Object.assign(props, {
        renderOptions: {
          quality,
        },
      })
    }

    if (!value) {
      return setDataURL('')
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    QRCode.toDataURL(value, options).then(setDataURL)
  }, [valueOrOptions])
  return dataURL
}
