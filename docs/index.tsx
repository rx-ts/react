import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import ReactDOM from 'react-dom'

import * as components from './components'
import { App } from './App'

ReactDOM.render(
  // @ts-expect-error
  <MDXProvider components={components}>
    <App />
  </MDXProvider>,
  document.querySelector('#app'),
)
