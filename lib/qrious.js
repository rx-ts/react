import QRious from 'qrious'
import React from 'react'

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    const qr = new QRious(props)
    this.state = {
      qr,
      src: qr.toDataURL(this.props.mime)
    }
  }

  componentWillReceiveProps(nextProps) {
    const qr = this.state.qr
    Object.assign(qr, nextProps)
    this.state.src = qr.toDataURL(nextProps.mime)
  }

  render() {
    return <img src={this.state.src}/>
  }
}
