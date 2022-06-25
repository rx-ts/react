/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback, useEffect, useRef, useState } from 'react'

import { parseJsonFallback } from './helper.js'
import { Nilable } from './types.js'

export const useStorageFactory =
  (storage: Storage, listener?: boolean) =>
  <T>(key: string, defaultValue?: Nilable<T>) => {
    const defaultValueRef = useRef(defaultValue)
    defaultValueRef.current = defaultValue

    const [value, setValue] = useState<Nilable<T>>(() =>
      parseJsonFallback(storage.getItem(key), defaultValueRef.current),
    )

    const onChange = useCallback(
      (value: Nilable<T>) => {
        setValue(value)
        if (value == null) {
          storage.removeItem(key)
        } else {
          storage.setItem(key, JSON.stringify(value))
        }
      },
      [key, setValue],
    )

    useEffect(() => {
      let storageHandler: ((ev: StorageEvent) => void) | undefined
      if (listener) {
        window.addEventListener(
          'storage',
          (storageHandler = ev =>
            ev.key === key &&
            setValue(parseJsonFallback(ev.newValue, defaultValueRef.current))),
        )
      }
      return () => {
        if (storageHandler) {
          window.removeEventListener('storage', storageHandler)
        }
      }
    }, [key])

    return [value, onChange]
  }

export const useLocalStorage = useStorageFactory(localStorage, true)

export const useSessionStorage = useStorageFactory(sessionStorage)
