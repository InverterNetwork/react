'use client'

import * as React from 'react'
import '../styles/global.css'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider } from 'next-themes'

/**
 * InverterProviderProps
 * @typedef {Object} InverterProviderProps
 * @property {React.ReactNode} children
 * @property {'light' | 'dark'} theme @default 'light'
 */
type InverterProviderProps = {
  children: React.ReactNode
  themeConfig?: ThemeProviderProps
}

export function InverterProvider({
  children,
  themeConfig = {} as ThemeProviderProps,
}: InverterProviderProps) {
  const {
    attribute = 'class',
    defaultTheme = 'system',
    enableSystem = true,
    disableTransitionOnChange = true,
    ...restThemeConfig
  } = themeConfig
  return (
    <ThemeProvider
      {...{
        attribute,
        defaultTheme,
        enableSystem,
        disableTransitionOnChange,
        ...restThemeConfig,
      }}
    >
      {children}
    </ThemeProvider>
  )
}
