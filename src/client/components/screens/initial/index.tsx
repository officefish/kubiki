import {
  useClearLastChallenge,
  useUploadInitial,
} from '@/client/services/initial.service'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

const Initial: FC = () => {
  const { data: clearData, trigger: triggerClear } = useClearLastChallenge()
  const { artworks, trigger: triggerUpload } = useUploadInitial()

  useEffect(() => {
    if (clearData) {
      console.log(clearData)
    }
  }, [clearData])

  useEffect(() => {
    if (artworks) {
      console.log(artworks)
    }
  }, [artworks])

  const handleClear = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('handle clear')
    triggerClear()
  }

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)

  const handleInitial = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handle submit')
    triggerUpload({ skip, take })
  }

  const handleSkipChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSkip(+e.currentTarget.value)
  }

  const handleTakeChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTake(+e.currentTarget.value)
  }

  return (
    <div className="w-full h-screen-no-header flex flex-col gap-8 items-center justify-center">
      <button onClick={handleClear} className="btn btn-primary">
        Clear
      </button>
      <form
        onSubmit={handleInitial}
        className="w-[40%] flex flex-col justify-center gap-4 card"
      >
        <label>Skip: </label>
        <input type="number" min="0" value={skip} onChange={handleSkipChange} />
        <label>Take: </label>
        <input
          type="number"
          min="0"
          max="25"
          value={take}
          onChange={handleTakeChange}
        />
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  )
}
export default Initial
