import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const ENV = process.env.ENV || 'client'
const NODE_ENV = process.env.NODE_ENV || 'development'

const isServer = ENV === 'server'
const isProd = NODE_ENV === 'production'

const config = {
  input: `lib/react-qrious`,
  output: {
    amd: {
      id: 'react-qrious',
    },
    banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017-present JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/react-qrious
 */`,
    file: `dist/react-qrious${isServer ? '' : '.browser'}${
      isProd ? '.min' : ''
    }.js`,
    format: 'umd',
    name: 'ReactQrious',
    globals: {
      'prop-types': 'PropTypes',
      qrious: 'QRious',
      'node-qrious': 'QRious',
      react: 'React',
    },
  },
  plugins: [buble()],
  external: ['node-qrious', 'prop-types', 'qrious', 'react'],
}

isServer &&
  (config.output.paths = {
    qrious: 'node-qrious',
  })

isProd &&
  config.plugins.push(
    uglify({
      output: {
        comments: true,
      },
    }),
  )

export default config
