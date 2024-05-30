import { object, string } from "yup";

export const registerScheme = object({
    email: string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "password en az 8 karakter olmalidir")
      .max(30, "password en fazla 30 karakter olmalidir")
      .matches(/\d+/, "Password bir sayi içermelidir")
      .matches(/[a-z]/, "Password bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
      .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    username: string().required("Username is required"),
    bio: string().required("Bio is required"),
      })