'use client'

import * as React from 'react'

export type InverterThemeConfig = {
  theme?: 'light' | 'dark'
}

// Add this function outside of the component
function getThemeFromCookie(): 'light' | 'dark' | undefined {
  // This check is necessary for SSR
  if (typeof document !== 'undefined') {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)inverterTheme\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    ) as 'light' | 'dark' | undefined
  }
  return undefined
}

// Add this script to be inserted into the page
const themeScript = `
  (function() {
    const theme = document.cookie.match(/inverterTheme=(light|dark)/)?.[1] || 'light';
    document.documentElement.setAttribute('data-inverter-theme', theme);
  })();
`

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

export function ThemeProvider({
  children,
  themeConfig,
}: InverterProviderProps) {
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

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </>
  )
}
