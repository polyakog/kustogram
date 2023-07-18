import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";
import PhotoEditorModal from "./PhotoEditorModal";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import closeIcon from "/public/img/icons/close_white.svg";

////  //  Модальное окно загрузки новой аватарки  //  ////

const PhotoSelectModal = ({
  handleModalClose,
  avatar
}: {
  handleModalClose: () => void;
  avatar?: string;
}) => {
  const [photo, setPhoto] = useState<File>(); // изображение, передаваемое в компоненту редактирования
  const [isEditorOpen, setIsEditorOpen] = useState(false); // открытие модального окна для редактирования

  const image = avatar || "/img/icons/image-outline.svg";

  // обработчик выбора новой аватарки из файловой системы компьютера
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setPhoto(file);
      setIsEditorOpen(true);
    }
  };

  // закрытие модальных окон для загрузки и обработки новой аватарки
  const handleEditorClose = () => {
    setIsEditorOpen(false);
    handleModalClose();
  };

  return (
    <StyledModalOverlay>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalTitle>Add a Profile Photo</StyledModalTitle>
          <StyledCloseButton onClick={handleModalClose}>
            <Image priority src={closeIcon} height={24} width={24} alt="close" />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          {isEditorOpen && photo ? (
            <PhotoEditorModal photo={photo} handleEditorClose={handleEditorClose} />
          ) : (
            <>
              <StyledModalImageContainer>
                {avatar ? (
                  <img id="avatar" src={avatar} alt="Avatar" />
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
              <Button theme={ThemeButton.PRIMARY} width="222px" id="upload-btn">
                <label htmlFor="file-upload">Select from Computer</label>
              </Button>
            </>
          )}
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};

export default PhotoSelectModal;

// styles

const StyledModalOverlay = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledModalContainer = styled.div`
  position: fixed;

  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark["100"]};
  background: ${baseTheme.colors.dark["300"]};
  top: 50%;
  left: 50%;
  width: 492px;
  height: 564px;
  transform: translate(-50%, -50%);

  @media (max-width: 500px) {
    width: 90vw;
    max-width: 492px;
  }
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
    height: 0px;
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
  width: props.width;
  height: props.height;
`;
