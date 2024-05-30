import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterForm, { registerScheme } from "../components/auth/RegisterForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";

const theme = createTheme();

const Register = () => {
  const { register } = useAuthCalls();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          marginBottom:"30rem",
          paddingTop: "1rem",
        }}
      >
        
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: '5rem',
          }}
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Formik
              initialValues={{
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                image: "",
                bio: "",
                
              }}
              validationSchema={registerScheme}
              onSubmit={(values, actions) => {
                register(values);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
              component={(props) => <RegisterForm {...props} />}
            ></Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
