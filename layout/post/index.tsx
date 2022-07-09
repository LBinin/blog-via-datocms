import React, { useContext } from 'react'
import Header from '@/components/base/Header'
import { ThemeContext } from '@/context/theme'
import Footer from '@/components/base/Footer'
import classnames from 'classnames'

const PostLayout: React.FC<{
  preview?: boolean;
}> = props => {
  const { preview, children } = props

  const { theme, toggleTheme } = useContext(ThemeContext)

  console.log({ theme })

  const handleBackTop = () => {
    scrollTo({ top: 0 })
  }

  const handleToggleTheme = (e: any) => {
    console.log({ e })
    e?.preventDefault()
    e?.stopPropagation()
    toggleTheme()
  }

  const isDarkTheme = theme === 'dark'

  return (
    <div className="min-h-screen">
      <Header preview={preview} />

      {children}

      {/* 右下角功能区 */}
      <div className="fixed flex-col gap-3 right-4 bottom-4 md:right-8 md:bottom-8 flex">
        {/* dark:text-gray-400 dark:hover:bg-gray-600 */}
        <button onClick={handleBackTop} className="p-2 !bg-opacity-50 backdrop-blur backdrop-filter bg-zinc-200 dark:bg-zinc-800 md:bg-transparent text-zinc-500 dark:text-zinc-200 transition-all rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </button>

        <button onClick={handleToggleTheme} className="relative cursor-pointer p-2 w-6 h-6 !bg-opacity-50 backdrop-blur backdrop-filter bg-zinc-200 dark:bg-zinc-800 md:bg-transparent box-content overflow-hidden text-zinc-500 dark:text-zinc-200 transition-all rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
          {/*<input type="checkbox" defaultChecked={theme === 'dark'} className="peer appearance-none"/>*/}
          {/* Start Icon */}
          <svg className={classnames('absolute left-2 top-2 w-6 h-6 p-0.5 transition-all duration-300 ease-in-out', { 'translate-y-full': isDarkTheme, 'opacity-0': isDarkTheme })} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>

          {/* Sun Icon */}
          <svg className={classnames('absolute left-2 top-2 w-6 h-6 transition-all duration-300 ease-in-out opacity-0 -translate-y-full', { 'translate-y-0': isDarkTheme, 'opacity-100': isDarkTheme })} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default PostLayout
