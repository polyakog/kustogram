import React, { useState } from "react";
import { Formik } from "formik";
import showPasswordBtn from "../../assets/svg/eye-outline.svg";
import hidePasswordBtn from "../../assets/svg/eye-off-outline.svg";
import googleIcon from "../../assets/svg//google-icon.svg";
import githubIcon from "../../assets/svg/github-icon.svg";
import { SignupSchema } from "utils/registrationValidation";
import {
  StyledBtn,
  StyledContainer,
  StyledErrorMsg,
  StyledField,
  StyledForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledSocialMediaIcon,
  StyledSocialMediaWrapper,
  StyledText,
  StyledTitle,
} from "styles/styles";


export default function Registration() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmationType, setPasswordConfirmationType] =
    useState("password");

  const showPasswordHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const showPasswordConfirmationHandler = () => {
    if (passwordConfirmationType === "text") {
      setPasswordConfirmationType("password");
    } else {
      setPasswordConfirmationType("text");
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledSocialMediaWrapper>
        <StyledSocialMediaIcon alt="google-icon" src={googleIcon} />
        <StyledSocialMediaIcon alt="github-icon" src={githubIcon} />
      </StyledSocialMediaWrapper>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          const data = {
            email: values.email,
            password: values.password,
            username: values.username,
          };

          try {
            await fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              body: JSON.stringify(data),
            }).then(() => console.log("otpravleno"));
            resetForm();
          } catch {
            console.log("err");
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <label>
              Username
              <StyledField
                name="username"
                // border={errors.username?.length ? "red" : "white"}
              />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password
              <StyledField name="password" type={passwordType} />
              <StyledShowPasswordBtn
                alt="show password"
                src={
                  passwordType === "password"
                    ? showPasswordBtn
                    : hidePasswordBtn
                }
                onClick={() => showPasswordHandler()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password confirmation
              <StyledShowPasswordBtn
                alt="show password"
                src={
                  passwordConfirmationType === "password"
                    ? showPasswordBtn
                    : hidePasswordBtn
                }
                onClick={() => showPasswordConfirmationHandler()}
              />
              <StyledField
                name="passwordConfirmation"
                type={passwordConfirmationType}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Email
              <StyledField name="email" type="email" />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </label>
            <StyledBtn type="submit">Sign Up</StyledBtn>
          </StyledForm>
        )}
      </Formik>
      <StyledSignInWrapper>
        <StyledText>Do you have an account?</StyledText>
        <StyledSignIn href="/login">Sign in</StyledSignIn>
      </StyledSignInWrapper>
    </StyledContainer>
  );
}
