(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom'), require('react-qrious')) :
	typeof define === 'function' && define.amd ? define(['react', 'react-dom', 'react-qrious'], factory) :
	(factory(global.React,global.ReactDOM,global.ReactQrious));
}(this, (function (React,ReactDOM,Qrious) { 'use strict';

React = React && 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
Qrious = Qrious && 'default' in Qrious ? Qrious['default'] : Qrious;

var App = (function (superclass) {
  function App(props) {
    superclass.call(this, props);
    this.state = {
      background: '#ffffff',
      backgroundAlpha: 1,
      foreground: '#000000',
      foregroundAlpha: 1,
      level: 'L',
      mime: 'image/png',
      padding: 0,
      size: 100,
      value: 'http://1stg.me'
    };
  }

  if ( superclass ) App.__proto__ = superclass;
  App.prototype = Object.create( superclass && superclass.prototype );
  App.prototype.constructor = App;

  App.prototype.update = function update (propName) {
    var this$1 = this;

    return function (e) { return this$1.setState(( obj = {}, obj[propName] = e.target.value, obj ))
      var obj; }
  };

  App.prototype.render = function render () {
    var ref = this;
    var state = ref.state;
    return React.createElement( 'div', null,
      React.createElement( 'h1', null, "ReactQrious Demo" ),

      React.createElement( 'ul', { className: "lists" },
        React.createElement( 'li', null,
          React.createElement( 'label', null, "background(color)" ),
          React.createElement( 'input', { type: "color", value: state.background, onChange: this.update('background') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "backgroundAlpha(0.1-1.0)" ),
          React.createElement( 'input', { type: "number", value: state.backgroundAlpha, onChange: this.update('backgroundAlpha') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "foreground(color)" ),
          React.createElement( 'input', { type: "color", value: state.foreground, onChange: this.update('foreground') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "foregroundAlpha(0.1-1.0)" ),
          React.createElement( 'input', { type: "number", value: state.foregroundAlpha, onChange: this.update('foregroundAlpha') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "level" ),
          React.createElement( 'select', { value: state.level, onChange: this.update('level') },
            React.createElement( 'option', { value: "L" }, "L"),
            React.createElement( 'option', { value: "M" }, "M"),
            React.createElement( 'option', { value: "Q" }, "Q"),
            React.createElement( 'option', { value: "H" }, "H")
          )
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "mime" ),
          React.createElement( 'select', { value: this.mime, onChange: this.update('mime') },
            React.createElement( 'option', { value: "image/png" }, "image/png"),
            React.createElement( 'option', { value: "image/jpeg" }, "image/jpeg")
          )
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "padding(px)" ),
          React.createElement( 'input', { type: "number", value: state.padding, onChange: this.update('padding') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "size(px)" ),
          React.createElement( 'input', { type: "number", value: state.size, onChange: this.update('size') })
        ),
        React.createElement( 'li', null,
          React.createElement( 'label', null, "value" ),
          React.createElement( 'textarea', { rows: "6", cols: "80", value: state.value, onChange: this.update('value') })
        )
      ),
      React.createElement( Qrious, this.state)
    )
  };

  return App;
}(React.PureComponent));

ReactDOM.render(React.createElement( App, null ), document.getElementById('app'));

})));
