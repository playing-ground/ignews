import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import Layout from '../components/Layout'
import '../styles/globals.css'

const roboto = Roboto({
  weight: ['400', '500', '700', '900']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily}, sans-serif;
        }
      `}</style>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
