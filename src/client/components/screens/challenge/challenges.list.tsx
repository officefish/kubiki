import { FC, MouseEvent, useEffect, useState } from 'react'

import { useUserChallengesSWR } from '@/client/services/challenge.service'
import ChallengesListGrid from './component/grid/challenge'
import { useChallengeValidator } from './component/dialog/validator'
import NewChallengeDialog from './component/dialog/new-challenge'
import { useBackendAddressStore } from '@/client/providers'

const ChallengesList: FC = () => {
  //
  const { host, port } = useBackendAddressStore()
  const { challenges, trigger } = useUserChallengesSWR(host, port)

  const [isNewChallengeOpen, setIsNewChallengeOpen] = useState(false)
  const [isValidData, setIsValidData] = useState(false)

  const { register, handleSubmit, errors } = useChallengeValidator()

  const showNewChallengeModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsNewChallengeOpen(true)
  }

  const onSubmit = () => {
    //
  }

  useEffect(() => {
    if (!isValidData) {
      trigger()
      setIsValidData(true)
    }
    // if (data?.statusCode === 201) {
    //   setIsNewChallengeOpen(false)
    //   setIsValidData(false)
    // }
    // if (serverError) {
    //   setIsNewChallengeOpen(false)
    //   console.log(serverError)
    // }
  }, [isValidData, setIsValidData, trigger])

  return (
    <>
      <ChallengesListGrid
        onClick={showNewChallengeModal}
        challenges={challenges}
      ></ChallengesListGrid>
      <NewChallengeDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        title={'New Challenge'}
        isOpen={isNewChallengeOpen}
        setIsOpen={setIsNewChallengeOpen}
        submitHandler={onSubmit}
      />
    </>
  )
}
export default ChallengesList
