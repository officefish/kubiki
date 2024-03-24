import { FC, SyntheticEvent } from 'react'
import { EAdminMode } from './types'
import { StyledMenuItem } from './admin.styled'

interface IMenuItem {
  mode: EAdminMode
  title: string
  handleClick: (mode: EAdminMode) => void
  active: boolean
}

const MenuItem: FC<IMenuItem> = (props) => {
  //
  const { mode, title, handleClick, active } = props
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleClick(mode)
  }

  return (
    <StyledMenuItem $active={active} className="my-1">
      <button onClick={onClick}>
        <span className="group">{title}</span>
      </button>
    </StyledMenuItem>
  )
}
export default MenuItem
