/*!
 * react-qrious a React component of generating qrcode with `qrious`
 * Version 1.0.2
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/react-qrious
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('node-qrious'), require('react'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define('react-qrious', ['node-qrious', 'react', 'prop-types'], factory) :
	(global.ReactQrious = factory(global.QRious,global.React,global.PropTypes));
}(this, (function (QRious,React,PropTypes) { 'use strict';

QRious = QRious && 'default' in QRious ? QRious['default'] : QRious;
React = React && 'default' in React ? React['default'] : React;
PropTypes = PropTypes && 'default' in PropTypes ? PropTypes['default'] : PropTypes;

var ReactQrious = (function (superclass) {
  function ReactQrious(props) {
    superclass.call(this, props);
    var qr = new QRious(props);
    this.state = {
      qr: qr,
      src: qr.toDataURL(this.props.mime)
    };
  }

  if ( superclass ) ReactQrious.__proto__ = superclass;
  ReactQrious.prototype = Object.create( superclass && superclass.prototype );
  ReactQrious.prototype.constructor = ReactQrious;

  ReactQrious.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
    var qr = this.state.qr;
    qr.set(nextProps);
    this.state.src = qr.toDataURL(nextProps.mime);
  };

  ReactQrious.prototype.render = function render () {
    return React.createElement( 'img', { src: this.state.src })
  };

  return ReactQrious;
}(React.PureComponent));

var string = PropTypes.string;

var LEVELS = ['L', 'M', 'Q', 'H'];

var numberString = function (props, propName, componentName, location, propFullName) {
  var propVal = +props[propName];
  return isNaN(propVal) ? new Error(("Invalid prop `" + propFullName + "` supplied to `" + componentName + "`. Validation failed.")) : null
};

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
};

return ReactQrious;

})));
