import { FC, useMemo, useState, ChangeEvent } from 'react'
import {
  allTimezones,
  useTimezoneSelect,
  Props,
  ITimezoneOption,
  ITimezone,
} from 'react-timezone-select'

interface ITimeZonePicker {
  setTimeZone: (timeZone: string) => void
  timeZone: string | ITimezone
}

const TimeZonePicker: FC<ITimeZonePicker> = ({ timeZone, setTimeZone }) => {
  const displayOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'medium',
    hour12: false,
    timeZone: typeof timeZone === 'string' ? timeZone : timeZone?.value,
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datetime, setDatetime] = useState(
    new Intl.DateTimeFormat('en-US', displayOptions).format(new Date()),
  )

  useMemo(() => {
    setDatetime(
      new Intl.DateTimeFormat('en-US', displayOptions).format(new Date()),
    )
  }, [timeZone])

  const onOptionChange = (option: ITimezoneOption) => {
    setTimeZone(option.value)
  }

  return (
    <TimezoneSelect
      value={timeZone}
      onChange={onOptionChange}
      timezones={{
        ...allTimezones,
        'America/Lima': 'Pittsburgh',
        'Europe/Berlin': 'Frankfurt',
      }}
    />
  )
}

export default TimeZonePicker

const TimezoneSelect: FC<Props> = ({
  //value,
  //onBlur,
  onChange,
  labelStyle,
  displayValue,
  //maxAbbrLength,
  timezones,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, parseTimezone } = useTimezoneSelect({
    timezones,
    labelStyle,
    displayValue,
    //maxAbbrLength,
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const index = +e.target.value
    const tz = options[index]
    onChange && onChange(tz)
  }

  return (
    <select className="select w-full max-w-sm" onChange={handleChange}>
      {options.map((item: ITimezoneOption, index) => {
        return (
          <option key={index} value={index}>
            {item.label}
          </option>
        )
      })}
    </select>
  )

  // return createElement('select', {value: parseTimezone(value), options, onBlur,
  //     className: 'select w-full min-w-md',
  //     //@ts-ignore
  //     onChange: handleChange,
  // })
}
