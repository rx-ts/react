import { sleep } from '@react-enhanced/shared'
import { renderHook } from '@testing-library/react'
import { fetch } from 'undici'

import { RequestInterceptor, interceptors, useApi } from '@react-enhanced/hooks'

const requestInterceptor: RequestInterceptor = req => {
  if (!/^https?:\/\//.test(req.url)) {
    req.url = 'https://api.github.com/' + req.url
  }
  return req
}

// @ts-expect-error
globalThis.fetch = fetch

interceptors.request.use(requestInterceptor)

afterAll(() => {
  interceptors.request.eject(requestInterceptor)
})

it('should work as expected', async () => {
  const { result } = renderHook(() => useApi('rate_limit'))
  expect(result.current.data).toBeUndefined()
  expect(result.current.loading).toBe(true)
  await sleep(1000)
  expect(result.current.data).toBeTruthy()
  expect(result.current.loading).toBe(false)
})
