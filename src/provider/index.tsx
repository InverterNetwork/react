'use client'

import * as React from 'react'
import type { InverterThemeConfig } from './theme-provider'
import { ThemeProvider } from './theme-provider'
import '../styles/global.css'

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
  return <ThemeProvider themeConfig={themeConfig}>{children}</ThemeProvider>
}

export type { InverterThemeConfig }
