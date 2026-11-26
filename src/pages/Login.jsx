import * as React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
import { loginScheme } from "../components/auth/LoginForm";
import AuthCard from "../components/auth/AuthCard";

const Login = () => {
  const { login } = useAuthCalls();
  const handleSubmit = (values, actions) => {
    login(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to like, comment and write posts.">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginScheme}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {(props) => <LoginForm {...props} handleSubmit={handleSubmit} />}
      </Formik>
    </AuthCard>
  );
};

export default Login;
