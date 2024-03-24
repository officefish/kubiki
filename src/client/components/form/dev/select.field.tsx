import { FC, ChangeEvent, useState, useEffect } from 'react'
import { SelectFormFieldProps } from '@client/utilities/form.types'

import {
  DevFormField,
  DevFormFieldWarning,
  DevFormLabel,
  DevFormLabelText,
  //DevFormFieldWarning,
} from '../dev-form-styled'

import { WarningSVG } from '@client/components/ui/svg'

const SelectFormField: FC<SelectFormFieldProps> = ({
  title,
  //placeholder,
  register,
  errors,
  value,
  onChange,
  items,
}) => {
  const tag = title.toLowerCase()
  const [selectValue, setSelectValue] = useState<string | number>('')
  //useEffect(() => {
  //  setSelectValue(value)
  //}, [value])
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    //console.log(e.target.value)
    setSelectValue(e.target.value)
    onChange(e)
  }

  useEffect(() => {
    setSelectValue(value)
  }, [value])
  return (
    <DevFormField>
      <DevFormLabel htmlFor={tag}>
        <DevFormLabelText>{title}</DevFormLabelText>
      </DevFormLabel>
      <select
        {...register(tag)}
        value={selectValue || ''}
        onChange={handleChange}
        className="select select-bordered select-primary w-full max-w-xs"
      >
        {items.map((key, index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
      </select>
      {errors[tag]?.message && (
        <DevFormFieldWarning>
          <WarningSVG />
          <span>{errors[tag]?.message?.toString()}</span>
        </DevFormFieldWarning>
      )}
    </DevFormField>
  )
}
export default SelectFormField
