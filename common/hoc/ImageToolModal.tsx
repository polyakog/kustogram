import Image from "next/image";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";
import { FC, PropsWithChildren, useState } from "react";
import {
  StyledCloseNextButton,
  StyledModalHeaderNext,
  StyledModalTitleNext
} from "common/components/Modals/Modal.styled";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { PhotoType } from "features/posts/PostCreationModal";
import prev from "../../public/img/icons/prevOut.svg";
import next from "../../public/img/icons/nextOut.svg";

type Props = {
  handleModalClose?: () => void;
  photoPost: PhotoType[];
  handleBack: (photoPost: PhotoType[]) => void;
  title: string;
  setPhoto: (photo: PhotoType) => void;
  photo: PhotoType;
  nextStep: string;
  handleNextStepButton: () => void;
  addPOstHandler?: () => void;
  disabled?: boolean
};
export const ImageToolModal: FC<PropsWithChildren<Props>> = ({
  children,
  handleModalClose,
  photoPost,
  handleBack,
  title,
  photo,
  setPhoto,
  nextStep,
  handleNextStepButton,
  disabled = false,
  ...otherProps
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleNextPhoto = () => {
    const newIndex = photoIndex + 1;
    if (newIndex <= photoPost.length - 1) {
      setPhotoIndex(newIndex);
      setPhoto(photoPost[newIndex]);
    }
  };

  const handlePrevPhoto = () => {
    const newIndex = photoIndex - 1;
    if (newIndex >= 0) {
      setPhotoIndex(newIndex);
      setPhoto(photoPost[newIndex]);
    }
  };

  const handleBackButton = () => {
    handleBack(photoPost);
  };

  return (
    <StyledModalContainer>
      <StyledModalHeaderNext>
        <StyledCloseNextButton onClick={handleBackButton}>
          <Image priority src="/img/icons/arrow-ios-back.svg" height={24} width={24} alt="back" />
        </StyledCloseNextButton>
        <StyledModalTitleNext>{title}</StyledModalTitleNext>
        <Button theme={ThemeButton.CLEAR} onClick={handleNextStepButton} disabled={disabled}>
          {nextStep}
        </Button>
      </StyledModalHeaderNext>
      <StyledModalBody>
        <StyledImageContainer>
          <Prev alt="prev" src={prev} onClick={handlePrevPhoto} />
          <Image
            src={photo.photoUrl}
            width={0}
            height={0}
            alt="nolmal"
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: photo.filter }}
          />
          <Next alt="next" src={next} onClick={handleNextPhoto} />
        </StyledImageContainer>
        {children}
      </StyledModalBody>
    </StyledModalContainer>
  );
};

// styles

const Common = styled(Image)`
  cursor: pointer;
  position: absolute;
  top: 45%;
  z-index: 10;
`;

const Prev = styled(Common)`
  left: 5%;
`;

const Next = styled(Common)`
  right: 5%;
`;

const StyledModalContainer = styled.div`
  position: fixed;

  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark["100"]};
  background: ${baseTheme.colors.dark["300"]};
  top: 50%;
  left: 50%;
  width: 972px;
  height: 564px;
  transform: translate(-50%, -50%);

  @media (max-width: 1000px) {
    width: 90vw;
    max-width: 972px;
  }
`;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 503px;
`;

const StyledImageContainer = styled.div`
  flex-shrink: 2;
  z-index: 1;

  min-width: 300px;
  width: 490px;
  height: 100%;

  position: relative;
`;

const StyledFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 3;

  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  //overflow: scroll;
`;
