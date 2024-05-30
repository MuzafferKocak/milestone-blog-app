import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { Form } from "formik";

export const registerScheme = object({
  email: string()
    .email("Lutfen valid bir email giriniz")
    .required("Email zorunludur"),
  password: string()
    .required("password zorunludur")
    .min(8, "password en az 8 karakter olmalidir")
    .max(30, "password en fazla 30 karakter olmalidir")
    .matches(/\d+/, "Password bir sayi içermelidir")
    .matches(/[a-z]/, "Password bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
  
    })
  
const RegisterForm = ({
  values,
  handleBlur,
  touched,
  errors,
  handleChange,
}) => {
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);

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
          required
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
          required
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
          id="lastName"
          type="text"
          variant="outlined"
          required
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
          required
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
          type="password"
          variant="outlined"
          required
          fullWidth
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        <TextField
          margin="normal"
          // required
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
          // required
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