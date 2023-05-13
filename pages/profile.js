import { useActiveProfile } from '@lens-protocol/react-web'
import { ContentFocus, ProfileOwnedByMe, useCreatePost } from '@lens-protocol/react-web'


export default function MyProfile () {
  const { data, loading, error } = useActiveProfile()

  console.log(data)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  if (!data) return <p>No active profile</p>

  return (
    <div>
      <Compose publisher={data.id}/>
      <p>Active profile: {data.handle}</p>
    </div>
  )
}

function upload(){
  return 'https://ipfs.moralis.io:2053/ipfs/QmPH1bNkXepEQUJ9k3qs1oxvUPb1KPza9H51kjzM1GfHTH/loan-details'
}

function Compose ({ publisher }) {
  const { execute: create } = useCreatePost({
    profileId: publisher,
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

return (
  <div>
    <p>Active profile: {publisher}</p>
    <form onSubmit={onSubmit}>
      <button type='submit'>SUBMIT</button>
    </form>
  </div>
)}
