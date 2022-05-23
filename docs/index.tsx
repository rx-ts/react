import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import * as components from './components'

const app = document.querySelector('#app')!

app.classList.add('markdown-body')

const root = createRoot(app)

root.render(
  <MDXProvider
    // @ts-expect-error
    components={components}
  >
    <App />
  </MDXProvider>,
)
