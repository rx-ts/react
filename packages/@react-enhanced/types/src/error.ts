export interface ApiErrorOptions<
  R extends string = string,
  E extends object = object,
  T = unknown,
> {
  code: number
  reason: R
  message: string
  extra?: E
  details?: T[]
}

export interface ApiError<
  R extends string = string,
  E extends object = object,
  T = unknown,
> extends ApiErrorOptions<R, E, T>,
    Error {
  // client
  response?: Response
}
