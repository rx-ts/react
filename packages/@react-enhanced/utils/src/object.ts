import type { Nilable, ValueOf } from '@react-enhanced/types'

import { isObjectType } from './helper.js'

export const cleanNilValues = <T = unknown>(input: T, empty?: boolean): T => {
  if (!isObjectType(input)) {
    return input
  }

  for (const _key of Object.keys(input)) {
    const key = _key as keyof T
    const value = input[key] as Nilable<ValueOf<T>>
    if (empty ? !value : value == null) {
      delete input[key]
    } else {
      input[key] = cleanNilValues(value, empty) as (T & object)[keyof T]
    }
  }

  return input
}
