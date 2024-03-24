import { User, IRole, Role } from '@/client/models/user.model'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

interface IUserItemResponse {
  user: User
  index: number
  handleUpdateRole: (id: string, role: IRole) => void
  handleBanUser: (id: string) => void
}

const UserItem: FC<IUserItemResponse> = (props) => {
  const { user, index, handleUpdateRole, handleBanUser } = props

  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const userDate = new Date(user.createdAt)
    setDate(userDate)
  }, [user])

  const onRoleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleUpdateRole(user.id, user.role)
  }

  const onBanClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleBanUser(user.id)
  }

  return (
    <tr>
      <th>{index}</th>
      <th>{user.email}</th>
      <td>{date?.toDateString()}</td>
      <td
        className={`${user.role === Role.JUDGE || user.role === Role.ADMIN ? 'text-warning' : ''} `}
      >
        {user.role}
      </td>
      <td>
        <button
          onClick={onRoleClick}
          className="btn btn-ghost opacity-30 hover:opacity-100 hover:btn-accent btn-xs btn-outline"
        >
          Update role
        </button>
      </td>
      <td>
        <button
          onClick={onBanClick}
          className="btn btn-ghost opacity-30 hover:opacity-100 hover:btn-error btn-outline btn-xs"
        >
          Ban user
        </button>
      </td>
    </tr>
  )
}
export default UserItem
