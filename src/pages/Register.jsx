import * as React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
import { registerScheme } from "../components/auth/RegisterForm";
import AuthCard from "../components/auth/AuthCard";

const Register = () => {
  const { register } = useAuthCalls();

  return (
    <AuthCard title="Create your account" subtitle="It only takes a minute.">
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
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
    </AuthCard>
  );
};

export default Register;
