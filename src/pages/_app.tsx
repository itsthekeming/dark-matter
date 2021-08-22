import { ArwesThemeProvider, StylesBaseline } from '@arwes/core'
import '@fontsource/source-code-pro'
import '@fontsource/titillium-web/400.css'
import '@fontsource/titillium-web/600.css'
import '@fontsource/titillium-web/700.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import 'styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <link rel="preload" href="/assets/fonts/Davek.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Rellanic.otf" as="font" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Iokharic.otf" as="font" crossOrigin="" />
      </Head>
      <ArwesThemeProvider>
        <StylesBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ArwesThemeProvider>
    </>
  )
}

export default App
