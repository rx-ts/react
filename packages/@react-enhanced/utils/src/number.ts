import { ZERO } from '@react-enhanced/shared'
import type { Arrayable, Nilable, Nullable } from '@react-enhanced/types'

import { NOT_AVAILABLE } from './constant.js'
import { arrayify } from './helper.js'

export const sum = (...nums: Array<Arrayable<Nilable<number | string>>>) =>
  arrayify(...nums).reduce(
    (acc, curr) => +acc + toNumber(curr, true),
    ZERO,
  ) as number

export const percent = (value?: number | null, total?: number | null) =>
  !total || value == null || Number.isNaN(value)
    ? NOT_AVAILABLE
    : `${+((value / total) * 100).toFixed(2)}%`

export function toNumber(value: unknown): Nullable<number>
export function toNumber(value: unknown, zero: true): number
export function toNumber(value: unknown, zero?: boolean) {
  const val = value == null ? (zero ? ZERO : value) : Number(value)
  return zero && Number.isNaN(val) ? ZERO : val
}
