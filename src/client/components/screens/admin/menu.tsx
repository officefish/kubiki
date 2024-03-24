import { FC } from 'react'
//import { useBackendAddressStore } from '@/client/providers'

import { EAdminMode, IMenuItem } from './types'
import MenuItem from './menu.item'

interface IAdminMenu {
  items: IMenuItem[]
  handleSelect: (mode: EAdminMode) => void
  currentMode: EAdminMode
}

const Menu: FC<IAdminMenu> = (props) => {
  const { items, handleSelect, currentMode } = props

  return (
    <nav className="menu px-4 py-0 text-base-content dark:text-base-content-dark">
      <li className="bg-base-300 dark:bg-base-300-dark">
        <details open>
          <summary className="group">Database</summary>
          <ul>
            {items.map((item, i) => (
              <MenuItem
                title={item.title}
                mode={item.mode}
                handleClick={handleSelect}
                key={i}
                active={item.mode === currentMode}
              />
            ))}
          </ul>
        </details>
      </li>
    </nav>
  )
}
export default Menu
