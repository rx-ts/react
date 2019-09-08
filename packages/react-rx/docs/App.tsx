import { Subscribe } from '@rxts/react-rx'
import cn from 'classnames'
import React from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import {
  TODO_FILTERS,
  TodoFilter,
  addTodo,
  changeTodoFilter,
  changeTodoTitle,
  clearComputedTodos,
  deleteTodo,
  setAllTodosStatus,
  todoFilter$,
  todos$,
  toggleTodoStatus,
} from './store'

export interface AppState {
  newTodoValue: string
}

export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    newTodoValue: '',
  }

  editingTodo$ = new BehaviorSubject<{
    id?: number
    value?: string
  }>({})

  todos$ = combineLatest(todos$, todoFilter$, this.editingTodo$).pipe(
    map(([todos, todoFilter, editingTodo]) => {
      switch (todoFilter) {
        case TodoFilter.ACTIVE:
          todos = todos.filter(({ completed }) => !completed)
          break
        case TodoFilter.COMPLETED:
          todos = todos.filter(({ completed }) => completed)
          break
      }
      // tslint:disable jsx-no-lambda
      return (
        <>
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={e => setAllTodosStatus(e.target.checked)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {todos.map(({ id, completed, title }) => (
                <li
                  key={id}
                  className={cn({ completed, editing: editingTodo.id === id })}
                  onDoubleClick={() =>
                    this.editingTodo$.next({ id, value: title })
                  }
                >
                  <div className="view">
                    <input
                      data-id={id}
                      className="toggle"
                      type="checkbox"
                      checked={completed}
                      onChange={this.handleTodoStatus}
                    />
                    <label>{title}</label>
                    <button
                      className="destroy"
                      data-id={id}
                      onClick={this.handleDeleteTodo}
                    />
                  </div>
                  {editingTodo.id === id && (
                    <input
                      className="edit"
                      value={editingTodo.value}
                      autoFocus
                      onChange={e =>
                        this.editingTodo$.next({
                          id,
                          value: e.currentTarget.value,
                        })
                      }
                      onKeyUp={e => {
                        if (e.key !== 'Escape') {
                          return
                        }
                        this.editingTodo$.next({})
                      }}
                      onKeyPress={e => {
                        if (e.key !== 'Enter') {
                          return
                        }
                        e.currentTarget.blur()
                      }}
                      onBlur={() => {
                        changeTodoTitle(id, editingTodo.value!)
                        this.editingTodo$.next({})
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>{todos.length}</strong> item left
            </span>
            <ul className="filters">
              {TODO_FILTERS.map(([key, value]) => (
                <li key={key}>
                  <a
                    className={todoFilter === value ? 'selected' : undefined}
                    onClick={() => changeTodoFilter(value)}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
            <button className="clear-completed" onClick={clearComputedTodos}>
              Clear completed
            </button>
          </footer>
        </>
      )
    }),
  )

  handleTodoStatus: React.ChangeEventHandler<HTMLInputElement> = e =>
    toggleTodoStatus(+e.currentTarget.dataset.id!)

  handleDeleteTodo: React.MouseEventHandler<HTMLButtonElement> = e =>
    deleteTodo(+e.currentTarget.dataset.id!)

  handleAddTodo: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key !== 'Enter') {
      return
    }
    const newTodoValue = e.currentTarget.value.trim()
    if (!newTodoValue) {
      return
    }
    addTodo(newTodoValue)
    this.setState({ newTodoValue: '' })
  }

  handleNewTodoChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      newTodoValue: e.currentTarget.value,
    })
  }

  render() {
    const { newTodoValue } = this.state
    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newTodoValue}
              onChange={this.handleNewTodoChange}
              onKeyPress={this.handleAddTodo}
            />
          </header>
          <Subscribe>{this.todos$}</Subscribe>
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
          </p>
          <p>
            Created by <a href="http://todomvc.com">you</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </>
    )
  }
}
