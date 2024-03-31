import { FC, ChangeEvent, useRef, useState } from 'react'

import Image from 'next/image'

import useGlobalOverflowHidden from '@client/hooks/force-overflow'
import ImageCropper from '@client/components/tools/image-cropper'

import {
  StyledAvatarPickerContainer,
  StyledAvatarPickerInput,
  StyledAvatarPickerAvatar,
  StyledAvatarPickerImgWrapper,
  StyledAvatarPickerDialog,
  StyledAvatarPickerForm,
  StyledAvatarCropperContainer,
  StyledAvatarCropperCloseBtn,
} from '../../../styled-profile'

interface IAvatarPicker {
  imageUrl: string
  setImageUrl: (value: string) => void
  croppedImageUrl: string | null
  setCroppedImageUrl: (value: string) => void
}

export const AvatarPicker: FC<IAvatarPicker> = ({
  imageUrl,
  croppedImageUrl,
  setImageUrl,
  setCroppedImageUrl,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()

  const [preview, setPreview] = useState<string>()

  const onCropComplete = (value: string) => {
    setCroppedImageUrl(value)

    if (modalRef && modalRef.current) {
      const modal = modalRef.current
      modal.close()
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const input = e?.target
    if (input && input.files?.length) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (modalRef && modalRef.current) {
          setIsOverflowHidden(true)

          const modal = modalRef.current
          modal.showModal()
          setPreview(reader.result?.toString())

          const newUrl = reader.result ? reader.result.toString() : imageUrl
          setImageUrl(newUrl)
        }
      }
    }
  }

  const onDialogClose = () => setIsOverflowHidden(false)

  return (
    <>
      <StyledAvatarPickerContainer>
        <StyledAvatarPickerInput
          type="file"
          accept="image/*"
          onChange={onInputChange}
        />
        <StyledAvatarPickerAvatar>
          <StyledAvatarPickerImgWrapper>
            <Image
              alt="avatar"
              src={croppedImageUrl ? croppedImageUrl : imageUrl}
              width={80}
              height={80}
            />
          </StyledAvatarPickerImgWrapper>
        </StyledAvatarPickerAvatar>
      </StyledAvatarPickerContainer>
      <StyledAvatarPickerDialog ref={modalRef} onClose={onDialogClose}>
        <StyledAvatarPickerForm method="dialog">
          <StyledAvatarCropperContainer>
            <StyledAvatarCropperCloseBtn>✕</StyledAvatarCropperCloseBtn>
            <ImageCropper
              image={preview ? preview : ''}
              aspect={3 / 3}
              onCrop={onCropComplete}
            />
          </StyledAvatarCropperContainer>
        </StyledAvatarPickerForm>
      </StyledAvatarPickerDialog>
    </>
  )
}

export default AvatarPicker
