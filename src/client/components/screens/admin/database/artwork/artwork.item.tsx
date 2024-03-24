import { CoverImage } from '@/client/components/styled/image.styled'
import { IArtwork, IAuthor } from '@/client/models/challenge.types'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
//import { useEffect, useState } from 'react'

interface IArtworkItemProps {
  artwork: IArtwork
  index: number
  handleUpdateAuthor: (artwork: IArtwork) => void
  handleUpdateArtwork: (artwork: IArtwork) => void
  handleShowArtwork: (artwork: IArtwork) => void
  handleRemove: (artwork: IArtwork) => void
}

const ArtworkItem: FC<IArtworkItemProps> = (props) => {
  const {
    artwork,
    index,
    handleUpdateAuthor,
    handleUpdateArtwork,
    handleShowArtwork,
    handleRemove,
  } = props

  const [author, setAuthor] = useState<IAuthor | null>()

  useEffect(() => {
    setAuthor(artwork?.author)
  }, [artwork])

  const onEditAuthorClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleUpdateAuthor(artwork)
  }

  const onEditArtworkClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleUpdateArtwork(artwork)
  }

  const onShowArtworkClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleShowArtwork(artwork)
  }

  const onRemoveClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleRemove(artwork)
  }

  return (
    <tr>
      <th>{index}</th>
      <td>{author ? `${author.firstName} ${author.lastName}` : 'No name'}</td>
      <td>{author ? `${author.age}` : 'unknown'}</td>
      <td>{author ? `${artwork.ageGroup}` : 'unknown'}</td>
      <td>Artwork title</td>
      <td>
        <button onClick={onShowArtworkClick} className="relative w-12 h-12 p-2">
          <CoverImage $background={artwork.url} />
        </button>
      </td>
      <td>
        <button
          onClick={onEditAuthorClick}
          className="btn btn-ghost opacity-30 hover:opacity-100 hover:btn-accent btn-xs btn-outline"
        >
          Edit author
        </button>
      </td>
      <td>
        <button
          onClick={onEditArtworkClick}
          className="btn btn-ghost opacity-30 hover:opacity-100 hover:btn-accent btn-xs btn-outline"
        >
          Edit artwork
        </button>
      </td>
      <td>
        <button
          onClick={onRemoveClick}
          className="btn btn-ghost opacity-30 hover:opacity-100 hover:btn-error btn-outline btn-xs"
        >
          Delete artwork
        </button>
      </td>
    </tr>
  )
}
export default ArtworkItem
