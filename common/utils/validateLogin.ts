import * as Yup from "yup";
import { useTranslation } from "next-i18next";

export const validateLogin = Yup.object().shape({
  loginOrEmail: Yup.string().min(4, "too_short").max(30, "too_long").required("req_login"),
  password: Yup.string().min(6, "short_pas").max(20, "long_pas").required("req_pas")
});
