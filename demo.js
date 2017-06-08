import React from 'react'
import ReactDOM from 'react-dom'

import Qrious from './lib/index'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
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
    }
  }

  update(propName) {
    return e => this.setState({[propName]: e.target.value})
  }

  render() {
    const {state} = this
    return <div>
      <h1>ReactQrious Demo</h1>

      <ul className="lists">
        <li>
          <label>background(color)</label>
          <input type="color" value={state.background} onChange={this.update('background')}/>
        </li>
        <li>
          <label>backgroundAlpha(0.1-1.0)</label>
          <input type="number" value={state.backgroundAlpha} onChange={this.update('backgroundAlpha')}/>
        </li>
        <li>
          <label>foreground(color)</label>
          <input type="color" value={state.foreground} onChange={this.update('foreground')}/>
        </li>
        <li>
          <label>foregroundAlpha(0.1-1.0)</label>
          <input type="number" value={state.foregroundAlpha} onChange={this.update('foregroundAlpha')}/>
        </li>
        <li>
          <label>level</label>
          <select value={state.level} onChange={this.update('level')}>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </li>
        <li>
          <label>mime</label>
          <select value={this.mime} onChange={this.update('mime')}>
            <option value="image/png">image/png</option>
            <option value="image/jpeg">image/jpeg</option>
          </select>
        </li>
        <li>
          <label>padding(px)</label>
          <input type="number" value={state.padding} onChange={this.update('padding')}/>
        </li>
        <li>
          <label>size(px)</label>
          <input type="number" value={state.size} onChange={this.update('size')}/>
        </li>
        <li>
          <label>value</label>
          <textarea rows="6" cols="80" value={state.value} onChange={this.update('value')}/>
        </li>
      </ul>
      <Qrious {...this.state}/>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
