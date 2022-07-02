import * as yup from "yup";
import { REGEXP } from "../../config";

const validationSchema = yup
  .object({
    email: yup
      .string()
      .max(30, "Your password length exceeds maximum allowed, 20 characters")
      .matches(REGEXP.EMAIL, {
        message: "Incorrect format",
        excludeEmptyString: true,
      })
      .required("Required field"),
    password: yup
      .string()
      .min(3, "Your password must be at least 3 characters")
      .max(50, "Your password length exceeds maximum allowed, 50 characters")
      .required("Required field"),
  })
  .required();

export default validationSchema;
