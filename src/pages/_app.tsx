import 'styles/globals.css'
import '@fontsource/titillium-web'
import '@fontsource/source-code-pro'
import { ArwesThemeProvider, StylesBaseline } from '@arwes/core'
import type { AppProps } from 'next/app'

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif'
const FONT_FAMILY_CODE = '"Source Code Pro", monospace'

function App({ Component, pageProps }: AppProps) {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <Component {...pageProps} />
    </ArwesThemeProvider>
  )
}

export default App
