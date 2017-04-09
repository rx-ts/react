import React from 'react'
import PropTypes from 'prop-types'

import Qrious from './qrious'

const {string} = PropTypes

const LEVELS = ['L', 'M', 'Q', 'H']

const numberString = (props, propName, componentName, location, propFullName) => {
  const propVal = +props[propName]
  return isNaN(propVal) ? new Error(`Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Validation failed.`) : null
}

Qrious.propTypes = {
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

export default Qrious
