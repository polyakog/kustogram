import * as Yup from "yup";

export const validateNewPasswordEn = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Too short password!")
    .max(20, "Too long password!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword")], "Please make sure your passwords match")
});

export const validateNewPasswordRu = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Пароль слишком короткий!")
    .max(20, "Пароль слишком длинный!")
    .required("Обязательное поле"),
  passwordConfirmation: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("newPassword")], "Указанные пароли не совпадают.")
});
