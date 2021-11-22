import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import * as components from './components'

ReactDOM.render(
  // @ts-expect-error
  <MDXProvider components={components}>
    <App />
  </MDXProvider>,
  document.querySelector('#app'),
)
