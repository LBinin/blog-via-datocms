import React, { useEffect, useState } from 'react'
import Footer from '@/components/post/Footer'
import useDocument from '@/hooks/useDocument'
import { useScroll } from 'ahooks'

const PostLayout: React.FC<{
  preview?: boolean
}> = props => {
  const { preview, children } = props

  const [showEmptyParagraph, setShowEmptyParagraph] = useState(false)
  const doc = useDocument()
  const scroll = useScroll(doc)

  const handleBackTop = () => {
    scrollTo({ top: 0 })
  }

  const isScrollToTop = (scroll?.top ?? 0) <= 60;

  useEffect(() => {
    if (!doc || !preview) {
      return
    }
    const html = doc.documentElement

    if (showEmptyParagraph) {
      html.classList.add('preview')
    } else {
      html.classList.remove('preview')
    }
  }, [showEmptyParagraph, doc, preview])

  return (
    // float-left 是为了触发 BFC
    <div className="float-left w-full">

      <div className="absolute inset-x-0 top-0 hidden h-[420px] bg-stone-100 dark:bg-midnight-200 md:block" />

      {/* 文章主题 */}
      {children}

      {/* 右下角功能区 */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-3 md:right-8 md:bottom-8">
        <button
          title="Back To Top"
          onClick={handleBackTop}
          style={{ opacity: isScrollToTop ? 0 : 1, pointerEvents: isScrollToTop ? 'none' : 'unset' }}
          className="rounded-full bg-zinc-200 !bg-opacity-50 p-2 text-zinc-500 backdrop-blur backdrop-filter transition-all md:hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 md:dark:hover:bg-zinc-700 md:bg-transparent"
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* 展示空行 */}
        {preview && (
          <button
            title="Show Empty Paragraph"
            onClick={() => setShowEmptyParagraph(v => !v)}
            className="rounded-full bg-zinc-200 !bg-opacity-50 p-2 text-zinc-500 backdrop-blur backdrop-filter transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 md:bg-transparent"
          >
            {showEmptyParagraph ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default PostLayout
