import { HYPHEN } from '@react-enhanced/shared'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const SHORT_DATE_FORMAT = 'MM-DD'

export const TIME_FORMAT = 'HH:mm:ss'

export const SHORT_TIME_FORMAT = 'HH:mm'

export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`

export const SHORT_DATE_TIME_FORMAT = `${DATE_FORMAT} ${SHORT_TIME_FORMAT}`

export const NOT_AVAILABLE = HYPHEN

export type NotAvailable = typeof NOT_AVAILABLE

export const ERR_INTERNET_DISCONNECTED = 'ERR_INTERNET_DISCONNECTED'
