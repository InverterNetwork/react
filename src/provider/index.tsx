'use client'

import * as React from 'react'
import '../styles/global.css'

/**
 * InverterProviderProps
 * @typedef {Object} InverterProviderProps
 * @property {React.ReactNode} children
 * @property {'light' | 'dark'} theme @default 'light'
 */
type InverterProviderProps = {
  children: React.ReactNode
  theme?: 'light' | 'dark'
}

export function InverterProvider({
  children,
  theme = 'light',
}: InverterProviderProps) {
  React.useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}
