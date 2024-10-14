'use client'

import * as React from 'react'
import '../styles/global.css'

export type InverterThemeConfig = {
  theme?: 'light' | 'dark'
}

/**
 * InverterProviderProps
 * @typedef {Object} InverterProviderProps
 * @property {React.ReactNode} children
 * @property {'light' | 'dark'} theme @default 'light'
 */
export type InverterProviderProps = {
  children: React.ReactNode
  themeConfig?: InverterThemeConfig
}

export function InverterProvider({
  children,
  themeConfig,
}: InverterProviderProps) {
  React.useEffect(() => {
    // Set the html attribute
    document.documentElement.setAttribute(
      'data-inverter-theme',
      themeConfig?.theme ?? 'light'
    )
  }, [themeConfig])

  return <>{children}</>
}
