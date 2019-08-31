import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const plugins = [typescript()]

if (isProd) {
  plugins.push(terser())
}

export default {
  input: './src/index.ts',
  output: {
    file: `lib/umd/index${isProd ? '.min' : ''}.js`,
    format: 'umd',
    name: 'ReactRx',
    globals: {
      react: 'React',
      rxjs: 'rxjs',
    },
  },
  external: ['react', 'rxjs'],
  plugins,
}
