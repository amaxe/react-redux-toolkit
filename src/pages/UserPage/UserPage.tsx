import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { logout } from '../../features/auth/authSlice'

export const UserPage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)

  const clickHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h3>Name: {user?.name}</h3>
      <h3>Email: {user?.email}</h3>
      <div>
        <button onClick={clickHandler}>Logout</button>
      </div>
    </div>
  )
}
