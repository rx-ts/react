import type { ValueOf } from '@react-enhanced/types'

import { getBrowserLang, getLang } from './helpers.js'

export const Locale = {
  ZH: 'zh',
  EN: 'en',
} as const

export type Locale = ValueOf<typeof Locale>

export const LOCALE_STORAGE = '__LOCALE__'

export const DEFAULT_LOCALES = Object.values(Locale)

export const DEFAULT_LOCALE = getLang(DEFAULT_LOCALES)

export const FALLBACK_LOCALE = getBrowserLang()
