import fs from 'fs'

import { camelCase, flatMap, startCase } from 'lodash'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const plugins = [typescript()]

if (isProd) {
  plugins.push(terser())
}

const globals = {
  react: 'React',
  rxjs: 'rxjs',
}
const pkgs = fs.readdirSync('packages')

export default flatMap(pkgs, pkg => {
  const {
    peerDependencies: externals,
  } = require(`./packages/${pkg}/package.json`)
  const external = Object.keys(externals)
  return ['cjs', 'esm', 'umd'].map(format => ({
    input: `packages/${pkg}/src/index.ts`,
    output: {
      file: `packages/${pkg}/lib/${format}${isProd ? '.min' : ''}.js`,
      format,
      name: startCase(camelCase(pkg)),
      globals,
    },
    external,
    plugins,
  }))
})
