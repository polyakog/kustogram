import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import showPasswordBtn from "../../assets/svg/eye-outline.svg";
import hidePasswordBtn from "../../assets/svg/eye-off-outline.svg";
import { baseTheme } from "assets/constants/theme";
import styled from "styled-components";
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';


const signupValidation = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(30, "Too Long!")
    .required("Required username"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required password"),
  email: Yup.string().email("Invalid email").required("Required email"),
  passwordConfirmation: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password")], "password mismatch"),
});

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
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",          
        }}
        validationSchema={signupValidation}
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
            console.error("SING UP ERROR");
           
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <label htmlFor="username">
              Username
              <StyledField id='username' name="username" />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </label>

            <label htmlFor="email">
              Email
              <StyledField id='email' name="email" type="email" />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </label>

            <label htmlFor="password">
              Password
              <StyledField id='password' name="password" type={passwordType} />
              <StyledShowPasswordBtn
                alt="show password"
                src={(passwordType === 'password' ? showPasswordBtn : hidePasswordBtn)}
                onClick={() => showPasswordHandler()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </label>

            <label htmlFor="passwordConfirmation">
              Password confirmation
              <StyledField id='passwordConfirmation'
                name="passwordConfirmation"
                type={passwordConfirmationType}
              />
              <StyledShowPasswordBtn
                alt="show password"
                src={(passwordConfirmationType === 'password' ? showPasswordBtn : hidePasswordBtn)}
                onClick={() => showPasswordConfirmationHandler()}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </label>
            
            <StyledBtn type="submit">Sign Up</StyledBtn>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
}

Registration.getLayout = getLayout

const StyledContainer = styled.div`
  background: ${baseTheme.colors.dark[300]};

  width: 378px;
  height: 624px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  flex-shrink: 0;  
`;

const StyledTitle = styled.h2`
  color: ${baseTheme.colors.light[100]};
  text-align: center;

  /* H1 */
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`;

const StyledForm = styled(Form)`
  

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  label {
    display: flex;
    flex-direction: column;
    
    // font-size: 16px;
    width: 330px;
    height: 80px;

    color: ${baseTheme.colors.light[900]};

    /* regular_text 14 */
    font-family: Inter;
    line-height: 24px;
    font-size: 14px;
  }
`;

const StyledField = styled(Field)`
  font-size: 14px;
  width: 100%;
  height: 36px;
  border: 1px solid ${baseTheme.colors.dark[100]};
`;

const StyledBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  height: 40px;
  width: 330px;

  color: ${baseTheme.colors.light["100"]};
  background: ${baseTheme.colors.accent[500]};
`;

const StyledShowPasswordBtn = styled(Image)``;

const StyledErrorMsg = styled.div`
  color: ${baseTheme.colors.danger[500]};
`;
