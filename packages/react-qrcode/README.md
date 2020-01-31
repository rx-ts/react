# ReactQRCode

> 🤳 A React component for QR code generation with [qrcode](https://github.com/soldair/node-qrcode)

## Demo

<ReactQrcodeDemo />

## Usage

```tsx
// Component
import ReactDOM from 'react-dom'
import { QRCode } from 'react-qrcode'

ReactDOM.render(<QRCode value="https://www.1stg.me" />)

// hooks
import { useQRCode } from 'react-qrcode'

export const App = () => {
  const [value, setValue] = useState('https://www.1stg.me')
  const dataUrl = useQRCode(value)
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

| prop                   | type (range)                                                       | default value                               |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `version`              | `number` (1-40)                                                    | N/A                                         |
| `errorCorrectionLevel` | `String` ('low', 'medium', 'quartile', 'high', 'L', 'M', 'Q', 'H') | `'M'`                                       |
| `maskPattern`          | `number` (0-7)                                                     | N/A                                         |
| `toSJISFunc`           | `Function`                                                         | N/A                                         |
| `margin`               | `number`                                                           | `4`                                         |
| `scale`                | `number`                                                           | `4`                                         |
| `width`                | `number`                                                           | N/A                                         |
| `color`                | `{ dark: string; light:string }`                                   | `{ dark: '#000000ff', light: '#ffffffff' }` |
| `type`                 | `string` ('image/png', 'image/jpeg', 'image/webp')                 | `'image/png'`                               |
| `quality`              | `number`(0-1)                                                      | `0.92`                                      |
| `value`                | `string | Array<{ data: string; mode?: string }>`                  | N/A                                         |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
