# @react-enhanced/hooks

🔥 Enhanced React Hooks

## `useApi`

`API` request `hook` based on `fetch` + `Observable`, supports advanced features like `interceptor`, `lazy` request, etc.

## Usage

```ts
const { data, loading, error, fetch } = useApi('path')
```

```ts
const { data, loading, error, fetch } = useApi('path', {
  method: ApiMethod.POST,
  type: 'text',
  query: {},
  body: {},
  // Other native `fetch` options
})
```

```ts
// It won't trigger `fetch` actively in `lazy` mode, and properties like `data`, `loading`, `error` are not available by default
const { fetch } = useApi('path', {
  lazy: true,
})
```

```ts
// Enable `lazyResult` to make properties like `data`, `loading`, `error` available
const { data, loading, error, fetch } = useApi('path', {
  lazy: true,
  lazyResult: true,
})
```

```ts
// Use `fetchApi` directly, no involvement in rendering
const callApi = useCallback(() => fetchApi('path'), [])
```

## `useComputed`

Similar to `useState` + `useMemo`

### Usage

```ts
const value = useComputed({ a: 1 }, []) // `value`'s reference will never change
```

```ts
const value = useComputed(() => ({ a: 1 }), []) // Basically equivalent to `useMemo`
```

## `useConstant`

Constant based on `useState`, will never change

## `useEnhancedEffect`

Enhanced `useEffect`, support subscribe and unsubscribe `Observable` automatically, support nested `unsubscribe`

### Usage

```ts
useEnhancedEffect(() =>
  fetchApi('path1').pipe(switchMap(() => fetchApi('path2'))),
)
```

```ts
useEnhancedEffect(
  () => fetchApi('path1').subscribe(() => fetchApi('path2').subscribe()), // Just for demo, do not write like this
)
```

## `useMounted`

Similar to `componentDidMount`

## `useUnmounted`

Similar to `componentWillUnmount`

## `useEnhancedCallback`

Enhanced `useCallback`, support subscribe and unsubscribe `Observable` automatically, support nested `unsubscribe`

### Usage

```ts
const doSth = useEnhancedCallback(
  () => fetchApi('path1').pipe(switchMap(() => fetchApi('path2'))),
  [],
)
```

```ts
const doSth = useEnhancedCallback(
  () => fetchApi('path1').subscribe(() => fetchApi('path2').subscribe()), // Just for demo, do not write like this
  [],
)
```

## `useRendered`

Used to judge whether the `Modal` content has been rendered

```ts
const [formRendered] = useRendered(visible)

useEffect(() => {
  if (
    formRendered.current &&
    // We only need to `resetFields` after modal open so that `initialValues` will have been updated correctly
    visible
  ) {
    resetError()
    form.resetFields()
  }
}, [form, formRendered, resetError, visible])
```

:::warning
`useRendered` returns `Ref`, its reference will never change, so do not try to set `formRendered.current` as a variable outside `useEffect`
:::

## `useObservable`

Get latest value from `Observable` with `subscribe` and `unsubscribe` automatically

## Demo

[TodoList](/react-rx)

## `usePromise`

Handle `Promise` with `abort` support

## `useLocalStorage` and `useSessionStorage`

Sync data to/from `localStorage` or `sessionStorage` across components

## `useInterval`

Timer based on `setInterval`

### Usage

```ts
useInterval(refresh, REFRESH_INTERVAL)
```

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
