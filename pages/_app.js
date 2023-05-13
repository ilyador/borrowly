import '@/styles/globals.css'
import Head from 'next/head'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { development, production } from '@lens-protocol/react-web'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { LensProvider } from '@lens-protocol/react-web'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'


const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()])


const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})

const lensConfig = {
  bindings: wagmiBindings(),
  environment: development
}


export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#70d297'
    },
    secondary: {
      main: '#d9d9d9'
    },
    background: {
      default: '#fdebdb'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
})



export default function App ({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Borrowly</title>
      <meta name='description' content='Social lending'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/favicon.ico'/>
    </Head>
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Container maxWidth='md'>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </LensProvider>
    </WagmiConfig>
  </>)
}
