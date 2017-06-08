import QRious from 'qrious'
import React from 'react'
import PropTypes from 'prop-types'

class ReactQrious extends React.PureComponent {
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

const {string} = PropTypes

const LEVELS = ['L', 'M', 'Q', 'H']

const numberString = (props, propName, componentName, location, propFullName) => {
  const propVal = +props[propName]
  return isNaN(propVal) ? new Error(`Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Validation failed.`) : null
}

ReactQrious.propTypes = {
  value: string.isRequired,
  background: string,
  backgroundAlpha: numberString,
  foreground: string,
  foregroundAlpha: numberString,
  level: PropTypes.oneOf(LEVELS),
  mime: string,
  padding: numberString,
  size: numberString
}

export default ReactQrious
