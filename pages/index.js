import Head from 'next/head'
import { useActiveWallet } from '@lens-protocol/react-web'
import Typography from '@mui/material/Typography'


export default function Home () {
  const { data: wallet, error, loading } = useActiveWallet()

  if (loading) return <div>loading...</div>

  if (!wallet) {
    return <Typography variant='body1'>
      You are logged-out
    </Typography>
  }

  return (
    <Typography variant='body1'>
      You are logged-in with {wallet.address}
    </Typography>
  )
}
