import { ChangeEvent, FC, useState } from 'react'
import { FormFieldProps } from '@client/utilities/form.types'

import {
  DevFormField,
  DevFormLabel,
  DevFormLabelText,
  DevFormFieldWarning,
  CoverImage,
  StyledFileInput,
} from '../dev-form-styled'

import { ErrorSVG, InfoSVG, WarningSVG } from '@client/components/ui/svg'

const warning =
  'Image should be not less than 1024/400 and not more than 2048/800 px axis'

const MIN_WIDTH = 1024
const MAX_WIDTH = 4096

const MIN_HEIGHT = 400
const MAX_HEIGHT = 2048

const ImageUploadField: FC<FormFieldProps> = ({
  title,
  tag,
  register,
  errors,
}) => {
  tag = tag || title.toLowerCase()
  const [imageUrl, setImageUrl] = useState('')

  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const input = e?.target
    if (!input) return
    if (!input.files?.length) return

    const file = input.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = (e) => {
      if (e.target === null || e.target.result === null) {
        setError('Wrong image format')
        return false
      }
      const image = new Image()
      const csv: string | ArrayBuffer = e.target.result //Set the Base64 string return from FileReader as source.
      image.src = csv === 'string' ? csv : csv.toString()

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

  return (
    <DevFormField>
      <DevFormLabel htmlFor={tag}>
        <DevFormLabelText>{title}</DevFormLabelText>
      </DevFormLabel>
      <StyledFileInput
        {...register(tag)}
        type="file"
        accept="image/*"
        onChange={onInputChange}
      />
      <div className="h-2"></div>
      {errors[tag]?.message || error ? (
        <DevFormFieldWarning>
          <ErrorSVG />
          {error ? error : errors[tag]?.message?.toString()}
        </DevFormFieldWarning>
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
      {errors[tag]?.message && (
        <DevFormFieldWarning>
          <WarningSVG />
          <span>{errors[tag]?.message?.toString()}</span>
        </DevFormFieldWarning>
      )}
    </DevFormField>
  )
}
export default ImageUploadField
