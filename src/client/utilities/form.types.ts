import { FormEvent } from 'react'

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
} from 'react-hook-form'
export interface FormProps {
  title: string
  handleSubmit: UseFormHandleSubmit<FieldValues>
  submitHandler: SubmitHandler<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

export interface FormFieldProps {
  title: string
  tag?: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  value?: string | number
  onChange?: (data) => void
}

export interface RatingFormFieldProps {
  title: string
  tag?: string
  value?: string | number
  id: string
  onChange?: (id, value) => void
}

export interface SelectFormFieldProps extends FormFieldProps {
  items: any[]
  onChange?: (e: FormEvent) => void
}
export interface SubmitButtonProps {
  title: string
}

export interface TokenProps {
  email: string
  expires: number
  token: string
}

export interface FormTokenProps extends FormProps, TokenProps {}
