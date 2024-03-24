import { FC } from 'react'
import { FormFieldProps } from '@client/utilities/form.types'

const HiddenFormField: FC<FormFieldProps> = ({
  title,
  placeholder,
  register,
  errors,
  value,
}) => {
  const tag = title.toLowerCase()
  return (
    <div className="field">
      <input
        {...register(tag)}
        value={value}
        id={tag}
        type="hidden"
        placeholder={placeholder ? placeholder : `valid ${tag}`}
        className={`
        ${errors[tag] && 'invalid'}
        `}
      />
      {errors[tag]?.message && <p>{errors[tag]?.message?.toString()}</p>}
    </div>
  )
}

export default HiddenFormField
