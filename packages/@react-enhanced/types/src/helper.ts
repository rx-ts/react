export type Readonlyable<T> = Readonly<T> | T

export type AnyArray<T = unknown> = Readonlyable<T[]>

export type Arrayable<T, R extends boolean = false> = [R] extends [never]
  ? T | T[]
  : R extends true
  ? Readonly<T> | readonly T[]
  : R extends false
  ? AnyArray<T> | Readonlyable<T>
  : never

export type Concat<T, U> = U extends AnyArray ? [T, ...U] : never

export type IndexOf<T extends AnyArray> = T extends Readonlyable<[]>
  ? 0
  : T extends Readonlyable<[unknown, ...infer Rest]>
  ? Rest['length']
  : never

export type PathOfList<T extends AnyArray> = {
  [Key in IndexOf<T>]: Concat<Key, Path<T[Key]>> | [Key]
}[IndexOf<T>]

export type PathOfObject<T extends object> = {
  [Key in keyof T]: Concat<Key, Path<T[Key]>> | [Key]
}[keyof T]

export type Path<T> = T extends AnyArray
  ? PathOfList<T>
  : T extends Readonlyable<object>
  ? PathOfObject<T>
  : never

export type Rest<
  X extends AnyArray,
  Y extends AnyArray,
> = Y extends Readonlyable<[]>
  ? X
  : X extends Readonlyable<[infer R, ...infer RestX]>
  ? Y extends Readonlyable<[R, ...infer RestY]>
    ? Rest<RestX, RestY>
    : Y extends Readonlyable<[]>
    ? X
    : []
  : []

/** Dark magic helper */
export type IfEqual<X, Y, A = X, B = never> = (<T>() => T extends X
  ? true
  : false) extends <T>() => T extends Y ? true : false
  ? A
  : B

export type KeyOf<T> = T extends AnyArray
  ? IndexOf<T>
  : T extends object
  ? keyof T
  : never

export type Optional<T> = T | undefined

export type Nil = null | undefined | void

export type Nilable<T> = Nil | T

export type NonVoid<T> = T extends void ? never : T

export type Nullable<T> = NonVoid<Nilable<T>>

export type NonNilable<T> = Exclude<T, Nil>

export type NonNilableRequired<T> = {
  [K in keyof T]-?: NonNilable<T[K]>
}
