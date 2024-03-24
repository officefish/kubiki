import { FC, useEffect, useState } from 'react'
import { FormFieldProps } from '@client/utilities/form.types'

import {
  DevFormField,
  DevFormLabel,
  DevFormLabelText,
  DevFormFieldWarning,
} from '../dev-form-styled'

import { WarningSVG } from '@client/components/ui/svg'

const AreaFormField: FC<FormFieldProps> = ({
  title,
  tag,
  value,
  placeholder,
  register,
  errors,
  onChange,
}) => {
  tag = tag || title.toLowerCase()
  const [fieldValue, setFieldValue] = useState(value || '')
  const handleChange = (e) => {
    setFieldValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  useEffect(() => {
    setFieldValue(value)
  }, [value])

  return (
    <DevFormField>
      <DevFormLabel htmlFor={tag}>
        <DevFormLabelText>{title}</DevFormLabelText>
      </DevFormLabel>
      <textarea
        {...register(tag)}
        id={tag}
        value={fieldValue}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : `valid ${tag}`}
        className={` textarea textarea-bordered
        textarea-primary
        placeholder-primary/70
        dark:placeholder-secondary-dark/70
            ${errors[tag] && 'invalid'}
            `}
      />
      {errors[tag]?.message && (
        <DevFormFieldWarning>
          <WarningSVG />
          <span>{errors[tag]?.message?.toString()}</span>
        </DevFormFieldWarning>
      )}
    </DevFormField>
  )
}
export default AreaFormField
