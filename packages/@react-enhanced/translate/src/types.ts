import type { Arrayable, IfEqual, KeyOf, Nilable } from '@react-enhanced/types'
import type { Dispatch, SetStateAction } from 'react'


export interface Translation {
  [key: string]: Arrayable<Translation | boolean | number | string>
}

export type TranslateKey<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
  N extends KeyOf<T[L]> = never,
> = IfEqual<N, never, KeyOf<T[L]>, KeyOf<T[L][N]>> | { en?: string; zh: string }

export interface ITranslateContext<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
> {
  defaultLocale: L
  locale: L
  setLocale: Dispatch<SetStateAction<L>>
  allTranslations: i18n.Translations[]
  loose?: boolean
  locales?: L[]
}

export interface TranslateState<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
  N extends KeyOf<T[L]> = never,
> extends ITranslateContext<T, L> {
  t(
    this: void,
    key?: TranslateKey<T, L, N>,
    data?: unknown,
    ignoreWarn?: boolean,
  ): string
  t(
    this: void,
    key?: TranslateKey<T, L, N>,
    data?: unknown,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    fallbackKey?: TranslateKey<T, L, N>,
  ): string
  raw(
    this: void,
    key?: TranslateKey<T, L, N>,
    ignoreWarn?: boolean,
  ): Nilable<string>
}

export type StrictValueOf<T> = T extends
  | { [index: number]: infer R }
  | { [index: string]: infer R }
  ? R
  : never

export interface TranslateWarn<L extends string> {
  locale: L
  key: Arrayable<number | string>
  value: object
}
