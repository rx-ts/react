import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
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
  const Readme = lazy(() =>
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

const Changelog = () => {
  const Changelog = lazy(() => import('../CHANGELOG.md'))
  return (
    <Suspense>
      <Changelog />
    </Suspense>
  )
}

export const App = () => (
  <Router>
    <Routes>
      <Route
        path="/react-rx"
        element={<ReactRxDemo />}
      ></Route>
      <Route
        path="/CHANGELOG.md"
        element={<Changelog />}
      />
      <Route
        path="/packages/:name"
        element={<Readme />}
      />
      <Route
        path="/packages/:name/CHANGELOG.md"
        element={<Changelog />}
      />
      <Route
        path="/"
        element={<Readme />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      ></Route>
    </Routes>
  </Router>
)
