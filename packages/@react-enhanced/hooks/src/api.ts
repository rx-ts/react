import { ApiMethod } from '@react-enhanced/shared'
import type { Nilable, URLSearchParamsOptions } from '@react-enhanced/types'
import {
  CONTENT_TYPE,
  isObservableLike,
  normalizeUrl,
} from '@react-enhanced/utils'
import { isPlainObject } from 'lodash'
import { useCallback, useState } from 'react'
import type { Observable } from 'rxjs'
import { NEVER, from, of, switchMap, tap } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

import { useEnhancedEffect } from './lifecycle.js'

export interface FetchApiOptions extends Omit<RequestInit, 'body' | 'method'> {
  method?: ApiMethod
  body?: BodyInit | object
  query?: URLSearchParamsOptions
  json?: boolean
  type?: 'arrayBuffer' | 'blob' | 'json' | 'text' | null
}

export interface InterceptorRequest extends FetchApiOptions {
  url: string
}

export type ApiInterceptor = (
  request: InterceptorRequest,
  next: (request: InterceptorRequest) => Observable<Response>,
) => Observable<Response> | PromiseLike<Response> | Response

export type ResponseError<T extends api.Error = api.Error> = T & {
  data?: T | null
  response?: Response | null
}

export class ApiInterceptors {
  readonly #interceptors: ApiInterceptor[] = []

  get length() {
    return this.#interceptors.length
  }

  at(index: number): ApiInterceptor | undefined {
    return this.#interceptors.at(index)
  }

  use(...interceptors: ApiInterceptor[]): ApiInterceptors {
    this.#interceptors.push(...interceptors)
    return this
  }

  eject(interceptor: ApiInterceptor): boolean {
    const index = this.#interceptors.indexOf(interceptor)
    if (index > -1) {
      this.#interceptors.splice(index, 1)
      return true
    }
    return false
  }
}

export interface FetchApiResult<T, E = api.Error> {
  loading: boolean
  data?: T | null
  error?: E | null
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

export function createApi() {
  const interceptors = new ApiInterceptors()

  function fetchApi(
    url: string,
    options: FetchApiOptions & { type: null },
  ): Observable<Response>
  function fetchApi(
    url: string,
    options: FetchApiOptions & { type: 'arraybuffer' },
  ): Observable<ArrayBuffer>
  function fetchApi(
    url: string,
    options: FetchApiOptions & { type: 'blob' },
  ): Observable<Blob>
  function fetchApi(
    url: string,
    options: FetchApiOptions & { type: 'text' },
  ): Observable<string>
  function fetchApi<T>(
    url: string,
    options?: FetchApiOptions & { type?: 'json' },
  ): Observable<T>
  function fetchApi<T>(
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

    let index = 0

    const next = (req: InterceptorRequest) => {
      if (index < interceptors.length) {
        const res = interceptors.at(index++)!(req, next)
        return isObservableLike(res) ? from(res) : of(res)
      }
      const { body, url, query, ...rest } = req
      return fromFetch<Response>(normalizeUrl(url, query), {
        ...rest,
        body: json ? JSON.stringify(body) : (body as BodyInit),
        selector: res => of(res),
      })
    }

    return next({
      url,
      method,
      body,
      headers,
      ...rest,
    }).pipe(
      switchMap(res => {
        if (type == null) {
          return of(res)
        }
        return res[type]() as Promise<T>
      }),
    )
  }

  function useApi<T, E = api.Error>(url?: Nilable<string>): UseApiResult<T, E>
  function useApi<T, E = api.Error>(
    url?: Nilable<string>,
    options?: Omit<UseApiOptions, 'lazyResult'> & { lazy: true },
  ): Pick<UseApiResult<T, E>, 'fetch'>
  function useApi<T, E = api.Error>(
    url?: Nilable<string>,
    options?: UseApiOptions & { lazy: true; lazyResult: true },
  ): UseApiResult<T, E>
  function useApi<T, E = api.Error>(
    url?: Nilable<string>,
    options?: Omit<UseApiOptions, 'lazy' | 'lazyResult'>,
  ): UseApiResult<T, E>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  function useApi<T, E>(
    url?: Nilable<string>,
    { lazy, lazyResult, ...options }: UseApiOptions = {},
  ) {
    const updateResult = !lazy || lazyResult

    const [result, setResult] = useState({ loading: !lazy } as UseApiResult<
      T,
      E
    >)

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

  return { interceptors, fetchApi, useApi }
}

export const { interceptors, fetchApi, useApi } = createApi()
