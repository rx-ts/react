import type { Nilable } from './helper.js'

export type URLSearchParamsInit =
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- TODO: report the issue
  ConstructorParameters<typeof URLSearchParams>[0]

export type URLSearchParamsOptions =
  | Record<string, Nilable<number | string>>
  | URLSearchParamsInit
  | object
