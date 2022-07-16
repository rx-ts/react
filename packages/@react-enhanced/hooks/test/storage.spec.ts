import { renderHook } from '@testing-library/react'

import { useLocalStorage } from '@react-enhanced/hooks'

it('should work as expected', () => {
  const { result, rerender } = renderHook(() => useLocalStorage('key'))
  expect(result.current[0]).toBeUndefined()
  result.current[1]('value')
  rerender()
  expect(result.current[0]).toBe('value')
})
