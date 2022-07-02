import { SubmitHandler, useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import s from "./Login.module.scss";
import { Link } from "react-router-dom";

type FormInput = {
  email: string;
  password: string;
};

export const Login = () => {
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
      <h1 className={s.title}>Log In</h1>
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
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        className={s.button}
      >
        Log In
      </Button>
      <div className={s.link}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
};
