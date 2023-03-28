import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { STORE_THEME_KEY } from '@/context/theme'

const Document: React.FC = () => {
  return (
    <Html lang="zh">
      <Head>
        <link rel="preconnect" href="https://3htsyavnb3-dsn.algolia.net" crossOrigin="anonymous" />
      </Head>
      <body className="dark:bg-midnight-100 dark:text-stone-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
