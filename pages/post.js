import { useActiveProfile } from '@lens-protocol/react-web'
import { ContentFocus, useCreatePost } from '@lens-protocol/react-web'
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


export default function MyProfile () {
  const { data, loading, error } = useActiveProfile()

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
    <Box component='form' onSubmit={onSubmit}>
      <Typography variant='h3'>
        Request for a borrow
      </Typography>
      <TextField
        fullWidth
        label='Borrow Title'
        margin='normal'
      />
      <TextField
        fullWidth
        multiline
        label='Borrow Description'
        margin='normal'
      />
      <Typography variant='h6'>
        Amount & interest
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <TextField
            fullWidth
            label='Borrow Title'
            margin='normal'
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label='Borrow Title'
            margin='normal'
          />
        </Grid>
      </Grid>
      <Button sx={{ my: 2 }} variant='contained' type='submit'>Preview request</Button>
    </Box>
  </>)
}
