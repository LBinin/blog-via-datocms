import React, { useRef } from 'react'
import Link from 'next/link'
import { useLongPress } from 'ahooks'

const Header: React.FC<{
  preview?: boolean;
}> = props => {
  const { preview } = props

  const titleRef = useRef<HTMLAnchorElement>(null)

  useLongPress(() => {
    window.location.href = '/api/preview'
  }, titleRef, { delay: 2000 })

  return (
    <header className="sticky top-0 z-30 h-[70px] bg-white dark:bg-midnight-100 !bg-opacity-50 backdrop-blur backdrop-filter firefox:bg-opacity-90 border-b border-gray-200 dark:border-midnight-200">
      <div className="max-w-3xl mx-5 md:mx-auto flex items-center h-full">
        <Link href="/">
          <a ref={titleRef} className="flex items-center">
            <span className="text-3xl md:text-4xl mr-3 opacity-70">✍</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-zinc-700 dark:text-white">Bigno.</h1>
          </a>
        </Link>

        {preview && (
          <a className="ml-5" href="/api/exit-preview">
            {/* 旋转：-translate-x-14 -translate-y-2 rotate-12 */}
            <div className="rounded bg-amber-400 bg-opacity-80 text-amber-50 font-bold px-2 py-1 text-xs uppercase">Preview</div>
          </a>
        )}
      </div>
    </header>
  )
}

export default Header
