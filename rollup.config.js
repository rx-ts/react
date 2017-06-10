import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const ENV = process.env.ENV || 'client'
const NODE_ENV = process.env.NODE_ENV || 'development'

const isServer = ENV === 'server'
const isProd = NODE_ENV === 'production'

const config = {
  banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/react-qrious
 */`,
  entry: `lib/index`,
  dest: `dist/react-qrious${isServer ? '' : '.browser'}${isProd ? '.min' : ''}.js`,
  plugins: [buble()],
  format: 'umd',
  external: ['node-qrious', 'prop-types', 'qrious', 'react'],
  globals: {
    'prop-types': 'PropTypes',
    qrious: 'QRious',
    'node-qrious': 'QRious',
    react: 'React'
  },
  amd: {
    id: 'react-qrious'
  },
  moduleName: 'ReactQrious'
}

isServer && (config.paths = {
  qrious: 'node-qrious'
})

isProd && config.plugins.push(uglify({
  output: {
    comments: true
  }
}))

export default config
