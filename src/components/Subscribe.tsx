import React, { ReactNode } from 'react'
import { Observable, Subscription } from 'rxjs'

export interface SubscribeProps {
  children: Observable<ReactNode>
}

export interface SubscribeState {
  value: React.ReactNode
}

export class Subscribe extends React.PureComponent<
  SubscribeProps,
  SubscribeState
> {
  state = {
    value: null,
  }

  subscription?: Subscription

  subscribe() {
    if (this.subscription) {
      this.unsubscribe()
    }
    this.subscription = this.props.children.subscribe(value => {
      this.setState({ value })
    })
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  componentDidMount() {
    this.subscribe()
  }

  componentDidUpdate(prevProps: SubscribeProps) {
    if (prevProps.children !== this.props.children) {
      this.subscribe()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return this.state.value
  }
}
