import bubble from 'rollup-plugin-buble'

export default {
  input: 'demo.js',
  output: {
    file: 'docs/demo.js',
    format: 'umd'
  },
  plugins: [bubble()],
  external: ['prop-types', 'qrious', 'react', 'react-dom', 'react-qrious'],
  globals: {
    'prop-types': 'PropTypes',
    qrious: 'QRious',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-qrious': 'ReactQrious'
  }
}
