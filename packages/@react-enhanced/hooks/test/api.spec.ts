import { sleep } from '@react-enhanced/shared'
import { renderHook } from '@testing-library/react'
import { fetch } from 'undici'

import { ApiInterceptor, interceptors, useApi } from '@react-enhanced/hooks'

const apiInterceptor: ApiInterceptor = (req, next) => {
  if (!/^https?:\/\//.test(req.url)) {
    req.url = 'https://api.github.com/' + req.url
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
    }
  }
  return next(req)
}

// @ts-expect-error
globalThis.fetch = fetch

interceptors.use(apiInterceptor)

afterAll(() => {
  interceptors.eject(apiInterceptor)
})

it('should work as expected', async () => {
  const { result } = renderHook(() => useApi('rate_limit'))
  expect(result.current.data).toBeUndefined()
  expect(result.current.loading).toBe(true)
  await sleep(2 * 1000)
  expect(result.current.data).toBeTruthy()
  expect(result.current.loading).toBe(false)
})
