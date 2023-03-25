import '@/styles/index.scss'
// lightGallery styles
import 'lightgallery/scss/lightgallery.scss'
import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lg-rotate.scss'
import 'lightgallery/scss/lg-fullscreen.scss'

import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ThemeContextProvider } from '@/context/theme'
// import GlobalSearch from '@/components/search/GlobalSearch'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      {/*<GlobalSearch />*/}
      <Component {...pageProps} />
      <Analytics />
    </ThemeContextProvider>
  )
}

export default MyApp
