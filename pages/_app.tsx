import '@/styles/index.scss'
// lightGallery styles
import 'lightgallery/scss/lightgallery.scss'
import 'lightgallery/scss/lg-zoom.scss'
import 'lightgallery/scss/lg-rotate.scss'
import 'lightgallery/scss/lg-fullscreen.scss'

import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ThemeContextProvider } from '@/context/theme'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentPathname = router.pathname

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      if (!path?.startsWith('/posts/')) {
        document.documentElement.classList.remove('smooth-scroll')
      }
    }

    const handleRouteChanged = (path: string) => {
      if (path?.startsWith('/posts/')) {
        document.documentElement.classList.add('smooth-scroll')
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChanged)
    router.events.on('routeChangeError', handleRouteChanged)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChanged)
      router.events.off('routeChangeError', handleRouteChanged)
    }
  }, [router])

  useEffect(() => {
    const html = document.documentElement

    if (currentPathname === '/posts/[slug]') {
      html.classList.add('smooth-scroll')
    }

    return () => {
      html.classList.remove('smooth-scroll')
    }
  }, [currentPathname])

  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeContextProvider>
  )
}

export default MyApp
