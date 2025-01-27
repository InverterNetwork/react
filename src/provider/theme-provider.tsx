'use client'

// Import necessary libraries and types
import * as React from 'react'
import type { InverterThemeConfig } from '@/types'

// Import global CSS styles
import '../styles/global.css'

// Define the props type for the ThemeProvider component
export type ThemeProviderProps = {
  children: React.ReactNode // Children components to be wrapped by the provider
  themeConfig?: InverterThemeConfig // Optional theme configuration
}

// Component to inject a script that initializes the theme based on saved preferences or system settings
const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        const getSystemPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const storedThemePreference = document.cookie.match(/inverterTheme=(light|dark|system)/)?.[1];
        const resolvedTheme = storedThemePreference === 'system' ? getSystemPreferredTheme() : (storedThemePreference || 'light');
        document.documentElement.setAttribute('data-inverter-theme', resolvedTheme);
        `,
      }}
    />
  )
}

// Component to define and inject CSS styles dynamically based on theme configuration
const ThemeStyles = ({
  themeConfig,
}: {
  themeConfig?: InverterThemeConfig
}) => {
  // Helper function to convert theme variables into CSS variables
  const generateCSSVariables = (variables?: Record<string, string>) => {
    return Object.entries(variables || {})
      .map(([key, value]) => `--in--${key}: ${value};`)
      .join('')
  }

  // Generate CSS variables for base, light, and dark themes
  const baseThemeVariables = generateCSSVariables(themeConfig?.baseTheme || {})
  const lightThemeVariables = generateCSSVariables(
    themeConfig?.lightTheme || {}
  )
  const darkThemeVariables = generateCSSVariables(themeConfig?.darkTheme || {})

  // Combine CSS for different themes
  const themeCSS = `
      :root {${baseThemeVariables}}
      [data-inverter-theme="light"] {${lightThemeVariables}}
      [data-inverter-theme="dark"] {${darkThemeVariables}}
    `

  // Apply the generated CSS dynamically to the document
  React.useLayoutEffect(() => {
    document.documentElement.style.cssText = themeCSS
  }, [themeCSS])

  return <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
}

// Main ThemeProvider component that wraps children and manages theme settings
export function ThemeProvider({ children, themeConfig }: ThemeProviderProps) {
  React.useEffect(() => {
    // Function to determine system theme (light or dark)
    const getSystemPreferredTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    // Determine the theme based on configuration or saved preference
    const selectedTheme =
      themeConfig?.theme ||
      document.cookie.match(/inverterTheme=(light|dark|system)/)?.[1] ||
      'light'

    // Resolve the actual theme to apply
    const resolvedTheme =
      selectedTheme === 'system' ? getSystemPreferredTheme() : selectedTheme

    // Function to update the theme attributes and styles
    const applyTheme = () => {
      document.documentElement.setAttribute(
        'data-inverter-theme',
        resolvedTheme
      )
      document.documentElement.style.colorScheme = resolvedTheme
    }

    // Apply the theme and save the preference in cookies
    applyTheme()
    document.cookie = `inverterTheme=${selectedTheme}; path=/; max-age=31536000; SameSite=Strict`
  }, [themeConfig?.theme]) // Re-run effect when theme configuration changes

  return (
    <>
      <ThemeStyles themeConfig={themeConfig} />
      <ThemeScript />
      {children}
    </>
  )
}
