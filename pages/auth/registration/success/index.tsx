import React from "react"
import {Button, ThemeButton} from "../../../../common/components/Button/Button"
import {StyledSignInWrapper, StyledText} from "../../../../styles/styledComponents/auth/FormikAuth.styled"
import {WrapperContainerNoFrame} from "../../../../features/auth/WrapperContainerNoFrame"
import VectorImage from "../../../../common/components/VectorImage"
import {useRouter} from 'next/router';
import mail from "../../../../public/icons/web-app-ui-sign-up-bro.svg";
import {
  StyledContainerAuth,
  StyledContainerButton,
  StyledImage
} from "../../../../styles/styledComponents/auth/Auth.styled";
import {getLayout} from "../../../../common/components/Layout/BaseLayout/BaseLayout";


const SuccessRegistration = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login');
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={"Congratulations!"}>

        <StyledSignInWrapper>
          <StyledText>Your email has been confirmed</StyledText>
        </StyledSignInWrapper>
        <StyledContainerButton>
          <Button theme={ThemeButton.PRIMARY} width="182px" onClick={handleClick} type="button">
          Sing In
          </Button>
        </StyledContainerButton>

        <StyledImage>
          <VectorImage image={mail} screenWidth={447} imageWidth={423} />
        </StyledImage>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

SuccessRegistration.getLayout = getLayout

export default SuccessRegistration
