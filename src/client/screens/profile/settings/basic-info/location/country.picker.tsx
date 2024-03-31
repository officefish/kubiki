import { FC } from 'react'
import { CountryDropdown } from 'react-country-region-selector'

interface ICountryPicker {
  country?: string
  setCountry: any
}

const CountryPicker: FC<ICountryPicker> = ({ country, setCountry }) => {
  const onCountryChange = (value: string) => {
    setCountry(value)
  }

  return (
    <CountryDropdown
      classes="select w-full max-w-sm"
      value={country ? country : ''}
      onChange={onCountryChange}
    />
  )
}

export default CountryPicker
