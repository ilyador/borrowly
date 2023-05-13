import { useActiveProfile } from '@lens-protocol/react-web'
import { ContentFocus, useCreatePost } from '@lens-protocol/react-web'
import Link from 'next/link'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'


export default function MyProfile () {
  const { data, loading, error } = useActiveProfile()

  console.log(data)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  if (!data) return <p>No active profile</p>

  return <Compose publisher={data}/>

}

async function upload () {
  return 'https://ipfs.moralis.io:2053/ipfs/QmPH1bNkXepEQUJ9k3qs1oxvUPb1KPza9H51kjzM1GfHTH/loan-details'
}

function Compose ({ publisher }) {
  const { execute: create, error } = useCreatePost({
    publisher,
    upload
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const _res = await create({
        content: 'HELLO POST',
        contentFocus: ContentFocus.TEXT,
        locale: 'en'
      })

      console.log(_res)
    }

    catch (error) {
      console.log(error)
    }
  }

  return (<>
      <Typography variant='h6'>
        Active profile: {publisher.id}
      </Typography>
      <form onSubmit={onSubmit}>
        <Button variant='contained' type='submit'>SUBMIT</Button>
      </form>
  </>)
}
