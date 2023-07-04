import {FormikField} from "./FormikField";
import React from "react";
import styled from "styled-components";
import {baseTheme} from "../../styles/styledComponents/theme";
import {labelType} from "./types";


export const FormikLabel = ({title, name, border, id, errors, touched, type, value, onChange,children, width, errorShow}: labelType) => {

  let errorMessage = '';

  if (name === 'username') errors.username && touched.username ? errorMessage = errors.username : ''
  if (name === 'email') errors.email && touched.email ? errorMessage = errors.email : ''
  if (name === 'password') errors.password && touched.password ? errorMessage = errors.password : ''
  if (name === 'passwordConfirmation') errors.passwordConfirmation && touched.passwordConfirmation ? errorMessage = errors.passwordConfirmation : ''
  if (name === 'loginOrEmail') errors.loginOrEmail && touched.loginOrEmail ? errorMessage = errors.loginOrEmail : ''
  if (name === 'newPassword') errors.newPassword && touched.newPassword ? errorMessage = errors.newPassword : ''
  if (name === 'aboutMe') errors.aboutMe && touched.aboutMe ? errorMessage = errors.aboutMe : ''
  if (name === 'recoveryCode') errors.recoveryCode && touched.recoveryCode ? errorMessage = errors.recoveryCode : ''
  if (name === 'firstname') errors.firstname && touched.firstname ? errorMessage = errors.firstname : ''
  if (name === 'lastname') errors.lastname && touched.lastname ? errorMessage = errors.lastname : ''
  if (name === 'birthday') errors.birthday && touched.birthday ? errorMessage = errors.birthday : ''
  if (name === 'city') errors.city && touched.city ? errorMessage = errors.city : ''


  return (
    <label  id={id}>
      <StyledTitle><span>{title}</span></StyledTitle>
      <FormikField
        name={name}
        border={border}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        width={width}
      />
      <StyledErrorMsg errorShow={errorShow}>{errorMessage}</StyledErrorMsg>
      {children}
    </label>
  )
}

type StyledErrorMsgPropsType={
  errorShow?:boolean
}


const StyledErrorMsg = styled.div<StyledErrorMsgPropsType>
  `
    width: 100%;
    height: ${props=>props.errorShow?'':'30px'};

    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    color: ${baseTheme.colors.danger["500"]};
  `

const StyledTitle = styled(StyledErrorMsg)
  `
    color: ${baseTheme.colors.light["950"]};

    & span::first-letter {
      text-transform: uppercase;
    }
  `
