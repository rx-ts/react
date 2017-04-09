import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [buble()]

isProd && plugins.push(uglify({
  output: {
    comments: true
  }
}))

export default {
  banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/react-qrious
 */`,
  entry: `lib/qrious${isProd ? '' : '.dev'}.js`,
  dest: `dist/react-qrious${isProd ? '.min' : ''}.js`,
  plugins,
  format: 'umd',
  external: ['prop-types', 'qrious', 'react'],
  globals: {
    'prop-types': 'PropTypes',
    qrious: 'QRious',
    react: 'React'
  },
  moduleId: 'react-qrious',
  moduleName: 'ReactQrious'
}
