import * as Yup from "yup";

export const validateRegistration = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required username")
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/,'invalid username'),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
  email: Yup.string().email("Invalid email").required("Required email"),
  passwordConfirmation: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "password mismatch"),
});
