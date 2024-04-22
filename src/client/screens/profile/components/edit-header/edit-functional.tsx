import { FC, MouseEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useBackendAddressStore, useUserProfileStore } from '@client/providers'

import { useUpdateProfile } from '@client/services/user-profile.service'

//import * as bcrypt from 'bcryptjs'

import { StyledFunctional } from '../../styled-profile'
import { IUserProfile } from '@/client/models/user.model'
import {
  IAvatar,
  //IBasicInfo,
  ICareer,
  IDomain,
  IEducation,
  IFullName,
  ILocation,
  IQuote,
  ICover,
  ITartan,
} from '@/client/models/profile.types'

interface UserProfileDataProps {
  fullName: IFullName
  education: IEducation
  career: ICareer
  location: ILocation
  quote: IQuote
  domain: IDomain
  avatar: IAvatar
  cover: ICover
  tartan: ITartan
}

const prepareUserProfileData = async (
  props: UserProfileDataProps,
): Promise<IUserProfile> => {
  const {
    fullName,
    education,
    career,
    location,
    quote,
    domain,
    avatar,
    cover,
    tartan,
  } = props
  const fullNameData: IFullName = {
    firstName:
      fullName.firstName && fullName.firstName.length
        ? fullName.firstName
        : undefined,
    lastName:
      fullName.lastName && fullName.lastName.length
        ? fullName.lastName
        : undefined,
  }

  const locationData: ILocation = {
    country:
      location.country && location.country.length
        ? location.country
        : undefined,
    region:
      location.region && location.region.length ? location.region : undefined,
    timeZone:
      location.timeZone && location.timeZone.length
        ? location.timeZone
        : undefined,
  }

  const careerData: ICareer = {
    company:
      career.company && career.company.length ? career.company : undefined,
    role: career.role && career.role.length ? career.role : undefined,
  }

  const educationData: IEducation = {
    university:
      education.university && education.university.length
        ? education.university
        : undefined,
    faculty:
      education.faculty && education.faculty.length
        ? education.faculty
        : undefined,
  }
  /* BasicInfo, Quote, Domain data preparation */
  const response = {
    basicInfo: {
      fullName: fullNameData,
      location: locationData,
      career: careerData,
      education: educationData,
    },
  }

  if (quote.content?.length >= 5 && quote.content?.length <= 120) {
    response['quote'] = quote
  }

  if (domain.value.length >= 4 && quote.content?.length <= 22) {
    response['domain'] = domain
  }

  /* Avatar */
  if (avatar.croppedImageUrl) {
    response['avatar'] = { imageUrl: avatar.croppedImageUrl }
  }
  /* Cover */
  response['cover'] = { imageUrl: cover.imageUrl }

  /* Tartan */
  if (tartan.colors) {
    const pattern = JSON.stringify(tartan.colors)
    //const hashed = await bcrypt.hash(pattern, await bcrypt.genSalt(6))
    response['tartan'] = {
      pattern,
    }
    /* save pattern to pattern context */
  }
  return response
}

const EditHeaderFunctional: FC = () => {
  const [invalidData, setInvalidData] = useState(false)
  const { host, port } = useBackendAddressStore()
  const {
    updateUserProfile,
    updateUserProfileResponse,
    updateUserProfileError,
  } = useUpdateProfile(host, port)

  const {
    isValidFullName,
    isValidCareer,
    isValidEducation,
    isValidLocation,
    isValidQuote,
    isValidDomain,
    isValidTartan,
    isValidAvatar,
    isValidCover,

    fullName,
    career,
    location,
    education,
    quote,
    domain,
    avatar,
    cover,
    tartan,
  } = useUserProfileStore()

  const router = useRouter()

  const onCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me')
  }

  const handleSaveChanges = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!invalidData) return

    prepareUserProfileData({
      fullName,
      location,
      career,
      education,
      quote,
      domain,
      avatar,
      cover,
      tartan,
    }).then((data) => {
      updateUserProfile(data)
    })
  }

  useEffect(() => {
    if (
      !isValidFullName ||
      !isValidCareer ||
      !isValidEducation ||
      !isValidLocation ||
      !isValidQuote ||
      !isValidDomain ||
      !isValidAvatar ||
      !isValidCover ||
      !isValidTartan
    )
      setInvalidData(true)
  }, [
    isValidFullName,
    isValidCareer,
    isValidEducation,
    isValidLocation,
    isValidQuote,
    isValidDomain,
    isValidTartan,
    isValidAvatar,
    isValidCover,
    invalidData,
  ])

  useEffect(() => {
    if (updateUserProfileResponse) {
      if (
        updateUserProfileResponse.status &&
        updateUserProfileResponse.status === 'ok'
      ) {
        router.push('/me')
      } else if (
        updateUserProfileResponse.statusCode &&
        updateUserProfileResponse.statusCode === 201
      ) {
        router.push('/me')
      }
    }
  }, [router, updateUserProfileResponse])

  useEffect(() => {
    if (updateUserProfileError) {
      console.log('some server error scenario here')
      console.log(updateUserProfileError)
    }
  }, [updateUserProfileError])

  return (
    <StyledFunctional>
      <button
        className="btn btn-accent btn-outline"
        disabled={!invalidData}
        onClick={handleSaveChanges}
      >
        Save changes
      </button>
      <button
        className="btn btn:ghost hover:btn-warning btn-outline text-base-content/50
        dark:text-base-content-dark/50"
        onClick={onCancelClick}
      >
        Cancel
      </button>
    </StyledFunctional>
  )
}
export default EditHeaderFunctional
