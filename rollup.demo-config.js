import bubble from 'rollup-plugin-buble'

export default {
  entry: 'demo.js',
  dest: 'docs/demo.js',
  plugins: [bubble()],
  format: 'umd',
  external: ['prop-types', 'qrious', 'react', 'react-dom', 'react-qrious'],
  globals: {
    'prop-types': 'PropTypes',
    qrious: 'QRious',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-qrious': 'ReactQrious'
  }
}
