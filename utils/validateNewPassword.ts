import * as Yup from "yup";

export const validateNewPassword = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
  passwordConfirmation: Yup.string()
    .required("required")
    .oneOf([Yup.ref("newPassword")], "Please make sure your passwords match"),
});