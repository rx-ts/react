import { ObservableSource, useObservable } from './use-observable.js'

export const Subscribe = <T>({
  children,
}: {
  children?: ObservableSource<T>
}) => useObservable(children)
