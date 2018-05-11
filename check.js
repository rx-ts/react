try {
  require('qrious')
} catch (e) {
  try {
    require('node-qrious')
  } catch (e) {
    throw new Error(
      'there is no "qrious" nor "node-qrous", you need to install one of them manually',
    )
  }
}
