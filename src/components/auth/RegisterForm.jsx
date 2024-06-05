import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import { useSelector } from "react-redux";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { Form } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const registerScheme = object({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 15 characters")
    .matches(/\d+/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[@$!%*?&]/, "Password must contain one of @$!%*?&"),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  username: string().required("Username is required"),
  bio: string(),
});

const RegisterForm = ({
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
}) => {
  // const { loading } = useSelector((state) => state.auth);
  // console.log(loading);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          label="User Name"
          name="username"
          id="userName"
          type="text"
          variant="outlined"
          fullWidth
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          margin="normal"
          label="First Name"
          name="firstName"
          id="firstName"
          type="text"
          variant="outlined"
          fullWidth
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          margin="normal"
          label="Last Name"
          name="lastName"
          id="last_name"
          type="text"
          variant="outlined"
          fullWidth
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          margin="normal"
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          margin="normal"
          label="password"
          name="password"
          id="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
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

        <TextField
          margin="normal"
          fullWidth
          id="image"
          label="Image"
          name="image"
          type="url"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.image && errors.image}
          error={touched.image && Boolean(errors.image)}
        />
        <TextField
          margin="normal"
          fullWidth
          name="bio"
          label="Bio"
          type="text"
          id="bio"
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.bio && errors.bio}
          error={touched.bio && Boolean(errors.bio)}
        />
        <Button
          type="submit"
          loading={false}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            Do you already have an account?
            <Link to="/login">Sign In</Link>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};

export default RegisterForm;
