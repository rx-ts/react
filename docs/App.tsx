import React, { Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'

import 'github-markdown-css'
import './global.scss'

import { ReactRxDemo } from './components'

const Readme = () => {
  const { enhancedName, name } = useParams<'enhancedName' | 'name'>()
  const Readme = React.lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    enhancedName
      ? import(`../packages/@react-enhanced/${enhancedName}/README.md`)
      : name
      ? import(`../packages/${name}/README.md`)
      : import('../README.md'),
  )
  return (
    <Suspense>
      <Readme />
    </Suspense>
  )
}

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Readme />}
      />
      <Route
        path="/react-rx"
        element={<ReactRxDemo />}
      ></Route>
      <Route
        path="/packages/:name"
        element={<Readme />}
      />
      <Route
        path="/packages/@react-enhanced/:enhancedName"
        element={<Readme />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      ></Route>
    </Routes>
  </BrowserRouter>
)
