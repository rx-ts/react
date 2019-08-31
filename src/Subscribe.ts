import { ObservableSource, useObservable } from './use-observable'

export const Subscribe = <T>({
  children,
}: {
  children?: ObservableSource<T>
}) => useObservable(children)
