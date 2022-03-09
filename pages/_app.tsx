import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CounterProvider } from '../utils/context/counter/Counter'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <CounterProvider>
      <Component {...pageProps} />
    </CounterProvider>
  </>
}

export default MyApp
