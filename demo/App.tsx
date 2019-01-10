import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Subscribe } from 'react-rx'
import { EMPTY, merge, Subject } from 'rxjs'
import {
  debounceTime,
  switchMapTo,
  tap,
  timestamp,
  withLatestFrom,
} from 'rxjs/operators'

const getTextWithScore = (score: number, rank?: number) =>
  `You get score ${score}ms${
    rank ? `, and have beaten ${rank}% of people` : ''
  }!`

class App extends React.PureComponent {
  mouseDown$ = new Subject()

  mouseUp$ = new Subject()

  text$ = new Subject<string | null>()

  score$ = this.mouseUp$.pipe(
    timestamp(),
    withLatestFrom(
      this.mouseDown$.pipe(timestamp()),
      (end, start) => end.timestamp - start.timestamp,
    ),
    tap(score => this.text$.next(getTextWithScore(score))),
    debounceTime(500),
    tap(score =>
      fetch('https://timing-sense-score-board.herokuapp.com/score/' + score)
        .then(response => response.json())
        .then(({ rank }) => this.text$.next(getTextWithScore(score, rank))),
    ),
    switchMapTo(EMPTY),
  )

  textWithScore$ = merge(this.text$, this.score$)

  onMouseDown = () => this.mouseDown$.next()

  onMouseUp = () => this.mouseUp$.next()

  render() {
    return (
      <>
        <button onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          Action
        </button>
        <p>
          <Subscribe>{this.textWithScore$}</Subscribe>
        </p>
      </>
    )
  }
}

const AppContainer = module.hot ? hot(App) : App

export { AppContainer as App }
