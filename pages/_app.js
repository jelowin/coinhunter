import { GlobalContextProvider } from '../context/globalContext'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default MyApp
