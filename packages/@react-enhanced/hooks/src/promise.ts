import { useEffect, useState } from 'react'
import { ValueOf } from 'type-fest'

import { useComputed } from './computed.js'
import type { Nilable } from './types.js'

export type PromiseInput<T> = Promise<T> | (() => Promise<T>)

export const PromiseStatus = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const

export type PromiseStatus = ValueOf<typeof PromiseStatus>

export type PromiseResult<T, E = unknown> = [
  data: Nilable<T>,
  error: Nilable<E>,
  status: PromiseStatus,
]

export function usePromise<T, E = unknown>(
  promise: PromiseInput<T>,
  deps?: unknown[],
  abortCtr?: AbortController,
): PromiseResult<T, E>
export function usePromise<T, E = unknown>(
  promise: PromiseInput<T>,
  abortCtr: AbortController,
): PromiseResult<T, E>
export function usePromise<T, E = unknown>(
  promise: PromiseInput<T>,
  depsOrAbortCtr: AbortController | unknown[] = [],
  abortCtr?: AbortController,
) {
  const [result, setResult] = useState<PromiseResult<T, E>>([
    undefined,
    undefined,
    PromiseStatus.PENDING,
  ])
  const isDeps = Array.isArray(depsOrAbortCtr)
  const deps = isDeps ? depsOrAbortCtr : []
  const signal = isDeps ? abortCtr?.signal : depsOrAbortCtr.signal

  const value = useComputed(promise, deps)

  useEffect(() => {
    setResult(result => {
      const [data, , status] = result
      return status === PromiseStatus.PENDING
        ? result
        : [data, null, PromiseStatus.PENDING]
    })

    let canceled = false

    ;(signal
      ? Promise.race([
          value,
          // eslint-disable-next-line promise/param-names
          new Promise<T>((_, reject) => {
            const listener = (ev: Event) => {
              reject(ev)
              signal.removeEventListener('abort', listener)
            }
            signal.addEventListener('abort', listener)
          }),
        ])
      : value
    )
      .then(data => {
        if (canceled) {
          return
        }
        setResult([data, null, PromiseStatus.FULFILLED])
      })
      .catch((error: E) => {
        if (canceled || signal?.aborted) {
          return
        }
        setResult([null, error, PromiseStatus.REJECTED])
      })
    return () => {
      canceled = true
      abortCtr?.abort()
    }
  }, [abortCtr, signal, value])

  return result
}
