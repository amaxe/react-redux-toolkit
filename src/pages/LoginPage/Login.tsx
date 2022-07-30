import { LoginForm } from '../../components/Login/LoginForm'
import { UserPage } from '../UserPage/UserPage'

export const Login = () => {
  const user = JSON.parse(localStorage.getItem('user') as string)

  return <>{user ? <UserPage /> : <LoginForm />}</>
}
