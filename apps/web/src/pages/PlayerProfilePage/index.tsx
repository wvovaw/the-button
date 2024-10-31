import { useParams } from 'react-router-dom'

function PlayerProfilePage() {
  const { id } = useParams()
  return (
    <>
      <h1>Player({id}) profile</h1>
    </>
  )
}

export { PlayerProfilePage }
