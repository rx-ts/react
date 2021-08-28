/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'

export const useStorageFactory =
  (storage: Storage) =>
  <T>(key: string, initValue?: T | null) => {
    const state = useState<T | null | undefined>(() => {
      const value = storage.getItem(key)
      return value == null ? initValue : (JSON.parse(value) as T)
    })
    useEffect(
      () => storage.setItem(key, JSON.stringify(state[0])),
      [key, state],
    )
    return state
  }

export const useLocalStorage = useStorageFactory(localStorage)

export const useSessionStorage = useStorageFactory(sessionStorage)
