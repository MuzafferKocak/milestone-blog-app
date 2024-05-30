import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { Form } from "formik";
import { LoadingButton } from "@mui/lab";

export const loginScheme = object({
  username: string().required("username zorunludur"),
  password: string()
    .required("password zorunludur")
    .min(8, "password en az 8 karakter olmalidir")
    .max(20, "password en fazla 20 karakter olmalidir")
    .matches(/\d+/, "Password bir sayi içermelidir")
    .matches(/[a-z]/, "Password bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
});
const LoginForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  return (
    <Form sx={{ color: "red" }}>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <LoadingButton
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          fullWidth
          // loading={false}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            Don't have an account?
            <Link to="/register">Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};

export default LoginForm;
