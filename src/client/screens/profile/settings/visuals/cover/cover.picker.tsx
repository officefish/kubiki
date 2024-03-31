import { FC, ChangeEvent, useState } from 'react'

//import Image from "next/image"

import { ErrorSVG, InfoSVG } from '@client/components/ui/svg'

import { StyledAvatarPickerInput, CoverImage } from '../../../styled-profile'

interface ICoverPicker {
  imageUrl: string
  setImageUrl: (value: string) => void
}

const warning =
  'Cower should be not less than 1024/400 and not more than 2048/800 px axis'

const MIN_WIDTH = 1024
const MAX_WIDTH = 4096

const MIN_HEIGHT = 400
const MAX_HEIGHT = 2048

export const CoverPicker: FC<ICoverPicker> = ({ imageUrl, setImageUrl }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const input = e?.target
    if (input && input.files?.length) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        if (e.target === null || e.target.result === null) {
          setError('Wrong image format')
          return false
        }
        //Initiate the JavaScript Image object.
        const image = new Image()
        const csv: string | ArrayBuffer = e.target.result
        //Set the Base64 string return from FileReader as source.
        image.src = csv === 'string' ? csv : csv.toString()
        //Validate the File Height and Width.
        image.onload = function () {
          const height = image.height
          const width = image.width

          switch (true) {
            case height < MIN_HEIGHT: {
              setSuccess(false)
              setError('Image Height is too small.')
              return false
            }
            case width < MIN_WIDTH: {
              setSuccess(false)
              setError('Image Width is too small.')
              return false
            }
            case height > MAX_HEIGHT: {
              setSuccess(false)
              setError('Image height is too large.')
              return false
            }
            case width > MAX_WIDTH: {
              setSuccess(false)
              setError('Image width is too large.')
              return false
            }
            default: {
              setError(undefined)
              setSuccess(true)
              setImageUrl(image.src)
              return true
            }
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <StyledAvatarPickerInput
        type="file"
        accept="image/*"
        onChange={onInputChange}
      />

      {error ? (
        <div className="alert alert-error text-xs">
          <ErrorSVG />
          {error}
        </div>
      ) : !success ? (
        <div className="alert alert-info text-xs">
          <InfoSVG />
          {warning}
        </div>
      ) : (
        <div className="relative w-full h-[64px]">
          <CoverImage $background={imageUrl} />
        </div>
      )}
    </div>
  )
}

export default CoverPicker
