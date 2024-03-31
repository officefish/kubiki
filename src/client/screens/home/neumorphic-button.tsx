import { FC, useState } from 'react'

interface Props {
  path: string
  title: string
  currentCategory: string
  selectCategory: any
}

const Button: FC<Props> = ({
  path,
  title,
  currentCategory,
  selectCategory,
}) => {
  const [value] = useState(path)

  return (
    <button
      className={`
        btn
        neumorphic
        ml-4 
        enabled:text-gray-400 
        hover:enabled:text-blue-500
        disabled:bg-cyan-200 
        disabled:font-semibold`}
      onClick={(e) => selectCategory(e)}
      value={value}
      disabled={currentCategory === value}
    >
      {title}
    </button>
  )
}

export default Button
