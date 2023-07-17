import * as Yup from "yup";

export const validateRegistrationEn = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required Username")
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, "Invalid Username"),
  password: Yup.string()
    .min(6, "Too short password!")
    .max(20, "Too long password!")
    .required("Required password"),
  email: Yup.string().email("Invalid email").required("Required email"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Please make sure your passwords match")
});

export const validateRegistrationRu = Yup.object().shape({
  username: Yup.string()
    .min(6, "Слишком мало символов!")
    .max(30, "Слишком много символов!")
    .required("Обязательное поле")
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, "Имя пользователя указано неверно"),
  password: Yup.string()
    .min(6, "Пароль слишком короткий!")
    .max(20, "Пароль слишком длинный!")
    .required("Обязательное поле"),
  email: Yup.string().email("Email указан неверно").required("Обязательное поле"),
  passwordConfirmation: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password")], "Указанные пароли не совпадают.")
});
