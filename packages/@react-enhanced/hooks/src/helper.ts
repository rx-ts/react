import { Nilable } from './types.js'

export function parseJson<T = unknown>(
  str: string,
  strOnErr?: false,
): T | undefined
export function parseJson<T = unknown>(str: string, strOnErr: true): T | string
export function parseJson<T = unknown>(str: string, strOnErr?: boolean) {
  try {
    return JSON.parse(str) as T
  } catch {
    if (strOnErr) {
      return str
    }
  }
}

export const parseJsonFallback = <T>(
  value: Nilable<string>,
  defaultValue?: T,
) => (value == null ? defaultValue : parseJson<T>(value) ?? defaultValue)
