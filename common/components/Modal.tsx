import Image from "next/image";
import styled from "styled-components";
import React from "react";

export const Modal = ({
  handleModalClose,
  handleCrossClick,
  handleConfirmClick,
  handleConfirmSecondClick,
  title,
  bodyText,
  // buttonText = "OK",
  // buttonSecondText = 'NO',
  children,
  width,
  height
}: {
  handleModalClose: () => void;
  handleCrossClick?: () => void;
  handleConfirmClick?: () => void;
  handleConfirmSecondClick?: () => void;
  title: string;
  bodyText: string;
  // buttonText?: string;
  // buttonSecondText?: string;
  width?: string;
  height?: string;
  children?: React.ReactElement;
}) => {
  const onCloseButtonClick = () => {
    if (handleModalClose) handleModalClose();
    if (handleCrossClick) {
      handleCrossClick();
    }
  };
  const onConfirmButtonClick = () => {
    if (handleModalClose) handleModalClose();
    if (handleConfirmClick) {
      handleConfirmClick();
    }
  };

  const onConfirmButtonSecondClick = () => {
    if (handleModalClose) handleModalClose();
    if (handleConfirmSecondClick) {
      handleConfirmSecondClick();
    }
  };

  return (
    <StyledModalOverlay>
      <StyledModalContainer width={width} height={height}>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledCloseButton onClick={onCloseButtonClick}>
            <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close" />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <p>{bodyText}</p>
          <StyledBlockButton>
            {children}
            {/*<StyledConfirmButton width={'96px'}  theme={ThemeButton.OUTLINED} onClick={onConfirmButtonClick}>{buttonText}</StyledConfirmButton>*/}
            {/*<StyledConfirmButton  width={'96px'} theme={ThemeButton.PRIMARY} onClick={onConfirmButtonSecondClick}>{buttonSecondText}</StyledConfirmButton>*/}
          </StyledBlockButton>
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};

const StyledModalOverlay = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledModalContainer = styled.div<{ width?: string; height?: string }>`
  position: fixed;
  width: ${(props) => (props.width ? props.width : "380px")};
  height: ${(props) => (props.height ? props.height : "230px")};

  border-radius: 2px;
  border: 1px solid #4c4c4c;
  background: #333333;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid #4c4c4c;
`;

const StyledModalTitle = styled.span`
  flex: 1;
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`;

const StyledCloseButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    fill: #397df6;
  }
`;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  color: #fff;
  padding: 30px 24px;
`;

// const StyledConfirmButton = styled(Button)`
//margin-top: 18px;
//width: 96px;
//padding: 6px 24px;
//border-radius: 2px;
////background: #397df6;
//color: #fff;
//border: 0;
//align-self: flex-end;
// `;
const StyledBlockButton = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  gap: 20px;
`;
