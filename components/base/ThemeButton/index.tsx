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
      className="relative box-content h-4 w-4 md:h-6 md:w-6 cursor-pointer overflow-hidden rounded p-2 text-gray-400 dark:text-[#ebebeb]/60 transition-all md:hover:bg-zinc-200 md:dark:hover:bg-zinc-700"
    >
      <svg
        className={classnames(
          'absolute left-1.5 top-1.5 md:left-2 md:top-2 h-5 w-5 md:h-6 md:w-6 p-0.5 transition-all duration-300 ease-in-out',
          { 'translate-y-full': isDarkTheme, 'opacity-0': isDarkTheme }
        )}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path>
      </svg>

      {/* Sun Icon */}
      <svg
        className={classnames(
          'absolute left-1.5 top-1.5 md:left-2 md:top-2 h-5 w-5 md:h-6 md:w-6 -translate-y-full opacity-0 transition-all duration-300 ease-in-out',
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
