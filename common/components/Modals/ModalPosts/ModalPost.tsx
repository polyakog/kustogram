import { useState } from 'react'

import Image from 'next/image'

import { ThemeButton } from '../../../enums/themeButton'
import { Button } from '../../Button/Button'
import {
  StyledCloseButton,
  StyledCloseNextButton,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalHeaderNext,
  StyledModalOverlay,
  StyledModalTitle,
  StyledModalTitleNext,
} from '../Modal.styled'
import { ModalPostPropsType } from '../types'

export const ModalPost = ({
  handleModalClose,
  handleModalNext,
  handleModalBack,
  title,
  nextTitle,
  children,
  width,
  height,
}: ModalPostPropsType) => {
  const [isHeader, setIsHeader] = useState<boolean>(!!title)
  const [isHeaderNext, setIsHeaderNext] = useState<boolean>(!!nextTitle)

  const handleClickModalClose = () => {
    handleModalClose()
  }

  return (
    <StyledModalOverlay>
      <StyledModalContainer height={height} width={width}>
        {isHeader && (
          <StyledModalHeader>
            <StyledModalTitle>{title}</StyledModalTitle>
            <StyledCloseButton onClick={handleClickModalClose}>
              <Image alt="close" height={24} src="/img/icons/close_white.svg" width={24} priority />
            </StyledCloseButton>
          </StyledModalHeader>
        )}
        {isHeaderNext && (
          <StyledModalHeaderNext>
            <StyledCloseNextButton onClick={handleModalBack}>
              <Image
                alt="close"
                height={24}
                src="/img/icons/arrow-ios-back.svg"
                width={24}
                priority
              />
            </StyledCloseNextButton>
            <StyledModalTitleNext>{nextTitle}</StyledModalTitleNext>

            <Button theme={ThemeButton.CLEAR} onClick={handleModalNext}>
              Next
            </Button>
          </StyledModalHeaderNext>
        )}

        {children}
      </StyledModalContainer>
    </StyledModalOverlay>
  )
}
