import { SubmitHandler, useForm } from 'react-hook-form'
import validationSchema from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import s from '../../pages/LoginPage/Login.module.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { login } from '../../features/auth/authSlice'

type FormInput = {
  email: string
  password: string
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector(state => state.auth.error)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema)
  })
  const onSubmit: SubmitHandler<FormInput> = data => {
    // @ts-ignore
    dispatch(login(data))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h1 className={s.title}>Log In</h1>
      <TextField
        {...register('email')}
        id="outlined-uncontrolled"
        label="Email"
        defaultValue=""
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        id="outlined-uncontrolled"
        label="Password"
        defaultValue=""
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <div className={s.error}>{errorMessage}</div>
      <Button type="submit" variant="contained" disabled={isSubmitting} className={s.button}>
        Log In
      </Button>
      <div className={s.link}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  )
}
