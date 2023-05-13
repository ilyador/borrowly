import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useActiveWallet } from '@lens-protocol/react-web'
import { useActiveProfile } from '@lens-protocol/react-web'


export default function Home () {
  const { data: wallet, error, loading } = useActiveWallet()

  return (
    <>
      <Head>
        <title>Borrowly</title>
        <meta name='description' content='Generated by create next app'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      {loading ?
        <div>loading...</div> :
        <main className={styles.main}>
          {wallet ?
            <p>You are logged-in with {wallet.address}</p> :
            <p>You are logged-out</p>
          }
        </main>
      }
    </>
  )
}
