import * as Yup from "yup";

export const validateProfile = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required username")
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, "invalid username"),
  firstname: Yup.string().max(20, "Too Long!").required("Required firstname"),
  lastname: Yup.string().max(20, "Too Long!").required("Required lastname"),
  birthday: Yup.string().required("Required birthday"),
  city: Yup.string().max(20, "Too Long!").required("Required city"),
  aboutMe: Yup.string().max(200, "Too Long!")
});
