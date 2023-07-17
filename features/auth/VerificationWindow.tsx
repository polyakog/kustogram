import React from "react";
import { Button } from "common/components/Button/Button";
import {
  StyledTextWrapper,
  StyledCenteredText
} from "styles/styledComponents/auth/FormikAuth.styled";
import { WrapperContainerNoFrame } from "features/auth/WrapperContainerNoFrame";
import VectorImage from "common/components/VectorImage";
import overtime from "../../public/img/icons/web-app-ui-time-management-rafiki.svg";
import {
  StyledContainerAuth,
  StyledContainerButtonVer,
  StyledImageVer
} from "styles/styledComponents/auth/Auth.styled";
import { VerificationWindowType } from "./types";
import { ThemeButton } from "common/enums/themeButton";

const VerificationWindow = ({ handleClick, title, text, btnTitle }: VerificationWindowType) => {
  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={title}>
        <StyledTextWrapper>
          <StyledCenteredText>{text}</StyledCenteredText>
        </StyledTextWrapper>
        <StyledContainerButtonVer>
          <Button theme={ThemeButton.PRIMARY} width="auto" onClick={handleClick} type="button">
            {btnTitle}
          </Button>
        </StyledContainerButtonVer>

        <StyledImageVer>
          <VectorImage image={overtime} screenWidth={447} imageWidth={423} />
        </StyledImageVer>
      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  );
};

export default VerificationWindow;
