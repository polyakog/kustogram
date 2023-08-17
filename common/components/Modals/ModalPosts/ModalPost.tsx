import Image from "next/image";
import React, { useState } from "react";
import {
  StyledCloseButton,
  StyledCloseNextButton,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalHeaderNext,
  StyledModalOverlay,
  StyledModalTitle,
  StyledModalTitleNext
} from "../Modal.styled";
import { ModalPostPropsType } from "../types";
import { Button } from "../../Button/Button";
import { ThemeButton } from "../../../enums/themeButton";

export const ModalPost = ({
  handleModalClose,
  handleCrossClick,
  handleModalNext,
  handleModalBack,
  title,
  nextTitle,
  bodyText,
  children,
  width,
  height
}: ModalPostPropsType) => {
  const [isHeader, setIsHeader] = useState<boolean>(!!title);
  const [isHeaderNext, setIsHeaderNext] = useState<boolean>(!!nextTitle);

  const handleClickModalClose = () => {
    handleModalClose();
  };
  return (
    <StyledModalOverlay>
      <StyledModalContainer width={width} height={height}>
        {isHeader && (
          <StyledModalHeader>
            <StyledModalTitle>{title}</StyledModalTitle>
            <StyledCloseButton onClick={handleClickModalClose}>
              <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close" />
            </StyledCloseButton>
          </StyledModalHeader>
        )}
        {isHeaderNext && (
          <StyledModalHeaderNext>
            <StyledCloseNextButton onClick={handleModalBack}>
              <Image
                priority
                src="/img/icons/arrow-ios-back.svg"
                height={24}
                width={24}
                alt="close"
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
  );
};
