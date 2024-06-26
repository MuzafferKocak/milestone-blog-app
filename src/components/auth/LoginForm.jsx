import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

export const loginScheme = object({
  username: string().required("Username is required."),
  password: string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d+/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain one of @$!%*?&")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must be at most 15 characters"),
});

const LoginForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form sx={{ color: "red" }}>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          id="username"
          type="Text"
          variant="outlined"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          id="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          loading={false}
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
