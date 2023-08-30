import Image from 'next/image'

import {
  StyledBlockButton,
  StyledCloseButton,
  StyledModalBody,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalOverlay,
  StyledModalTitle,
} from '../Modal.styled'
import { ModalPropsType } from '../types'

const Modal = ({
  handleModalClose,
  handleCrossClick,
  title,
  bodyText,
  children,
  width,
  height,
  bg,
}: ModalPropsType) => {
  const onCloseButtonClick = () => {
    if (handleModalClose) {
      handleModalClose()
    }
    if (handleCrossClick) {
      handleCrossClick()
    }
  }

  return (
    <StyledModalOverlay bg={bg}>
      <StyledModalContainer height={height} width={width}>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledCloseButton onClick={onCloseButtonClick}>
            <Image
              priority
              alt="close"
              height={24}
              src="/img/icons/close_white.svg"
              style={{ cursor: 'pointer' }}
              width={24}
            />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <p>{bodyText}</p>
          <StyledBlockButton>{children}</StyledBlockButton>
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  )
}

export default Modal
