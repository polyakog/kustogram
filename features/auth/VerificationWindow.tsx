import React from 'react'

import { Button } from 'common/components/Button/Button'
import VectorImage from 'common/components/VectorImage'
import { ThemeButton } from 'common/enums/themeButton'
import {
  StyledContainerAuth,
  StyledContainerButtonVer,
  StyledImageVer,
} from 'styles/styledComponents/auth/Auth.styled'
import {
  StyledTextWrapper,
  StyledCenteredText,
} from 'styles/styledComponents/auth/FormikAuth.styled'

import overtime from '../../public/img/icons/web-app-ui-time-management-rafiki.svg'

import { VerificationWindowType } from './types'
import { WrapperContainerNoFrame } from './WrapperContainerNoFrame'

const VerificationWindow = ({ handleClick, title, text, btnTitle }: VerificationWindowType) => {
  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={title}>
        <StyledTextWrapper>
          <StyledCenteredText>{text}</StyledCenteredText>
        </StyledTextWrapper>
        <StyledContainerButtonVer>
          <Button theme={ThemeButton.PRIMARY} type="button" width="auto" onClick={handleClick}>
            {btnTitle}
          </Button>
        </StyledContainerButtonVer>

        <StyledImageVer>
          <VectorImage image={overtime} imageWidth={423} screenWidth={447} />
        </StyledImageVer>
      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

export default VerificationWindow
