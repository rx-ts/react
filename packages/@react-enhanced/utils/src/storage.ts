function normalize(
  jsonOrStorage: Storage | boolean = false,
  storage: Storage = localStorage,
) {
  const isJson = typeof jsonOrStorage === 'boolean'
  const json = isJson ? jsonOrStorage : false
  return { json, storage: isJson ? storage : jsonOrStorage }
}

export function getStorage<T extends string = string>(
  key: string,
  json?: false,
  storage?: Storage,
): T | null
export function getStorage<T extends string = string>(
  key: string,
  storage: Storage,
): T | null
export function getStorage<T = unknown>(
  key: string,
  json: true,
  storage?: Storage,
): T | null
export function getStorage<T = unknown>(
  key: string,
  jsonOrStorage?: Storage | boolean,
  _storage?: Storage,
) {
  const { json, storage } = normalize(jsonOrStorage, _storage)
  const value = storage.getItem(key)
  return json ? (value ? (JSON.parse(value) as T) : null) : value
}

export function setStorage(
  key: string,
  value: string,
  json?: boolean,
  storage?: Storage,
): void
export function setStorage(key: string, value: string, storage: Storage): void
export function setStorage<T = unknown>(
  key: string,
  value: T,
  json: T extends string ? boolean : true,
  storage?: Storage,
): void
export function setStorage<T = unknown>(
  key: string,
  value: T,
  jsonOrStorage?: Storage | boolean,
  _storage?: Storage,
) {
  const { json, storage } = normalize(jsonOrStorage, _storage)
  storage.setItem(
    key,
    json ? JSON.stringify(value) : (value as unknown as string),
  )
}

export const removeStorage = (key: string, storage = localStorage) =>
  storage.removeItem(key)

export function getSessionStorage<T extends string = string>(
  key: string,
  json?: false,
): T | null
export function getSessionStorage<T = unknown>(
  key: string,
  json: true,
): T | null
export function getSessionStorage<T = unknown>(key: string, json?: boolean) {
  return getStorage<T>(key, json as true, sessionStorage)
}

export function setSessionStorage(
  key: string,
  value: string,
  json?: false,
): void
export function setSessionStorage<T = unknown>(
  key: string,
  value: T,
  json: T extends string ? boolean : true,
): void
export function setSessionStorage<T = unknown>(
  key: string,
  value: T,
  json?: T extends string ? boolean : true,
) {
  return setStorage<T>(key, value, json!, sessionStorage)
}

export const removeSessionStorage = (key: string) =>
  removeStorage(key, sessionStorage)
