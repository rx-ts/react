import { useState } from 'react'

export const useConstant = <T>(value: T | (() => T)) => useState(value)[0]
