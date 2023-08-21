import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";

const PostPhotoSelectModal = ({
  handleModalClose,
  avatar,
  setPhotoFile,
  handleNextToResize
}: {
  handleModalClose: () => void;
  avatar?: string;
  setPhotoFile: (photoFile: File) => void;
  handleNextToResize: () => void;
}) => {
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log(["file", file]);
      setPhotoFile(file);
      handleNextToResize();
    }
  };

  return (
    <>
      <StyledModalBody>
        <StyledModalHeader>
          <StyledModalTitle>{"Add Photo"}</StyledModalTitle>
          <StyledCloseButton onClick={handleModalClose}>
            <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close" />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalImageContainer>
          {avatar ? (
            <Image id="avatar" src={avatar} alt="Avatar" />
          ) : (
            <StyledModalImage
              priority
              src={"/img/icons/image-outline.svg"}
              height={48}
              width={48}
              alt="avatar"
            />
          )}
        </StyledModalImageContainer>
        <input id="file-upload" type="file" accept="image/*" onChange={handleSelectPhoto} />
        <StyledLabel htmlFor="file-upload">Select from Computer</StyledLabel>
      </StyledModalBody>
    </>
  );
};

export default PostPhotoSelectModal;

// styles

const StyledLabel = styled.label`
  margin: 0 auto;
  background: #397df6;
  width: 228px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 6px 0;
`;

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid ${baseTheme.colors.dark["100"]};
`;

const StyledModalTitle = styled.span`
  flex: 1;
  color: ${baseTheme.colors.light["100"]};
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
    cursor: pointer;
  }
`;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: auto;

  & #file-upload {
    display: none;
  }

  & #upload-btn {
    margin: 20px auto;

    @media (max-width: 390px) {
      width: 80vw;
      max-width: 222px;
    }
  }

  & label {
    cursor: pointer;
  }
`;

const StyledModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  background: ${baseTheme.colors.dark["500"]};
  color: ${baseTheme.colors.light["100"]};
  margin: 72px auto 40px;
  border-radius: 2px;
  width: 222px;
  height: 228px;

  & #avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 222px;
    height: 228px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media (max-width: 390px) {
    width: 80vw;
    max-width: 222px;
  }
`;

const StyledModalImage = styled(Image)`
  color: ${baseTheme.colors.light["100"]};

  margin: auto;
  border-radius: 2px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
