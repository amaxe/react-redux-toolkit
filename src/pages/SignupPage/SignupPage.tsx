import { SubmitHandler, useForm } from 'react-hook-form'
import validationSchema from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import s from './Signup.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { signup } from '../../features/auth/authSlice'

type FormInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const SignupPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema)
  })
  const onSubmit: SubmitHandler<FormInput> = data => {
    dispatch(signup(data)).then(() => {
      reset()
      navigate('/login')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h1 className={s.title}>Create new account</h1>
      <TextField
        {...register('name')}
        id="outlined-uncontrolled"
        label="Name"
        defaultValue=""
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
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
      <TextField
        {...register('confirmPassword')}
        id="outlined-uncontrolled"
        label="Confirm password"
        defaultValue=""
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" variant="contained" disabled={isSubmitting} className={s.button}>
        Sign Up
      </Button>
      <div className={s.link}>
        Have an account already? <Link to="/login">Log in</Link>
      </div>
    </form>
  )
}
