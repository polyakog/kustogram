import Image from 'next/image'

import {
  Bold,
  ModalContent,
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
  fz,
  width,
  height,
  bg,
  email,
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
              alt="close"
              height={24}
              src="/img/icons/close_white.svg"
              style={{ cursor: 'pointer' }}
              width={24}
              priority
            />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <ModalContent>{bodyText}</ModalContent>
          {email && <Bold>{email}</Bold>}
          <StyledBlockButton>{children}</StyledBlockButton>
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  )
}

export default Modal
