'use client'

import * as React from 'react'
import type { InverterThemeConfig } from '@/types'

import '../styles/global.css'

export type ThemeProviderProps = {
  children: React.ReactNode
  themeConfig?: InverterThemeConfig
}

const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        const derivedTheme = document.cookie.match(/inverterTheme=(light|dark)/)?.[1] || 'light'
        document.documentElement.setAttribute('data-inverter-theme', derivedTheme)
        document.documentElement.style.colorScheme = derivedTheme
    `,
      }}
    />
  )
}

const ThemeStyles = ({
  themeConfig,
}: {
  themeConfig?: InverterThemeConfig
}) => {
  const parseVariables = (vars?: Record<string, string>) => {
    return Object.entries(vars || {})
      .map(([k, v]) => `--in--${k}: ${v};`)
      .join('')
  }

  const baseVars = parseVariables(themeConfig?.baseTheme || {})
  const lightVars = parseVariables(themeConfig?.lightTheme || {})
  const darkVars = parseVariables(themeConfig?.darkTheme || {})

  const css = `
      :root {${baseVars}}
      [data-inverter-theme="light"] {${lightVars}}
      [data-inverter-theme="dark"] {${darkVars}}
    `

  React.useLayoutEffect(() => {
    document.documentElement.style.cssText = css
  }, [])

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

export function ThemeProvider({ children, themeConfig }: ThemeProviderProps) {
  React.useEffect(() => {
    const theme =
      themeConfig?.theme ||
      document.cookie.match(/inverterTheme=(light|dark)/)?.[1] ||
      'light'
    document.documentElement.setAttribute('data-inverter-theme', theme)
    document.documentElement.style.colorScheme = theme
    document.cookie = `inverterTheme=${theme}; path=/; max-age=31536000; SameSite=Strict`
  }, [themeConfig?.theme])

  return (
    <>
      <ThemeStyles themeConfig={themeConfig} />
      <ThemeScript />
      {children}
    </>
  )
}
