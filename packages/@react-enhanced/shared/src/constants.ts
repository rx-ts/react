import type { ValueOf } from '@react-enhanced/types'
import type { TemplateOptions } from 'lodash'


// `method` must be uppercased for `fetch`, otherwise `patch` will fail...
export const ApiMethod = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

export type ApiMethod = ValueOf<typeof ApiMethod>

export const TEMPLATE_OPTIONS: TemplateOptions = Object.freeze({
  // eslint-disable-next-line regexp/match-any, regexp/strict -- expected
  interpolate: /{{([\S\s]+?)}}/g,
})

export const DEFAULT_PAGE = 1

export const DEFAULT_PAGE_LIMIT = 20

export const MILLISECONDS_SECOND = 1000
export const MILLISECONDS_MINUTE = MILLISECONDS_SECOND * 60
export const MILLISECONDS_HOUR = MILLISECONDS_MINUTE * 60
export const MILLISECONDS_DAY = MILLISECONDS_HOUR * 24
export const MILLISECONDS_WEEK = MILLISECONDS_DAY * 7

export const ALL = 'all'

export const COLON = ':'
export const COMMA = ','
export const DOT = '.'
export const EMPTY = ''
export const HYPHEN = '-'
export const PERCENT = '%'
export const SLASH = '/'
export const SPACE = ' '

export const TRUE = 'true'
export const FALSE = 'false'

export const ZERO = 0

export type Empty = typeof EMPTY
