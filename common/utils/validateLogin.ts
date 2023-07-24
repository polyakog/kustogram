import * as Yup from "yup";

export const validateLoginEn = Yup.object().shape({
  loginOrEmail: Yup.string()
    .min(4, "Too Short!")
    .max(30, "Too Long!")
    .required("Required loginOrEmail"), /// сделать email или login
  password: Yup.string()
    .min(6, "Too short password!")
    .max(20, "Too long password!")
    .required("Required password"),
});

export const validateLoginRu = Yup.object().shape({
  loginOrEmail: Yup.string()
    .min(4, "Слишком мало символов!")
    .max(30, "Слишком много символов!")
    .required("Обязательное поле"), /// сделать email или login
  password: Yup.string()
    .min(6, "Пароль слишком короткий!")
    .max(20, "Пароль слишком длинный!")
    .required("Обязательное поле"),
});
