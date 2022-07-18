import { catchError, EMPTY, from, Observable, of, switchMap, tap } from 'rxjs'

import { nextTick } from './promise.js'

export const skipError = <T, R = never>(mapped: Observable<R> | R = EMPTY) =>
  catchError<T, Observable<R>>(() =>
    mapped instanceof Observable ? mapped : of(mapped),
  )

export const catchPromise = <T, R = never>(
  promise: PromiseLike<T>,
  mapped?: Observable<R> | R,
) => from(promise).pipe(skipError(mapped))

export const delayTick = <T>() =>
  switchMap<T, Promise<T>>(value => nextTick().then(() => value))

export const always = <T, R>(fn: () => R, complete = true) =>
  tap<T>({
    next: fn,
    error: fn,
    complete: complete ? fn : undefined,
  })
