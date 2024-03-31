import { FC } from 'react'
import { RegionDropdown } from 'react-country-region-selector'

interface IRegionPicker {
  country?: string
  region?: string
  setRegion: any
}

const RegionPicker: FC<IRegionPicker> = ({ country, region, setRegion }) => {
  const onRegionChange = (value: string) => {
    setRegion(value)
  }

  return (
    <RegionDropdown
      classes="select w-full max-w-sm"
      value={region ? region : ''}
      country={country ? country : ''}
      onChange={onRegionChange}
    />
  )
}

export default RegionPicker
