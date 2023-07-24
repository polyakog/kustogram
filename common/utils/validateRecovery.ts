import * as Yup from "yup";

export const validateRecoveryEn = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required email"),

});

export const validateRecoveryRu = Yup.object().shape({
  email: Yup.string().email("Email указан неверно").required("Обязательное поле"),

});