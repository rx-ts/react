import { useConstant } from '@react-enhanced/hooks'
import { TEMPLATE_OPTIONS } from '@react-enhanced/shared'
import type { Arrayable, KeyOf, Nilable, Optional } from '@react-enhanced/types'
import { arrayify, isObjectType } from '@react-enhanced/utils'
import { get, template } from 'lodash'
import type { Context } from 'react'
import { useCallback, useContext } from 'react'

import {
  DEFAULT_LOCALE,
  DEFAULT_LOCALES,
  FALLBACK_LOCALE,
} from './constants.js'
import { TranslateContext } from './context.js'
import type {
  ITranslateContext,
  TranslateState,
  TranslateWarn,
} from './types.js'

function _getLooseLocale(locale: string) {
  return locale.split(/[_-]/)[0]
}

function _getValue<L extends string, T>(
  source: Partial<Record<L, T>> | null,
  locale: L,
  loose?: boolean,
  defaultLocale: L = locale,
): Nilable<T> {
  if (!source) {
    return
  }
  /**
   * workaround for @see https://github.com/typescript-eslint/typescript-eslint/issues/3755
   */
  let value = source[locale] as Nilable<Partial<Record<L, T>>[L]>
  if (value == null && loose) {
    const looseLocale = _getLooseLocale(locale) as L
    value =
      locale === looseLocale
        ? Object.entries<T>(source as Record<L, T>).find(
            ([key]) => locale === _getLooseLocale(key),
          )?.[1]
        : source[looseLocale]
  }
  if (value == null && locale !== defaultLocale) {
    return _getValue(source, defaultLocale, loose)
  }
  return value
}

function _getWithFallback<L extends string, T>(
  key: Arrayable<number | string>,
  locale: L,
  translationsList: i18n.Translations[],
  index: number,
  loose?: boolean,
  defaultLocale: L = locale,
): {
  value?: Nilable<string>
  warns: Array<TranslateWarn<L>>
} {
  const translations = translationsList[index]
  let value = get(
    _getValue(
      translations as Partial<Record<L, T>>,
      locale,
      loose,
      defaultLocale,
    ),
    key,
  ) as unknown
  let warns: Array<TranslateWarn<L>> = []
  if (
    value != null &&
    typeof value === 'object' &&
    typeof get(value, Symbol.toPrimitive) !== 'function'
  ) {
    warns = [
      ...warns,
      {
        key,
        locale,
        value,
      },
    ]
    value = null
  }
  if (locale !== defaultLocale) {
    let defaultLocaleWarns: Array<TranslateWarn<L>>
    ;({ value, warns: defaultLocaleWarns } = _getWithFallback(
      key,
      defaultLocale,
      translationsList,
      index,
      loose,
    ))
    warns = [...warns, ...defaultLocaleWarns]
  }
  if (value == null && index > 0) {
    let nextWarns: Array<TranslateWarn<L>>
    ;({ value, warns: nextWarns } = _getWithFallback(
      key,
      locale,
      translationsList,
      index - 1,
      loose,
      defaultLocale,
    ))
    warns = [...warns, ...nextWarns]
  }
  return {
    value: value == null ? value : String(value),
    warns,
  }
}

function _get<L extends string>(
  key: Arrayable<number | string>,
  locale: L,
  translationsList?: i18n.Translations[],
  ignoreWarn?: boolean,
  loose?: boolean,
  defaultLocale: L = locale,
) {
  if (!translationsList?.length) {
    return
  }
  const { value, warns } = _getWithFallback(
    key,
    locale,
    translationsList,
    translationsList.length - 1,
    loose,
    defaultLocale,
  )
  if (value != null) {
    return value
  }
  if (warns.length > 0) {
    if (process.env.NODE_ENV === 'development' && !ignoreWarn) {
      for (const { locale, key } of warns) {
        console.warn(
          `The translation for locale: \`${locale}\` and key: \`${JSON.stringify(
            key,
          )}\` is an object, which could be unexpected`,
        )
      }
    }
    return String(warns[0].value)
  }
  if (process.env.NODE_ENV === 'development' && !ignoreWarn) {
    console.warn(
      `No translation found for locale: \`${locale}\` and key: \`${String(
        key,
      )}\`, which could be unexpected`,
    )
  }
}

const NUM_OR_STR_TYPES = new Set(['number', 'string'])

const isNumOrStr = (value: unknown): value is number | string =>
  NUM_OR_STR_TYPES.has(typeof value)

const checkTranslations = <
  T extends i18n.Translations,
  L extends KeyOf<T>,
  N extends KeyOf<T[L]>,
>(
  allTranslations: i18n.Translations[],
  translations?: Arrayable<i18n.Translations> | N,
) => {
  if (!translations || isNumOrStr(translations)) {
    return
  }

  for (const item of arrayify(translations)) {
    if (
      isObjectType<i18n.Translations>(item) &&
      !allTranslations.includes(item)
    ) {
      allTranslations.push(item)
    }
  }
}

const getNamespaces = <
  T extends i18n.Translations,
  L extends KeyOf<T>,
  N extends KeyOf<T[L]>,
>(
  translations?: Arrayable<i18n.Translations> | N,
  namespaces?: N,
): N[] => {
  if (Array.isArray(namespaces)) {
    return namespaces
  }

  if (isNumOrStr(namespaces)) {
    return [namespaces]
  }

  if (isNumOrStr(translations)) {
    return [translations]
  }

  if (!Array.isArray(translations)) {
    return []
  }

  return translations.reduce<N[]>((acc, curr) => {
    if (isNumOrStr(curr)) {
      // array namespaces is actually supported, but lack of typings for performance reason
      acc.push(curr as unknown as N)
    }
    return acc
  }, [])
}

export function useTranslate<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
>(): TranslateState<T, L>
export function useTranslate<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
  N extends KeyOf<T[L]> = KeyOf<T[L]>,
>(namespaces: N): TranslateState<T, L, N>
export function useTranslate<
  T extends i18n.Translations = i18n.I18n,
  L extends KeyOf<T> = KeyOf<T>,
  N extends KeyOf<T[L]> = never,
>(
  translations: Arrayable<i18n.Translations>,
  namespaces?: N,
): TranslateState<T, L, N>
export function useTranslate<
  T extends i18n.Translations,
  L extends KeyOf<T>,
  N extends KeyOf<T[L]>,
>(translations?: Arrayable<i18n.Translations> | N, namespaces?: N) {
  const {
    defaultLocale = FALLBACK_LOCALE as L,
    locale = DEFAULT_LOCALE as L,
    setLocale,
    allTranslations,
    loose,
    locales = DEFAULT_LOCALES as L[],
  } = useContext(
    TranslateContext as unknown as Context<ITranslateContext<T, L>>,
  )

  checkTranslations(allTranslations, translations)

  const ns = useConstant(() => getNamespaces(translations, namespaces))

  const raw: TranslateState<T, L, N>['raw'] = useCallback(
    (key, ignoreWarn) => {
      if (isObjectType<Partial<Record<L, string>>>(key)) {
        return _getValue(key, locale, loose, defaultLocale)
      }

      const keys = arrayify(ns, key as Arrayable<number | string, never>)

      // no keys to translate, just ignore it, happens on optional chaining usually
      if (keys.length === 0) {
        return
      }

      return _get(
        /**
         * @notable
         * Array paths are actually supported,
         * but the ts performance is unacceptable,
         * so it is just disabled in ts typings.
         */
        keys,
        locale,
        allTranslations,
        ignoreWarn,
        loose,
        defaultLocale,
      )
    },
    [allTranslations, defaultLocale, locale, loose, ns],
  )

  const t: TranslateState<T, L, N>['t'] = useCallback(
    (key, data, ignoreWarnOrFallbackKey) => {
      const isFallbackKey =
        ignoreWarnOrFallbackKey != null &&
        typeof ignoreWarnOrFallbackKey !== 'boolean'

      const ignoreWarn =
        isFallbackKey || (ignoreWarnOrFallbackKey as Optional<boolean>)

      let translation = raw(key, ignoreWarn)

      if (translation == null && isFallbackKey) {
        translation = raw(ignoreWarnOrFallbackKey)
      }

      /**
       * @notable
       * Thanks for ts static checker, we can mark it always `string` here,
       * but actually it could bu nullable at runtime.
       */
      if (translation == null) {
        return (isObjectType(key) ? null : key) as string
      }

      const implicit = { $raw: raw, $t: t, $: data }

      return template(
        translation,
        TEMPLATE_OPTIONS,
      )(isObjectType(data) ? Object.assign(implicit, data) : implicit)
    },
    [raw],
  )

  return {
    defaultLocale,
    locale,
    setLocale,
    allTranslations,
    loose,
    locales,
    raw,
    t,
  }
}
