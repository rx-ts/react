import type { FC, ProviderProps } from 'react'

export type ContextFC<T, Extra = T> = FC<Extra & Partial<ProviderProps<T>>>
