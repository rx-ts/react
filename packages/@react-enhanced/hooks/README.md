# @react-enhanced/hooks

🔥 Enhanced React Hooks

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

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
