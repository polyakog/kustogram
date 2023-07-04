import React from "react"
import { getLayout } from "../../../../common/components/Layout/BaseLayout/BaseLayout"
import { Button, ThemeButton } from "../../../../common/components/Button/Button"
import {
  StyledTextWrapper,
  StyledCenteredText
} from "../../../../styles/styledComponents/auth/FormikAuth.styled"
import { WrapperContainerNoFrame } from "../../../../features/auth/WrapperContainerNoFrame"
import VectorImage from "../../../../common/components/VectorImage"
import styled from "styled-components"
import { useRouter } from 'next/router';
import overtime from "../../../../public/icons/web-app-ui-time-management-rafiki.svg";
import { StyledContainerAuth } from "styles/styledComponents/auth/Auth.styled"


const Verification = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/registration');
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={"Email verificationError link expired"}>

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
