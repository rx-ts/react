import type {
  URLSearchParamsInit,
  URLSearchParamsOptions,
} from '@react-enhanced/types'

import { cleanNilValues } from './object.js'

export const normalizeUrl = (url: string, query?: URLSearchParamsOptions) => {
  const search = new URLSearchParams(
    cleanNilValues(query, true) as URLSearchParamsInit,
  ).toString()
  return search ? url + (url.includes('?') ? '&' : '?') + search : url
}

export function getApiUrl(
  url: string,
  query?: URLSearchParamsOptions,
  mock?: boolean,
): string
export function getApiUrl(url: string, mock?: boolean): string
export function getApiUrl(
  url: string,
  mockOrQuery?: URLSearchParamsOptions | boolean,
  mock?: boolean,
) {
  let query: URLSearchParamsOptions

  if (typeof mockOrQuery === 'boolean') {
    mock = mockOrQuery
  } else {
    query = mockOrQuery
  }

  const isExternalUrl = /^https?:\/\//.test(url)
  const isRootUrl = isExternalUrl || url.startsWith('/')
  url = isRootUrl ? url : `/api/v1/${url}`

  if (query) {
    url = normalizeUrl(url, query)
  }

  return `${mock && !isExternalUrl ? '/mock' : ''}${url}`
}
