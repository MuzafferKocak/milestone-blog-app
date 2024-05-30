import { object, string } from "yup";

export const loginScheme = object({
    username: string().required("Username is required."),
    password: string()
      .required("Password is required.")
      .min(8, "password en az 8 karakter olmalidir")
      .max(20, "password en fazla 20 karakter olmalidir")
      .matches(/\d+/, "Password bir sayi içermelidir")
      .matches(/[a-z]/, "Password bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
      .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
  });