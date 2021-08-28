import React, { ComponentType, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import '../assets/global.scss'
import Homepage from '../README.md'

import { ReactRxDemo } from './components'

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/packages/:id">
        {({ match }) => {
          const Matched = React.lazy(
            () =>
              import(`../packages/${match!.params.id}/README.md`).catch(() => ({
                default: () => <Redirect to="/" />,
              })) as Promise<{ default: ComponentType }>,
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
