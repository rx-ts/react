/*!
 * react-qrious a React component of generating qrcode with `qrious`
 * Version 0.0.1
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

var Qrious$1 = (function (superclass) {
  function anonymous(props) {
    superclass.call(this, props);
    var qr = new QRious(props);
    this.state = {
      qr: qr,
      src: qr.toDataURL(this.props.mime)
    };
  }

  if ( superclass ) anonymous.__proto__ = superclass;
  anonymous.prototype = Object.create( superclass && superclass.prototype );
  anonymous.prototype.constructor = anonymous;

  anonymous.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
    var qr = this.state.qr;
    Object.assign(qr, nextProps);
    this.state.src = qr.toDataURL(nextProps.mime);
  };

  anonymous.prototype.render = function render () {
    return React.createElement( 'img', { src: this.state.src })
  };

  return anonymous;
}(React.PureComponent));

var string = PropTypes.string;

var LEVELS = ['L', 'M', 'Q', 'H'];

var numberString = function (props, propName, componentName, location, propFullName) {
  var propVal = +props[propName];
  return isNaN(propVal) ? new Error(("Invalid prop `" + propFullName + "` supplied to `" + componentName + "`. Validation failed.")) : null
};

Qrious$1.propTypes = {
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

return Qrious$1;

})));
