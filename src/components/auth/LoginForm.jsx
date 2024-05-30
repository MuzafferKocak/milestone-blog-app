import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "formik";
import { LoadingButton } from "@mui/lab";


const LoginForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  const { loading } = useSelector((state) => state.auth);
  console.log(errors);
  return (
    <Form sx={{ color: "red" }}>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          id="username"
          type="username"
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
