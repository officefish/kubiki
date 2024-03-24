import { FC, useState } from 'react'
import { RatingFormFieldProps } from '@client/utilities/form.types'
import StarItem from './rating.item'

import { DevFormField, DevFormLabel } from '../../dev-form-styled'

const starsScore = Array.from({ length: 10 }, (_, index) => index + 1)

const RatingFormField: FC<RatingFormFieldProps> = ({
  title,
  value,
  onChange,
  id,
}) => {
  const tag = title.toLowerCase()
  const [currentValue, setCurrentValue] = useState<number>(+value)

  const onStarClick = (starScore: number) => {
    setCurrentValue(starScore)
    onChange(id, starScore)
  }
  return (
    <DevFormField className="w-full text-center">
      <DevFormLabel
        htmlFor={tag}
        className="justify-center w-full text-lg uppercase text-primary dark:text-primary-dark font-semibold"
      >
        {title}
      </DevFormLabel>
      <div className="flex justify-center w-full">
        <>
          {starsScore?.map((i) => (
            <StarItem
              key={i}
              size={i % 2 ? '2x' : '3x'}
              value={currentValue}
              score={i}
              onClick={onStarClick}
            />
          ))}
        </>
      </div>
    </DevFormField>
  )
}
export default RatingFormField
