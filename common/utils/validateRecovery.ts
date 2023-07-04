import * as Yup from "yup";

export const validateRecovery = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required email"),

});
