'use client'

import * as React from 'react'
import {
  getCssVariables,
  getThemeFromCookie,
  getThemeScript,
} from '@/utils/theme'
import type { InverterThemeConfig } from '@/types'
import '../styles/global.css'

/**
 * InverterProviderProps
 * @typedef {Object} InverterProviderProps
 * @property {React.ReactNode} children
 * @property {'light' | 'dark'} theme @default 'light'
 */
export type ThemeProviderProps = {
  children: React.ReactNode
  themeConfig?: InverterThemeConfig
}

// Create a static style element that will be the same on server and client
const StyleInjector = ({
  cssVariables,
  theme,
}: {
  cssVariables: string
  theme?: 'light' | 'dark'
}) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
    <script dangerouslySetInnerHTML={{ __html: getThemeScript(theme) }} />
  </>
)
StyleInjector.displayName = 'StyleInjector'

export function ThemeProvider({ children, themeConfig }: ThemeProviderProps) {
  React.useEffect(() => {
    const cookieTheme = getThemeFromCookie()
    const propsTheme = themeConfig?.theme
    const getTheme = () => {
      if (propsTheme) return propsTheme
      if (cookieTheme) return cookieTheme
      return 'light'
    }
    // Update theme if it changes
    document.documentElement.setAttribute('data-inverter-theme', getTheme())
    document.cookie = `inverterTheme=${getTheme()}; path=/; max-age=31536000; SameSite=Strict`
  }, [themeConfig?.theme])

  const cssVariables = getCssVariables(themeConfig)

  return (
    <>
      <StyleInjector cssVariables={cssVariables} theme={themeConfig?.theme} />
      {children}
    </>
  )
}
