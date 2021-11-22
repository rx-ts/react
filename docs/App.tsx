import React, { ComponentType, Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'

import '../assets/global.scss'
import Homepage from '../README.md'

import { ReactRxDemo } from './components'

const Pkg = () => {
  const { id } = useParams<'id'>()
  const Matched = React.lazy(
    () =>
      import(`../packages/${id!}/README.md`).catch(() => ({
        default: () => <Navigate to="/" />,
      })) as Promise<{ default: ComponentType }>,
  )
  return (
    <Suspense fallback={null}>
      <Matched />
    </Suspense>
  )
}

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/packages/:id" element={<Pkg />} />
      <Route path="/react-rx" element={<ReactRxDemo />}></Route>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  </BrowserRouter>
)
