import styles from './index.module.scss'
import React, { useRef } from 'react'
import Link from 'next/link'
import { useLongPress } from 'ahooks'
import GlobalSearch from '@/components/search/GlobalSearch'
import ThemeButton from '@/components/base/ThemeButton'
import cx from 'classnames'

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
          <a ref={titleRef} className={cx('flex items-center hover:opacity-80 transition', styles.logo)}>

            {/* 下方是所有 Logo 的过去展示，以后可以回顾 */}

            {/*<div className="bg-midnight-200 py-1 px-2 rounded relative">*/}
            {/*  <span className="uppercase text-white text-2xl align-text-top" style={{ fontFamily: 'IdeaFonts Woodcut' }}>Bigno</span>*/}
            {/*  /!*<div className="absolute bottom-0.5 left-full ml-2 bg-black w-2 h-2 rounded"/>*!/*/}
            {/*  <span className="absolute left-full -bottom-0.5 ml-1 align-text-top leading-none" style={{ fontSize: 40, fontFamily: "IdeaFonts Woodcut" }}>.</span>*/}
            {/*</div>*/}

            {/*<div className="bg-midnight-200 py-1 px-2 rounded relative">*/}
            {/*  <span className="uppercase text-white text-2xl align-text-bottom" style={{ fontFamily: "汉仪天云厚墨体" }}>Bigno</span>*/}
            {/*  /!*<div className="absolute bottom-0.5 left-full ml-2 bg-black w-2 h-2 rounded"/>*!/*/}
            {/*  <span className="absolute left-full bottom-1 ml-1 align-text-top leading-none" style={{ fontSize: 60, fontFamily: "汉仪天云厚墨体" }}>.</span>*/}
            {/*</div>*/}

            {/*<div className="text-3xl font-bold leading-tight tracking-tighter text-zinc-700 dark:text-white md:text-4xl">*/}
            {/*  <span style={{ fontFamily: "savage" }}>Bigno.</span>*/}
            {/*</div>*/}
            {/*<span className="mr-3 text-3xl opacity-70 md:text-4xl ml-3">✍</span>*/}
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
