import * as Yup from "yup";

export const validateLogin = Yup.object().shape({
  login: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required username"), /// сделать email или login
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
  // email: Yup.string().email("Invalid email")
  //   .required("Required email"),             /// сделать email или login

});
