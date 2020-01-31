# ReactQrious

🤳 A React component for QR code generation with qrious

## Demo

<ReactQriousDemo />

## Usage

```tsx
// Component
import ReactDOM from 'react-dom'
import { QRious } from 'react-qrious'

ReactDOM.render(
  <QRious value="https://www.1stg.me" />,
  document.getElementById('qrious'),
)

// hooks
import { useQrious } from 'react-qrious'

export const App = () => {
  const [value, setValue] = useState('https://www.1stg.me')
  const [dataUrl, _qrious] = useQrious({ value })
  return (
    <>
      <div>dataUrl: {dataUrl}</div>
      <img src={dataUrl} />
      <input onChange={e => setValue(e.currentTarget.value)} />
    </>
  )
}
```

## Available Props

| prop              | type                                 | default value |
| ----------------- | ------------------------------------ | ------------- |
| `background`      | `string` (CSS color)                 | `"#ffffff"`   |
| `backgroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `foreground`      | `string` (CSS color)                 | `"#000000"`   |
| `foregroundAlpha` | `number` (0.1-1.0)                   | `1.0`         |
| `level`           | `string` ("L", "M", "Q", "H")        | `"L"`         |
| `mime`            | `string` ("image/png", "image/jpeg") | `"image/png"` |
| `padding`         | `number`                             | `null`        |
| `size`            | `number`                             | `100`         |
| `value`           | `string`                             |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
