import * as Yup from "yup";

export const validateRecovery = Yup.object().shape({
  email: Yup.string().email("invalid_email").required("req_email")
});
