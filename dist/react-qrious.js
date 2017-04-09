/*!
 * react-qrious a React component of generating qrcode with `qrious`
 * Version 0.1.0
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/react-qrious
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('qrious')) :
	typeof define === 'function' && define.amd ? define('react-qrious', ['react', 'prop-types', 'qrious'], factory) :
	(global.ReactQrious = factory(global.React,global.PropTypes,global.QRious));
}(this, (function (React,PropTypes,QRious) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
QRious = 'default' in QRious ? QRious['default'] : QRious;

var ReactQrious$1 = (function (superclass) {
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
    Object.assign(qr, nextProps);
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

ReactQrious$1.propTypes = {
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

return ReactQrious$1;

})));
