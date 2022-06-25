import { useEffect, useRef, useState } from 'react'

export const useComputed = <T>(value: T | (() => T), deps: unknown[]) => {
  const ref = useRef(false)
  const [result, setResult] = useState<T>(value)

  useEffect(() => {
    if (!ref.current) {
      ref.current = true
      return
    }
    setResult(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- obviously, we can't static analyse the `deps`
  }, deps)

  return result
}
