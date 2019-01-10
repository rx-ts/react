import { BehaviorSubject } from 'rxjs'

export interface ITodo {
  id: number
  title: string
  completed: boolean
}

export enum TodoFilter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const TODO_FILTERS = Object.entries(TodoFilter)

const LOCAL_STORAGE_KEY = 'REACT_RX_TODO_LIST'

const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

let todos: ITodo[] = (storage && JSON.parse(storage)) || []

let uid = todos.length

export const todos$ = new BehaviorSubject<ITodo[]>(todos)

todos$.subscribe(newTodos => {
  todos = newTodos
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
})

export const addTodo = (title: string) => {
  const todo = { id: ++uid, title, completed: false }
  todos$.next([...todos, todo])
}

export const changeTodoTitle = (id: number, title: string) => {
  const todo = todos.find(({ id: _id }) => _id === id)
  if (!todo) {
    return
  }
  todo.title = title
  todos$.next([...todos])
}

export const toggleTodoStatus = (id: number, completed?: boolean) => {
  const todo = todos.find(({ id: _id }) => _id === id)
  if (!todo) {
    return
  }
  todo.completed = completed === undefined ? !todo.completed : completed
  todos$.next([...todos])
}

export const setAllTodosStatus = (completed: boolean) => {
  todos.forEach(todo => (todo.completed = completed))
  todos$.next([...todos])
}

export const deleteTodo = (id: number) =>
  todos$.next(todos.filter(({ id: _id }) => _id !== id))

export const clearComputedTodos = () =>
  todos$.next(todos.filter(({ completed }) => !completed))

export const todoFilter$ = new BehaviorSubject<TodoFilter>(TodoFilter.ALL)

export const changeTodoFilter = (todoFilter: TodoFilter) =>
  todoFilter$.next(todoFilter)
