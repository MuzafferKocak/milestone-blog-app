import * as React from "react";
import Avatar from "@mui/material/Avatar";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginForm, { loginScheme } from "../components/auth/LoginForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
// import {  red, orange } from '@mui/material/colors';

const theme = createTheme();
// const theme = createTheme({
//     palette: {
//       primary: {
//         main: red[500],
//       }},
//       status: {
//         danger: orange[500],
//       }})

const Login = () => {
  const { login } = useAuthCalls();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "4rem",
          paddingTop: "1rem",
          marginBottom:"5rem"
        }}
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginScheme}
              onSubmit={(values, actions) => {
                login(values);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
              component={(props) => <LoginForm {...props} />}
            ></Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
