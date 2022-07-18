import { ApiMethod, NO_CONTENT } from '@react-enhanced/shared'
import type { Nilable, URLSearchParamsOptions } from '@react-enhanced/types'
import {
  CONTENT_TYPE,
  isObservableLike,
  normalizeUrl,
} from '@react-enhanced/utils'
import { isPlainObject } from 'lodash'
import { useCallback, useState } from 'react'
import type { Observable } from 'rxjs'
import { NEVER, catchError, from, of, switchMap, tap, throwError } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

import { useEnhancedEffect } from './lifecycle.js'

export interface FetchApiOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: ApiMethod
  body?: BodyInit | object
  query?: URLSearchParamsOptions
  json?: boolean
  type?: 'arrayBuffer' | 'blob' | 'json' | 'text' | null
  mock?: boolean
}

export interface InterceptorRequest extends FetchApiOptions {
  url: string
}

export type RequestInterceptor = (
  request: InterceptorRequest,
) =>
  | InterceptorRequest
  | Observable<InterceptorRequest>
  | PromiseLike<InterceptorRequest>

export type ResponseInterceptor = (
  request: InterceptorRequest,
  response: Response,
) => Observable<Response> | PromiseLike<Response> | Response

export type ResponseError<T extends api.Error = api.Error> = T & {
  data?: T | null
  response?: Response | null
}

export type ErrorInterceptor<T extends api.Error = api.Error> = (
  request: InterceptorRequest,
  error: ResponseError<T>,
) => Observable<Response> | PromiseLike<Response> | Response

const requestInterceptors = new Set<RequestInterceptor>()
const responseInterceptors = new Set<ResponseInterceptor>()
const errorInterceptors = new Set<ErrorInterceptor>()

export interface ApiInterceptors {
  request: {
    end(): ApiInterceptors
    use(interceptor: RequestInterceptor): ApiInterceptors['request']
    eject(interceptor: RequestInterceptor): boolean
  }
  response: {
    end(): ApiInterceptors
    use(interceptor: ResponseInterceptor): ApiInterceptors['response']
    use<T extends api.Error = api.Error>(
      responseInterceptor: ResponseInterceptor | null,
      errorInterceptor: ErrorInterceptor<T>,
    ): ApiInterceptors['response']
    eject(interceptor: ResponseInterceptor): boolean
    eject<T extends api.Error = api.Error>(
      responseInterceptor: ResponseInterceptor | null,
      errorInterceptor: ErrorInterceptor<T>,
    ): boolean
  }
}

export const interceptors: ApiInterceptors = {
  request: {
    end() {
      return interceptors
    },
    use(interceptor: RequestInterceptor) {
      requestInterceptors.add(interceptor)
      return interceptors.request
    },
    eject(interceptor: RequestInterceptor) {
      return requestInterceptors.delete(interceptor)
    },
  },
  response: {
    end() {
      return interceptors
    },
    use(
      responseInterceptor: ResponseInterceptor | null,
      errorInterceptor?: ErrorInterceptor,
    ) {
      if (responseInterceptor) {
        responseInterceptors.add(responseInterceptor)
      }

      if (errorInterceptor) {
        errorInterceptors.add(errorInterceptor)
      }

      return interceptors.response
    },
    eject(
      responseInterceptor: ResponseInterceptor | null,
      errorInterceptor?: ErrorInterceptor,
    ) {
      if (!responseInterceptor && !errorInterceptor) {
        return false
      }
      const resIcDeleted =
        !responseInterceptor || responseInterceptors.delete(responseInterceptor)
      const errIcDeleted =
        !errorInterceptor || errorInterceptors.delete(errorInterceptor)
      return resIcDeleted && errIcDeleted
    },
  },
}

export interface FetchApiResult<T, E = api.Error> {
  loading: boolean
  data?: T | null
  error?: E | null
}

const invokeRequestInterceptors = (req: InterceptorRequest) =>
  [...requestInterceptors].reduce(
    (acc, interceptor) =>
      acc.pipe(
        switchMap(req => {
          const next = interceptor(req)
          return isObservableLike(next) ? next : of(next)
        }),
      ),
    of(req),
  )

const invokeResponseInterceptors = <T>(
  req: InterceptorRequest,
  res: Response,
  type: FetchApiOptions['type'],
) =>
  [...responseInterceptors]
    .reduce(
      (acc, interceptor) =>
        acc.pipe(
          switchMap(res => {
            const next = interceptor(req, res)
            return isObservableLike(next) ? next : of(next)
          }),
        ),
      of(res),
    )
    .pipe(
      switchMap(res =>
        from(
          res.status === NO_CONTENT
            ? of(null)
            : type == null
            ? of(res)
            : (res.clone()[type]() as Promise<T>),
        ).pipe(
          catchError((err: Error) =>
            throwError(() =>
              Object.assign(new Error(err.message), { response: res }),
            ),
          ),
          switchMap(data => {
            if (res.ok) {
              return of(data)
            }
            return throwError(() =>
              Object.assign(new Error(res.statusText), { data, response: res }),
            )
          }),
        ),
      ),
    )

const invokeErrorInterceptors = (req: InterceptorRequest, err: ResponseError) =>
  [...errorInterceptors].reduce<Observable<Response>>(
    (acc, interceptor) =>
      acc.pipe(
        catchError((err: ResponseError) => {
          const next = interceptor(req, err)
          return isObservableLike(next) ? next : of(next)
        }),
      ),
    throwError(() => err),
  )

export function fetchApi(
  url: string,
  options: FetchApiOptions & { type: null },
): Observable<Response>
export function fetchApi(
  url: string,
  options: FetchApiOptions & { type: 'arraybuffer' },
): Observable<ArrayBuffer>
export function fetchApi(
  url: string,
  options: FetchApiOptions & { type: 'blob' },
): Observable<Blob>
export function fetchApi(
  url: string,
  options: FetchApiOptions & { type: 'text' },
): Observable<string>
export function fetchApi<T>(
  url: string,
  options?: FetchApiOptions & { type?: 'json' },
): Observable<T>
export function fetchApi<T>(
  url: string,
  {
    method = ApiMethod.GET,
    body,
    headers,
    json = body != null && isPlainObject(body),
    type = 'json',
    ...rest
  }: FetchApiOptions = {},
) {
  headers = new Headers(headers)

  if (json && !headers.has(CONTENT_TYPE)) {
    headers.append(CONTENT_TYPE, 'application/json')
  }

  const req: InterceptorRequest = {
    url,
    method,
    body,
    headers,
    ...rest,
  }

  return invokeRequestInterceptors(req).pipe(
    switchMap(req => {
      const { body, url, query, ...rest } = req
      return fromFetch<Response>(normalizeUrl(url, query), {
        ...rest,
        body: json ? JSON.stringify(body) : (body as BodyInit),
        selector: res => of(res),
      }).pipe(
        catchError((err: api.Error) => invokeErrorInterceptors(req, err)),
        switchMap(res => invokeResponseInterceptors(req, res, type).pipe()),
      )
    }),
    catchError((err: ResponseError) =>
      invokeErrorInterceptors(req, err).pipe(
        switchMap(res => {
          if (type == null) {
            return of(res)
          }
          return from(res.clone()[type]() as Promise<T>).pipe(
            catchError((err: Error) =>
              throwError(() => Object.assign(err, { response: res })),
            ),
          )
        }),
      ),
    ),
  )
}

export interface UseApiResult<T, E = unknown> extends FetchApiResult<T, E> {
  fetch(this: void, options?: FetchApiOptions & { url?: string }): Observable<T>
}

export interface UseApiOptions extends FetchApiOptions {
  lazy?: boolean
  /**
   * In lazy mode, `result` will not be updated by default,
   * what means `loading`/`data`/`error` will be unavailable,
   * set it as `true` if you rely on them at the same time.
   */
  lazyResult?: boolean
  url?: string
}

export function useApi<T, E = api.Error>(
  url?: Nilable<string>,
): UseApiResult<T, E>
export function useApi<T, E = api.Error>(
  url?: Nilable<string>,
  options?: Omit<UseApiOptions, 'lazyResult'> & { lazy: true },
): Pick<UseApiResult<T, E>, 'fetch'>
export function useApi<T, E = api.Error>(
  url?: Nilable<string>,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  options?: UseApiOptions & { lazy: true; lazyResult: true },
): UseApiResult<T, E>
export function useApi<T, E = api.Error>(
  url?: Nilable<string>,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  options?: Omit<UseApiOptions, 'lazy' | 'lazyResult'>,
): UseApiResult<T, E>
export function useApi<T, E>(
  url?: Nilable<string>,
  { lazy, lazyResult, ...options }: UseApiOptions = {},
) {
  const updateResult = !lazy || lazyResult

  const [result, setResult] = useState({ loading: !lazy } as UseApiResult<T, E>)

  const fetch = useCallback(
    ({ url: lazyUrl, ...lazyOptions }: UseApiOptions = {}) => {
      if (updateResult) {
        setResult(result =>
          result.loading ? result : { ...result, loading: true },
        )
      }

      const finalUrl = lazyUrl ?? url

      return finalUrl
        ? fetchApi<T>(finalUrl, {
            ...options,
            ...lazyOptions,
            // A litter bit tricky due to typings,
            // actually there is no limitation of `type`
          } as FetchApiOptions & { type: 'json' }).pipe(
            tap({
              next(data) {
                if (updateResult) {
                  setResult(result => ({
                    ...result,
                    loading: false,
                    data,
                    error: null,
                  }))
                }
              },
              error(err: E) {
                if (updateResult) {
                  // preserve previous loaded data for fallback on error
                  setResult(result => ({
                    ...result,
                    loading: false,
                    error: err,
                  }))
                }
              },
            }),
          )
        : NEVER
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- obviously, we can't static analyse the `options`
    [url, updateResult, ...(Object.values(options) as unknown[])],
  )

  // we're not using `useEffect` + `setResult` here because there is no need to rerender
  result.fetch = fetch

  useEnhancedEffect(() => {
    if (lazy) {
      return
    }
    return fetch(options)
  }, [fetch, lazy, ...(Object.values(options) as unknown[])])

  return result
}
