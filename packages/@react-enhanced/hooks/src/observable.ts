import { useRef, useState } from 'react'
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs'

import { useEnhancedEffect } from './lifecycle.js'
import { Nilable } from './types.js'

export type ObservableSource<T> = Nilable<Observable<T> | (() => Observable<T>)>

export const isBehaviorSubject = <T>(
  observable?: ObservableSource<T>,
): observable is BehaviorSubject<T> => observable instanceof BehaviorSubject

export const useObservable = <T>(
  observable?: ObservableSource<T>,
  deps?: unknown[],
) => {
  const [value, setValue] = useState<T | null>(
    isBehaviorSubject(observable) ? observable.getValue() : null,
  )
  const observableRef = useRef(observable)
  useEnhancedEffect(
    () =>
      (typeof observableRef.current === 'function'
        ? observableRef.current()
        : observableRef.current
      )?.pipe(distinctUntilChanged(), tap(setValue)),
    deps,
  )
  return value
}

export const Subscribe = <T>({
  children,
}: {
  children?: ObservableSource<T>
}) => useObservable(children)
