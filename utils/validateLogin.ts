import * as Yup from "yup";

export const validateLogin = Yup.object().shape({
  loginOrEmail: Yup.string()
    .min(4, "Too Short!")
    .max(30, "Too Long!")
    .required("Required login or Email"), /// сделать email или login
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
});
