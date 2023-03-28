import React, { useContext } from 'react'
import classnames from 'classnames'
import { ThemeContext } from '@/context/theme'

const ThemeButton: React.FC = props => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const handleToggleTheme = (e: any) => {
    e?.preventDefault()
    e?.stopPropagation()
    toggleTheme()
  }

  const isDarkTheme = theme === 'dark'

  return (
    <button
      title="Change Theme"
      onClick={handleToggleTheme}
      className="relative box-content h-6 w-6 cursor-pointer overflow-hidden rounded-full bg-zinc-200 !bg-opacity-50 p-2 text-zinc-500 backdrop-blur backdrop-filter transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 md:bg-transparent"
    >
      {/*<input type="checkbox" defaultChecked={theme === 'dark'} className="peer appearance-none"/>*/}
      {/* Start Icon */}
      <svg
        className={classnames(
          'absolute left-2 top-2 h-6 w-6 p-0.5 transition-all duration-300 ease-in-out',
          { 'translate-y-full': isDarkTheme, 'opacity-0': isDarkTheme }
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
          clipRule="evenodd"
        />
      </svg>

      {/* Sun Icon */}
      <svg
        className={classnames(
          'absolute left-2 top-2 h-6 w-6 -translate-y-full opacity-0 transition-all duration-300 ease-in-out',
          { 'translate-y-0': isDarkTheme, 'opacity-100': isDarkTheme }
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
  )
}

export default ThemeButton
