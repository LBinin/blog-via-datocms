import React, { useEffect, useState } from 'react'

export const ThemeContext = React.createContext<{
  theme: ThemeType
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

export const STORE_THEME_KEY = 'THEME'
export type ThemeType = 'light' | 'dark'

export const ThemeContextProvider: React.FC = props => {
  const { children } = props
  const [theme, setTheme] = useState<ThemeType>('light')

  useEffect(() => {
    const storeTheme = localStorage.getItem(STORE_THEME_KEY) as ThemeType
    if (storeTheme) { setTheme(storeTheme) }
  }, [])

  const handleToggleTheme = () => {
    setTheme(t => {
      switch (t) {
        case 'light':
          return 'dark'
        case 'dark':
        default:
          return 'light'
      }
    })
  }

  useEffect(() => {
    const html = document.documentElement
    html.classList.add(theme)
    localStorage.setItem(STORE_THEME_KEY, theme)
    html.style.colorScheme = theme

    return () => {
      html.classList.remove(theme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
