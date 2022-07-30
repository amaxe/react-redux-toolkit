import * as yup from 'yup'
import { REGEXP } from '../../config'

const validationSchema = yup
  .object({
    name: yup
      .string()
      .max(20, 'Your name length exceeds maximum allowed, 20 characters')
      .matches(REGEXP.NAME, {
        message: 'Incorrect format',
        excludeEmptyString: false
      })
      .required('Required field'),
    email: yup
      .string()
      .max(30, 'Your email length exceeds maximum allowed, 30 characters')
      .matches(REGEXP.EMAIL, {
        message: 'Incorrect format',
        excludeEmptyString: true
      })
      .required('Required field'),
    password: yup
      .string()
      .min(3, 'Your password must be at least 3 characters')
      .max(50, 'Your password length exceeds maximum allowed, 50 characters')
      .required('Required field'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], "Password confirmation doesn't match password")
  })
  .required()

export default validationSchema
