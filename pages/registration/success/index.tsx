import React from "react"
import { getLayout } from "../../../components/Layout/BaseLayout/BaseLayout"
import { Button, ThemeButton } from "../../../components/Button/Button"
import {
  StyledContainerAuth,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled"
import { WrapperContainerNoFrame } from "components/Wrappers/Auth/WrapperContainerNoFrame"
import VectorImage from "components/VectorImage"
import styled from "styled-components"
import { useRouter } from 'next/router';
import mail from "../../../public/icons/web-app-ui-sign-up-bro.svg";


const SuccessRegistration = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={"Congratulations!"}>

        <StyledSignInWrapper>
          <StyledText>Your email has been confirmed</StyledText>
        </StyledSignInWrapper>
        <StyledContainerButton>
          <Button theme={ThemeButton.PRIMARY} width="182px" onClick={handleClick} type="button">
            Sign in
          </Button>
        </StyledContainerButton>

        <StyledImage>
          <VectorImage image={mail} screenWidth={447} imageWidth={423} />
        </StyledImage>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

export const StyledContainerButton = styled.div
  `
  margin-top: 38px;   
  `
const StyledImage = styled.div
  `
  margin-top: 72px;
  display: flex;
  align-items: center;
  `

SuccessRegistration.getLayout = getLayout

export default SuccessRegistration
