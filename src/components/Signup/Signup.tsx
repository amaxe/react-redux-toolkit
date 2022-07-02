import { SubmitHandler, useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import s from "./Signup.module.scss";
import { Link } from "react-router-dom";

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h1 className={s.title}>Create new account</h1>
      <TextField
        {...register("firstName")}
        id="outlined-uncontrolled"
        label="First name"
        defaultValue=""
        margin="normal"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        {...register("lastName")}
        id="outlined-uncontrolled"
        label="Last name"
        defaultValue=""
        margin="normal"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        {...register("email")}
        id="outlined-uncontrolled"
        label="Email"
        defaultValue=""
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password")}
        id="outlined-uncontrolled"
        label="Password"
        defaultValue=""
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register("confirmPassword")}
        id="outlined-uncontrolled"
        label="Confirm password"
        defaultValue=""
        margin="normal"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        className={s.button}
      >
        Sign Up
      </Button>
      <div className={s.link}>
        Have an account already? <Link to="/login">Log in</Link>
      </div>
    </form>
  );
};
