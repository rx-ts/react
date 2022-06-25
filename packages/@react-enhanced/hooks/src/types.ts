export type Nil = null | undefined | void

export type Nilable<T> = Nil | T

export type Nullable<T> = T | null | undefined

export type NonNilable<T> = Exclude<T, Nil>

export type NonNilableRequired<T> = {
  [K in keyof T]-?: NonNilable<T[K]>
}

export type Optional<T> = T | undefined
