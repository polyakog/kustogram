import React from "react"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import { Button, ThemeButton } from "../../components/Button/Button"
import {
  StyledContainerAuth,
  StyledTextWrapper,
  StyledCenteredText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import { WrapperContainerNoFrame } from "components/Wrappers/Auth/WrapperContainerNoFrame"
import VectorImage from "components/VectorImage"
import styled from "styled-components"
import { useRouter } from 'next/router';
import overtime from "../../public/icons/web-app-ui-time-management-rafiki.svg";


const Verification = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log('Resend verification link')
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={"Email verification link expired"}>

        <StyledTextWrapper>
          <StyledCenteredText>Looks like the verification link 
            has expired. Not to worry, we can send the link again
          </StyledCenteredText>
        </StyledTextWrapper>
        <StyledContainerButton>
          <Button theme={ThemeButton.PRIMARY} width="auto" onClick={handleClick} type="button">
          Resend verification link
          </Button>
        </StyledContainerButton>

        <StyledImage>
          <VectorImage image={overtime} screenWidth={447} imageWidth={423} />
        </StyledImage>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

export const StyledContainerButton = styled.div
  `
  margin-top: 10px;   
  `
const StyledImage = styled.div
  `
  margin-top: 25px; 
  `

Verification.getLayout = getLayout

export default Verification
