import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import '../assets/global.scss'
import Homepage from '../README.md'

import { ReactRxDemo } from './components'

export const AppBase = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/packages/:id">
        {({ match }) => {
          const Matched = React.lazy(() =>
            import(`../packages/${match!.params.id}/README.md`).catch(() => ({
              default: () => <Redirect to="/" />,
            })),
          )
          return (
            <Suspense fallback={null}>
              <Matched />
            </Suspense>
          )
        }}
      </Route>
      <Route path="/react-rx">
        <ReactRxDemo />
      </Route>
      <Route path="/" exact={true}>
        <Homepage />
      </Route>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)

export const App =
  process.env.NODE_ENV === 'development' ? hot(AppBase) : AppBase
