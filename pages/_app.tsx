import '@/styles/index.css'
import type { AppProps } from 'next/app'

// lightGallery styles
import 'lightgallery/scss/lightgallery.scss'
import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lg-rotate.scss'
import 'lightgallery/scss/lg-fullscreen.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
