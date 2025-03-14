import React, { createContext, useState, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { Preview } from './screen'

// Import CSS with proper order to ensure Tailwind processes correctly
import '../src/styles/global.css'

// Add preview-specific styles if needed
import './preview.css'
import { InverterProvider } from '@/provider'

// Create Theme Context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

// Theme Provider Component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <InverterProvider themeConfig={{ theme }}>{children}</InverterProvider>
    </ThemeContext.Provider>
  )
}

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Preview />
    </ThemeProvider>
  </React.StrictMode>
)
