import { ArwesThemeProvider, StylesBaseline } from '@arwes/core'
import '@fontsource/source-code-pro'
import '@fontsource/titillium-web'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
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
    <ArwesThemeProvider>
      <StylesBaseline />
      {getLayout(<Component {...pageProps} />)}
    </ArwesThemeProvider>
  )
}

export default App
