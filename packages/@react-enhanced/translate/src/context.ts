import { createContext } from 'react'

import type { ITranslateContext } from './types.js'

export const TranslateContext = createContext<ITranslateContext>(null!)
