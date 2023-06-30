import styled from "styled-components";
import { baseTheme } from "../theme";
import Link from "next/link";
import Image from "next/image"
import { Form } from "formik";

export const StyledContainerAuth = styled.div
  `
    width: 96vw;
    min-height: 90vh;

    display: flex;
    justify-content: center;
    align-items: center;
  `

export const StyledAuthForm = styled(Form)
  `
    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${baseTheme.colors.light[900]};
    
    label {
      max-width: 330px;
      width: 100%;
      height: 100px;

      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      font-size: 16px;
      font-family: Arial;
    }

    #pass {
      position: relative;
    }

    @media (max-width: 390px) {
      width: 80vw;
    }
  `

export const StyledShowPasswordBtn = styled(Image)
  `
    position: absolute;
    top: 35px;
    right: 10px;
  `

export const StyledSignInWrapper = styled.div
  `
    margin: 20px 0;
    gap: 6px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

export const StyledText = styled.p
  `
    color: ${baseTheme.colors.light[100]};
    line-height: 24px;
    font-family: Arial;
    font-size: 16px;

  `

export const StyledSignIn = styled(Link)
  `
    text-decoration: none;
    color: ${baseTheme.colors.accent[500]};
    font-weight: 600;
    font-family: Arial;
    font-size: 16px;
    margin:10px;
  `
export const StyledCenteredText = styled(StyledText)
  `     
text-align: center;
font-style: normal;
font-weight: 400;
  `

export const StyledTextWrapper = styled(StyledSignInWrapper)
  `
  margin-top: 20px;
  max-width: 294px;
  width: 100%;
  
  flex-shrink: 0;
  `