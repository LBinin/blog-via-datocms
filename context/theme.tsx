import React, { useEffect, useLayoutEffect, useState } from 'react'

export const ThemeContext = React.createContext({ theme: 'light', toggleTheme: () => {} })

export const STORE_THEME_KEY = 'THEME'

export const ThemeContextProvider: React.FC = props => {
  const { children } = props
  const [theme, setTheme] = useState('light')

  useLayoutEffect(() => {
    const storeTheme = localStorage.getItem(STORE_THEME_KEY)
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
