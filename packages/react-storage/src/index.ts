import { useEffect, useState } from 'react'

/* eslint-disable react-hooks/rules-of-hooks */
export const useStorageFactory = (storage: Storage) => <T>(
  key: string,
  initValue?: T,
) => {
  const state = useState<T>(() => {
    const value = storage.getItem(key)
    return value === null ? initValue : JSON.parse(value)
  })
  useEffect(() => storage.setItem(key, JSON.stringify(state[0])))
  return state
}

export const useLocalStorage = useStorageFactory(localStorage)

export const useSessionStorage = useStorageFactory(sessionStorage)
