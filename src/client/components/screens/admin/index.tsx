import { FC, useState } from 'react'
import Menu from './menu'
import { EAdminMode, IMenuItem } from './types'
import UsersList from './database/user/users.list'
import ArtworksList from './database/artwork/artworks.list'
//import { useBackendAddressStore } from '@/client/providers'

const items = [
  { mode: EAdminMode.USERS, title: 'users' },
  { mode: EAdminMode.ARTWORKS, title: 'artworks' },
] satisfies IMenuItem[]

const AdminPanel: FC = () => {
  //
  const [mode, setMode] = useState<EAdminMode>(EAdminMode.USERS)

  const handleSelect = (mode: EAdminMode) => {
    console.log(mode)
    setMode(mode)
  }

  return (
    <div className="sm:grid sm:grid-cols-5 sm:gap-4">
      <div className="bg-base-200 dark:bg-base-200-dark h-screen-no-header">
        <Menu items={items} handleSelect={handleSelect} currentMode={mode} />
      </div>
      <div className="col-span-4 text-base-content dark:text-base-content-dark">
        {renderAdminMode(mode)}
      </div>
    </div>
  )
}
export default AdminPanel

const renderAdminMode = (mode: EAdminMode) => {
  switch (mode) {
    case EAdminMode.USERS:
      return <UsersList />
    case EAdminMode.ARTWORKS:
      return <ArtworksList />
    default:
      return <></>
  }
}
