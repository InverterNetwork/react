import type { InverterThemeConfig } from '@/provider'

// Add this script to be inserted into the page
export const getThemeScript = (theme?: 'light' | 'dark') => `
  (function() {
    const theme = document.cookie.match(/inverterTheme=(light|dark)/)?.[1] || ${theme} || 'light';
    document.documentElement.setAttribute('data-inverter-theme', theme);
  })();
`

// Add this function outside of the component
export function getThemeFromCookie(): 'light' | 'dark' | undefined {
  // This check is necessary for SSR
  if (typeof document !== 'undefined') {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)inverterTheme\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    ) as 'light' | 'dark' | undefined
  }
  return undefined
}

// Create style element with CSS variables
export const getCssVariables = (themeConfig?: InverterThemeConfig) => {
  const baseStyles = themeConfig?.baseTheme
    ? Object.entries(themeConfig.baseTheme)
        .map(([key, value]) => `--in--${key}: ${value};`)
        .join('\n')
    : ''

  const lightStyles = themeConfig?.lightTheme
    ? Object.entries(themeConfig.lightTheme)
        .map(([key, value]) => `--in--${key}: ${value};`)
        .join('\n')
    : ''

  const darkStyles = themeConfig?.darkTheme
    ? Object.entries(themeConfig.darkTheme)
        .map(([key, value]) => `--in--${key}: ${value};`)
        .join('\n')
    : ''

  return `
    :root {
      ${baseStyles}
      ${lightStyles}
    }

    [data-inverter-theme='dark'] {
      ${darkStyles}
    }
  `
}
