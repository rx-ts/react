# react-qrious

[![peerDependencies status](https://david-dm.org/JounQin/react-qrious/peer-status.svg)](https://david-dm.org/JounQin/react-qrious?type=peer)
[![dependency Status](https://david-dm.org/JounQin/react-qrious/status.svg)](https://david-dm.org/JounQin/react-qrious)
[![devDependency Status](https://david-dm.org/JounQin/react-qrious/dev-status.svg)](https://david-dm.org/JounQin/react-qrious?type=dev)

a [React](https://github.com/facebook/react) component of generating qrcode with [qrious](https://github.com/neocotic/qrious)

## Notice

Please install `qrious` or `node-qrious` manually!

Since qrious has been split into multiple modules from 4.0.0 (https://github.com/neocotic/qrious/issues/53), so if your are using es module with webpack or rollup, remember add an alias/replacement-plugin from module `qrious` to `node-qrious` on node/server environment.

Or you can manually choosing files in `react-qrious/dist` folder as following.

- react-qrious.browser.js
- react-qrious.browser.min.js
- react-qrious.js
- react-qrious.min.js

## Demo

https://JounQin.github.io/react-qrious/

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
