# react-qrious
a React component of generating qrcode with `qrious`

[qrious](https://github.com/neocotic/qrious) is required as **peerDependency** in order to support all versions.

## Demo
http://react-qrious.1stg.me

## Usage

``` jsx
<qrious value="https://blog.1stg.me/"/>
```

## Available Props

prop      | type                 | default value
----------|----------------------|--------------
`background` | `string` (CSS color) | `"#ffffff"`
`backgroundAlpha` | `number` (0.1-1.0) | `1.0`
`foreground` | `string` (CSS color) | `"#000000"`
`foregroundAlpha` | `number` (0.1-1.0) | `1.0`
`level` | `string` ("L", "M", "Q", "H") | `"L"`
`mime` | `string` ("image/png", "image/jpeg") | `"image/png"`
`padding` | `number` | `null`
`size`    | `number`             | `100`
`value`   | `string`             |
