import { useCallback, useEffect, useRef } from 'react'
import { Observable, Subscription } from 'rxjs'

import type { Nilable } from './types.js'

export const useEnhancedEffect = (
  effect: () => unknown,
  deps: unknown[] = [],
  skipFirst = false,
) => {
  const isFirst = useRef(true)
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      if (skipFirst) {
        return
      }
    }
    let result = effect()
    let value: unknown
    if (result instanceof Observable) {
      result = result.subscribe((v: unknown) => (value = v))
    }
    return () => {
      let count = 0
      while (typeof result === 'function') {
        if (++count > 3) {
          if (process.env.NODE_ENV === 'development') {
            throw new Error('Too many nested unsubscribes')
          } else {
            break
          }
        }
        result = result()
      }

      if (result instanceof Subscription) {
        result.unsubscribe()
      }

      if (value instanceof Subscription) {
        value.unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intended
  }, [...deps, skipFirst])
}

export const useMounted = (effect: () => unknown) => useEnhancedEffect(effect)

export const useUnmounted = (effect: () => unknown, deps: unknown[] = []) =>
  useEnhancedEffect(() => effect, deps)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEnhancedCallback = <T extends (...args: any[]) => any>(
  fn: T,
  deps: unknown[],
) => {
  const ref = useRef<ReturnType<T>>()
  const subRef = useRef<Subscription>()

  const cb = useCallback(
    (...args: Parameters<T>) => {
      subRef.current?.unsubscribe()
      ref.current = fn(...args) as ReturnType<T>
      // TODO: report the issue
      const result = ref.current as unknown
      if (result instanceof Observable) {
        subRef.current = result.subscribe()
      } else if (result instanceof Subscription) {
        subRef.current = ref.current
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ref.current as ReturnType<T>
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intended
    deps,
  )

  useUnmounted(() => {
    subRef.current?.unsubscribe()
    return ref.current
  })

  return cb
}

/**
 * @see https://github.com/ant-design/ant-design/issues/26844#issuecomment-1152299010
 *
 * ! Note: it will not trigger rerender on change, of course
 */
export const useRendered = (visible?: Nilable<boolean>) => {
  const renderedRef = useRef(false)
  useEffect(() => {
    if (visible && !renderedRef.current) {
      renderedRef.current = true
    }
  }, [renderedRef, visible])
  return [renderedRef] as const
}
