import type { LastArrayElement } from '@react-enhanced/types'
import { noop } from 'lodash'
import type { Observable } from 'rxjs'
import { firstValueFrom, isObservable } from 'rxjs'

export const nextTick = () =>
  new Promise<void>(resolve => queueMicrotask(resolve))

export const sequence = <T extends Array<(value: unknown) => Promise<unknown>>>(
  promises: T,
) =>
  promises.reduce<Promise<unknown>>(
    (acc, curr) => acc.then(value => curr(value)),
    Promise.resolve(),
  ) as ReturnType<LastArrayElement<T>>

export const promisify = <
  T,
  R = T extends Observable<infer R> ? R : Awaited<T>,
>(
  value: T,
) => {
  let result: unknown = value

  if (isObservable(value)) {
    result = firstValueFrom(value)
  }

  return Promise.resolve(result) as Promise<R>
}

export const NEVER = new Promise(noop)
