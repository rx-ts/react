import type { ContextFC } from '@react-enhanced/types'
import { useMemo, useState } from 'react'

import { Locale } from './constants.js'
import { TranslateContext } from './context.js'
import { setLang } from './helpers.js'
import type { ITranslateContext } from './types.js'

export const TranslateContextProvider: ContextFC<
  ITranslateContext,
  Omit<ITranslateContext, 'locale' | 'setLocale'>
> = ({ defaultLocale, allTranslations, loose, locales, ...props }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  return (
    <TranslateContext.Provider
      value={useMemo(
        () => ({
          defaultLocale,
          locale,
          locales,
          setLocale(nextLocale: Locale | ((prevLocale: Locale) => Locale)) {
            if (typeof nextLocale === 'function') {
              nextLocale = nextLocale(locale)
            }
            setLocale(nextLocale)
            setLang(nextLocale)
          },
          allTranslations,
          loose,
        }),
        [defaultLocale, allTranslations, loose, locales, locale],
      )}
      {...props}
    />
  )
}
