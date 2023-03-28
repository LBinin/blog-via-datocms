import React, { useRef } from 'react'
import Link from 'next/link'
import { useLongPress } from 'ahooks'
import GlobalSearch from '@/components/search/GlobalSearch'
import ThemeButton from '@/components/base/ThemeButton'

const Header: React.FC<{
  preview?: boolean
}> = props => {
  const { preview } = props

  const titleRef = useRef<HTMLAnchorElement>(null)

  useLongPress(
    () => {
      window.location.href = '/api/preview'
    },
    titleRef,
    { delay: 2000 }
  )

  return (
    <header className="firefox:bg-opacity-90 sticky top-0 z-30 h-[70px] border-b border-gray-200 bg-white !bg-opacity-50 backdrop-blur backdrop-filter dark:border-midnight-200 dark:bg-midnight-100">
      <div className="mx-5 flex h-full items-center md:mx-auto md:px-7">
        <Link href="/">
          <a ref={titleRef} className="flex items-center">
            <span className="mr-3 text-3xl opacity-70 md:text-4xl">✍</span>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter text-zinc-700 dark:text-white md:text-4xl">
              Bigno.
            </h1>
          </a>
        </Link>

        {preview && (
          <a className="ml-5" href="/api/exit-preview">
            {/* 旋转：-translate-x-14 -translate-y-2 rotate-12 */}
            <div className="rounded bg-amber-400 bg-opacity-80 px-2 py-1 text-xs font-bold uppercase text-amber-50">
              Preview
            </div>
          </a>
        )}

        <div className="ml-auto flex space-x-2 items-center">
          <GlobalSearch/>

          <ThemeButton />
        </div>
      </div>
    </header>
  )
}

export default Header
