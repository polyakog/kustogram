import React from 'react';
import styled from "styled-components";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {Formik} from "formik";
import {validateLogin} from "../../utils/validateLogin";
import {LoginType} from "@/types/FormikTypes";
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";


const Login = () => {

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Sing In'}>
        <AuthIcons/>
        <Formik
          initialValues={{loginOrEmail: '', password: ''} as LoginType}
          validationSchema={validateLogin}
          onSubmit={values => alert('submit')}
        >
          {formik => <LoginForm formik={formik}/>}
        </Formik>
        <div>
          <Button theme={ThemeButton.PRIMARY} type={'submit'}>Log In</Button>
        </div>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  );
};

Login.getLayout = getLayout
export default Login;


export const StyledContainerAuth = styled.div
  `
    width: 96vw;
    min-height: 90vh;

    display: flex;
    justify-content: center;
    align-items: center;

  `




