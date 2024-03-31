import { IRole, User } from '@/client/models/user.model'
import { FC, useEffect, useState } from 'react'
import UserItem from './user.item'
import UpdateRoleDialog from '../../components/dialog/update-role.dialog'
import { useUpdateRoleValidator } from '../../validator'
import BanUserDialog from '../../components/dialog/ban-user.dialog'
import {
  useAllUsers,
  useDeleteUser,
  useUpdateRole,
} from '@/client/services/user.service'

const UsersList: FC = () => {
  const { users: usersData, trigger: triggerUsers } = useAllUsers()
  const { message: updateRoleMessage, trigger: triggerUpdateRole } =
    useUpdateRole()

  const { message: deleteUserMessage, trigger: triggerDeleteUser } =
    useDeleteUser()

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (!isValid) {
      setIsValid(true)
      triggerUsers()
    }
  }, [isValid, triggerUsers])

  useEffect(() => {
    if (updateRoleMessage) {
      setIsValid(false)
    }
    if (deleteUserMessage) {
      setIsValid(false)
    }
  }, [updateRoleMessage, deleteUserMessage, setIsValid])

  const [users, setUsers] = useState<User[]>()
  const [currentRole, setCurrentRole] = useState<IRole>()
  const [currentUserId, setCurrentUserId] = useState('')
  const [isUpdateRoleOpen, setIsUpdateRoleOpen] = useState(false)
  const [isBanUserOpen, setIsBanUseOpen] = useState(false)

  useEffect(() => {
    setUsers(usersData)
  }, [usersData])

  const handleUpdateRole = (id: string, role: IRole) => {
    setCurrentRole(role)
    setCurrentUserId(id)
    setIsUpdateRoleOpen(true)
  }

  const handleBanUser = (id: string) => {
    setCurrentUserId(id)
    setIsBanUseOpen(true)
  }

  const { register, handleSubmit, errors } = useUpdateRoleValidator()

  const updateRoleHandler = (data) => {
    setIsUpdateRoleOpen(false)
    data['id'] = currentUserId
    triggerUpdateRole(data)
  }

  const banUserHandler = () => {
    setIsBanUseOpen(false)
    triggerDeleteUser({ id: currentUserId })
  }

  return (
    <div className="w-full flex justify-center overflow-x-auto py-4">
      <table className="table table-xs table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>email</th>
            <th>register date</th>
            <th>role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <UserItem
              key={i}
              index={i}
              user={user}
              handleUpdateRole={handleUpdateRole}
              handleBanUser={handleBanUser}
            />
          ))}
        </tbody>
      </table>
      <UpdateRoleDialog
        title="Update role"
        submitHandler={updateRoleHandler}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        setIsOpen={setIsUpdateRoleOpen}
        isOpen={isUpdateRoleOpen}
        initialRole={currentRole}
      />
      <BanUserDialog
        title="Ban user"
        submitHandler={banUserHandler}
        setIsOpen={setIsBanUseOpen}
        isOpen={isBanUserOpen}
      />
    </div>
  )
}
export default UsersList
