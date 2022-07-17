import type { Empty } from '@react-enhanced/shared'
import type { Arrayable, Nilable, NonNilable } from '@react-enhanced/types'
import { camelCase, isPlainObject, upperFirst } from 'lodash'
import type { Observable } from 'rxjs'
import { isObservable } from 'rxjs'

export const identify = <
  T,
  V extends Exclude<NonNilable<T>, Empty | false>,
  R extends V = V,
>(
  val: T,
): val is R => !!val

export const pascalCase = (val: string): string => upperFirst(camelCase(val))

export const isObjectType = <T extends object>(obj: unknown): obj is T =>
  isPlainObject(obj)

export const arrayify = <
  T,
  R = T extends Arrayable<infer S> ? NonNilable<S> : NonNilable<T>,
>(
  ...args: Array<Arrayable<Nilable<T>>>
) =>
  args.reduce<R[]>((arr, curr) => {
    arr.push(
      ...((Array.isArray(curr) ? curr : [curr]).filter(
        it => it != null && !Number.isNaN(it),
      ) as R[]),
    )
    return arr
  }, [])

export const isPromiseLike = <T>(value: unknown): value is PromiseLike<T> =>
  !!value &&
  // @ts-expect-error -- ts tricky
  typeof value.then === 'function'

export const isObservableLike = <T>(
  value: unknown,
): value is Observable<T> | PromiseLike<T> =>
  isObservable(value) || isPromiseLike<T>(value)
