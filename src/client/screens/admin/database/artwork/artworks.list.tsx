import { IArtwork } from '@/client/models/challenge.types'
import { FC, useEffect, useState } from 'react'
import ArtworkItem from './artwork.item'
import {
  useAllArtworks,
  useDeleteArtwork,
  useUpdateArtworkMetadata,
  useUpdateAuthor,
} from '@/client/services/challenge.service'
import ShowArtworkDialog from '../../components/dialog/show-artwork.dialog'
import {
  useUpdateAtworkMetadata,
  useUpdateAuthorValidator,
} from '../../validator'
import EditAuthorDialog from '../../components/dialog/edit-author.dialog'
import EditArtworkDialog from '../../components/dialog/edit-artwork.dialog'
import DeleteArworkDialog from '../../components/dialog/delete-artwork.dialog'

const ArtworksList: FC = () => {
  /* state */
  const [isValid, setIsValid] = useState(true)
  const [artworks, setArtworks] = useState<IArtwork[]>()
  const [isShowArtworkOpen, setIsShowArtworkOpen] = useState(false)
  const [isEditAuthorOpen, setIsEditAuthorOpen] = useState(false)
  const [isEditArtworkOpen, setIsEditArtworkOpen] = useState(false)
  const [isDeleteArtworkOpen, setIsDeleteArtworkOpen] = useState(false)
  const [currentArtwork, setCurrentArtwork] = useState<IArtwork>()

  /* triggers */
  const { artworks: artworksData, trigger: triggerArtworks } = useAllArtworks()
  const { trigger: triggerUpdateArtwork } = useUpdateArtworkMetadata()
  const { trigger: triggerUpdateAuthor } = useUpdateAuthor()
  const { trigger: triggerDeleteArtwork } = useDeleteArtwork()

  /* validators */
  const {
    register: registerAuthor,
    handleSubmit: handleSubmitAuthor,
    errors: authorErrors,
  } = useUpdateAuthorValidator()
  const {
    register: registerArtwork,
    handleSubmit: handleSubmitArtwork,
    errors: artworkErrors,
  } = useUpdateAtworkMetadata()

  /* rendering */
  useEffect(() => {
    if (!isValid) {
      setIsValid(true)
      triggerArtworks()
    }
  }, [isValid, triggerArtworks])
  useEffect(() => {
    setArtworks(artworksData)
  }, [artworksData])

  /* handlers */
  const handleUpdateAuthor = (artwork: IArtwork) => {
    setCurrentArtwork(artwork)
    setIsEditAuthorOpen(true)
  }
  const handleUpdateArtwork = (artwork: IArtwork) => {
    setCurrentArtwork(artwork)
    setIsEditArtworkOpen(true)
  }
  const handleShowArtwork = (artwork: IArtwork) => {
    setCurrentArtwork(artwork)
    setIsShowArtworkOpen(true)
  }
  const handleRemoveArtwork = (artwork: IArtwork) => {
    setCurrentArtwork(artwork)
    setIsDeleteArtworkOpen(true)
  }

  /* submit handlers */
  const updateAuthorHandler = (data) => {
    console.log(data)
    data['id'] = currentArtwork.author?.id
    triggerUpdateAuthor(data)
    setIsEditAuthorOpen(false)
    setIsValid(false)
  }
  const updateArtworkHandler = (data) => {
    console.log(data)
    data['id'] = currentArtwork.id
    triggerUpdateArtwork(data)
    setIsEditArtworkOpen(false)
  }

  const deleteArtworkHandler = () => {
    triggerDeleteArtwork({ id: currentArtwork.id })
    setIsDeleteArtworkOpen(false)
    setIsValid(false)
  }

  return (
    <div className="w-full flex justify-center overflow-x-auto py-4">
      <table className="table table-xs table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>age</th>
            <th>age group</th>
            <th>title</th>
            <th>icon</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {artworks?.map((artwork, i) => (
            <ArtworkItem
              key={i}
              index={i}
              artwork={artwork}
              handleUpdateAuthor={handleUpdateAuthor}
              handleUpdateArtwork={handleUpdateArtwork}
              handleShowArtwork={handleShowArtwork}
              handleRemove={handleRemoveArtwork}
            />
          ))}
        </tbody>
      </table>
      <ShowArtworkDialog
        isOpen={isShowArtworkOpen}
        setIsOpen={setIsShowArtworkOpen}
        artwork={currentArtwork}
      />
      <EditAuthorDialog
        isOpen={isEditAuthorOpen}
        setIsOpen={setIsEditAuthorOpen}
        author={currentArtwork?.author}
        title={'Edit author'}
        handleSubmit={handleSubmitAuthor}
        submitHandler={updateAuthorHandler}
        register={registerAuthor}
        errors={authorErrors}
      />
      <EditArtworkDialog
        isOpen={isEditArtworkOpen}
        setIsOpen={setIsEditArtworkOpen}
        artwork={currentArtwork}
        title={'Edit artwork'}
        handleSubmit={handleSubmitArtwork}
        submitHandler={updateArtworkHandler}
        register={registerArtwork}
        errors={artworkErrors}
      />
      <DeleteArworkDialog
        title="Delete artwork"
        submitHandler={deleteArtworkHandler}
        setIsOpen={setIsDeleteArtworkOpen}
        isOpen={isDeleteArtworkOpen}
      />
    </div>
  )
}
export default ArtworksList
