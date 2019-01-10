import { debounce } from 'lodash'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Subscribe } from 'react-rx'
import { combineLatest, Subject } from 'rxjs'
import { map, tap, timestamp, withLatestFrom } from 'rxjs/operators'

class App extends React.PureComponent {
  mouseDown$ = new Subject()

  mouseUp$ = new Subject()

  rank$ = new Subject<number | null>()

  score$ = this.mouseUp$.pipe(
    timestamp(),
    withLatestFrom(
      this.mouseDown$.pipe(timestamp()),
      (end, start) => end.timestamp - start.timestamp,
    ),
    tap(() => this.rank$.next(null)),
    tap(
      debounce(
        score =>
          fetch('https://timing-sense-score-board.herokuapp.com/score/' + score)
            .then(response => response.json())
            .then(({ rank }) => this.rank$.next(rank)),
        500,
      ),
    ),
  )

  text$ = combineLatest(this.score$, this.rank$).pipe(
    map(
      ([score, rank]) =>
        `You get score ${score}ms${
          rank ? `, and have beaten ${rank}% of people` : ''
        }!`,
    ),
  )

  onMouseDown = () => this.mouseDown$.next()

  onMouseUp = () => this.mouseUp$.next()

  render() {
    return (
      <>
        <button onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          Action
        </button>
        <p>
          <Subscribe>{this.text$}</Subscribe>
        </p>
      </>
    )
  }
}

const AppContainer = module.hot ? hot(App) : App

export { AppContainer as App }
