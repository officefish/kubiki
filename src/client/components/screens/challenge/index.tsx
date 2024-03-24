import { IArtwork } from '@/client/models/challenge.types'
import {
  useChallengeDataSWR,
  useNewArtwork,
} from '@/client/services/challenge.service'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { StyledButtonWidget } from './challenge.styled'
import ArtworksList from './component/grid/artwork'
import NewArtworkDialog from './component/dialog/new-artwork'
import { useArtworkValidator } from './component/dialog/validator'
import { useBackendAddressStore } from '@/client/providers'

// import { useUpsetWidgetValidator } from './components/dialog/validator'

// import {
//   useDeleteWorkspace,
//   useNewWidget,
//   useUpdateWorkspace,
//   useWorkspaceDataSWR,
// } from '@/client/services/workspace.service'
// import { StyledButtonWidget } from './workspace.styled'
// import WidgetList from './components/grid/widget'
// import UpsetWidgetDialog from './components/dialog/upset-widget'
// import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'
// import WorkspaceHeader from './components/header'

export interface IChallengeProps {
  id: string
}

const Challenge: FC<IChallengeProps> = (props) => {
  const { id } = props
  const { host, port } = useBackendAddressStore()
  const { challengeData, trigger, error } = useChallengeDataSWR(id, host, port)
  const [isValid, setIsValid] = useState(false)
  const [artworks, setArkworks] = useState<IArtwork[]>()

  useEffect(() => {
    if (!isValid) {
      trigger()
      setIsValid(true)
    }
  }, [isValid, setIsValid, trigger])

  useEffect(() => {
    if (challengeData) {
      console.log(challengeData)
      setArkworks(challengeData.artworks)
    }
    if (error) {
      console.log(error)
    }
  }, [challengeData, error])

  const [isNewArtworkOpen, setIsNewArtworkOpen] = useState(false)

  const showNewArtworkModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewArtworkOpen(true)
  }

  const onArtworkRemove = () => {
    setIsValid(false)
  }

  const { register, handleSubmit, errors } = useArtworkValidator()
  const {
    trigger: triggerNewArtwork,
    serverError,
    data: newArtworkData,
  } = useNewArtwork()

  useEffect(() => {
    if (newArtworkData) {
      console.log(newArtworkData)
      setIsNewArtworkOpen(false)
      setIsValid(false)
    }
    if (serverError) {
      console.log(serverError)
    }
    if (errors) {
      console.log(errors)
    }
  }, [newArtworkData, serverError, errors])

  const onSubmitMiddleware = (data) => {
    // const payload = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   age: data.age,
    //   challengeId: id,
    //   file: data.file,
    // }
    const formData = new FormData()
    formData.append('file', data.files[0])
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('age', data.age)
    formData.append('challengeId', id)
    triggerNewArtwork(formData)
  }

  return (
    <>
      <div className="w-full">
        <ArtworksList onRemove={onArtworkRemove} artworks={artworks} />
        <div className="w-full h-28 flex items-center justify-center">
          <StyledButtonWidget onClick={showNewArtworkModal}>
            New Artwork
          </StyledButtonWidget>
        </div>
      </div>
      <NewArtworkDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'New Artwork'}
        isOpen={isNewArtworkOpen}
        setIsOpen={setIsNewArtworkOpen}
        submitHandler={onSubmitMiddleware}
      />
      {/* <h1 className="text-base-content dark:text-base-content-dark text-lg">
        {id}
      </h1> */}
    </>
  )
}
export default Challenge
