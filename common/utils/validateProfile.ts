import * as Yup from "yup";

export const validateProfile = Yup.object().shape({
  username: Yup.string().min(6, "Too Short!").max(30, "Too Long!").required("Required username"),
  firstname: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Required firstname"),
  lastname: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Required lastname"),
  birthday: Yup.string().required("Required birthday"),
  city: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Required city"),
  aboutMe: Yup.string().min(10, "to short").max(200, "to long")
});
