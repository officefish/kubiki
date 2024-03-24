import { FC } from 'react'
//import styles from '../Profile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

import {
  BasicInfoWrapper,
  BasicInfoFullname,
  BasicInfoLocation,
  BasicInfoCareer,
  BasicInfoEducation,
} from '../styled-profile'

import {
  IBasicInfo,
  IFullName,
  ILocation,
  ICareer,
} from '@client/models/profile.types'

interface BasicInfoProps {
  data?: IBasicInfo
}

const isComplete = (data?: IBasicInfo): boolean => {
  if (data === undefined || data === null) return false

  const isFullName = data.fullName.firstName !== undefined
  const isLocation = data.location.country !== undefined
  const isCareer = data.career.company !== undefined
  const isEducation = data.education.university !== undefined
  return isFullName && isLocation && isCareer && isEducation
}

const fullNameAsString = (fullName: IFullName) => {
  let fullNameStr = fullName.firstName as string
  fullNameStr += fullName.lastName ? ` ${fullName.lastName}.` : '.'
  return fullNameStr
}

const locationAsString = (location: ILocation) => {
  let locationStr = location.country as string
  locationStr += location.region ? `, ${location.region}.` : '.'
  return locationStr
}

const careerAsString = (career: ICareer) => {
  let careerStr = career.company as string
  careerStr += career.role ? `. ${career.role}.` : '.'
  return careerStr
}

const BasicInfo: FC<BasicInfoProps> = ({ data }) => {
  const [completeInfo, setCompleteInfo] = useState(false)
  useEffect(() => {
    setCompleteInfo(isComplete(data))
  }, [data])

  return (
    <>
      {completeInfo ? (
        <BasicInfoWrapper>
          <BasicInfoFullname>
            {data && fullNameAsString(data.fullName)}
          </BasicInfoFullname>
          <BasicInfoLocation>
            <FontAwesomeIcon
              className="text-base"
              icon={['fas', 'map-marker-alt']}
            />
            <span className="ml-2">
              {data && locationAsString(data.location)}
            </span>
          </BasicInfoLocation>
          <BasicInfoCareer>
            <FontAwesomeIcon
              className="text-gray-400"
              icon={['fas', 'briefcase']}
            />
            <span className="ml-2">{data && careerAsString(data.career)}</span>
          </BasicInfoCareer>
          <BasicInfoEducation>
            <FontAwesomeIcon
              className="text-gray-400"
              icon={['fas', 'university']}
            />
            <span className="ml-2">{data && data.education.university}</span>
            {data && data.education.university && (
              <span className="ml-2 block text-xs">
                {data.education.faculty}
              </span>
            )}
          </BasicInfoEducation>
        </BasicInfoWrapper>
      ) : (
        <div>Mini game here, if not :)</div>
      )}
    </>
  )
}
export default BasicInfo
