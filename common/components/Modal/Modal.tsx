import Image from "next/image";
import React from "react";
import {
  StyledBlockButton,
  StyledCloseButton,
  StyledModalBody,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalOverlay,
  StyledModalTitle
} from "./Modal.styled";
import {ModalPropsType} from "./types";

export const Modal = (
  {
    handleModalClose,
    handleCrossClick,
    title,
    bodyText,
    children,
    width,
    height,
  }: ModalPropsType) => {
  const onCloseButtonClick = () => {
    if (handleModalClose)
      handleModalClose();
    if (handleCrossClick) {
      handleCrossClick();
    }
  };

  return (
    <StyledModalOverlay>
      <StyledModalContainer width={width} height={height}>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledCloseButton onClick={onCloseButtonClick}>
            <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close"/>
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <p>{bodyText}</p>
          <StyledBlockButton>
            {children}
          </StyledBlockButton>
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};
