import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fullScreen from "../../public/img/icons/expand-outline.svg";
import fullScreenOn from "../../public/img/icons/expand.svg";
import zoom from "../../public/img/icons/maximize-outline.svg";
import zoomOn from "../../public/img/icons/maximize.svg";
import addPhoto from "../../public/img/icons/image-outline.svg";
import addPhotoOn from "../../public/img/icons/image.svg";
import plusPhoto from "../../public/img/icons/plus-circle-outline.svg";
import resizePhoto from "../../public/img/icons/photo-resize.svg";
import resizePhotoOn from "../../public/img/icons/photo-resizeOn.svg";
import resize11 from "../../public/img/icons/resize11.svg";
import resize45 from "../../public/img/icons/resize45.svg";
import resize169 from "../../public/img/icons/resize169.svg";
import savePhoto from "../../public/img/icons/save-photos.svg";
import Image from "next/image";
import { baseTheme } from "../../styles/styledComponents/theme";
import {
  StyledCloseNextButton,
  StyledModalHeaderNext,
  StyledModalTitleNext
} from "../../common/components/Modals/Modal.styled";
import { Button } from "../../common/components/Button/Button";
import { ThemeButton } from "../../common/enums/themeButton";
import SmallPhoto from "./SmallPhoto";
import { PhotoType } from "./PostCreationModal";
import "cropperjs/dist/cropper.css";
import EasyCropper, { CropArgType } from "./EasyCropper";
import getCroppedImg, { getImageRatio } from "./cropImage";
import { Slider } from "./Slider";

const PostResizeModal = ({
  handleFullScreen,
  handleNextToFilterButton,
  setPhotoPost,
  photoPost,
  photoFile,
  handleAddPhotoButton
}: {
  handleFullScreen: (full: boolean) => void;
  handleNextToFilterButton: () => void;
  setPhotoPost: (photoPost: PhotoType[]) => void;
  photoPost: PhotoType[];
  photoFile: File;
  handleAddPhotoButton: () => void;
}) => {
  const [value, setValue] = useState(1); // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false); // открытие окна zoom
  const [openAddPhoto, setOpenAddPhoto] = useState(false); // открытие окна добавления новой фотографии
  const [full, setFullScreen] = useState(false); // переход в режим отображения на весь экран
  const [resize, setResize] = useState(false); // открытие окна изменения соотношения сторон изображения
  const [initialRatio, setInitialRatio] = useState(1); //первоначальное соотношение сторон кадра
  const [ratio, setRatio] = useState(1); //первоначальное соотношение сторон кадра
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null); // сохранение вырезанной области
  const [isObjectFit, setIsObjectFit] = useState(false);
  const [photoFileURL, setPhotoFileURL] = useState<string>();

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result;
      if (typeof url == "string") {
        setPhotoFileURL(url);
        imageRatio(url);
      }
    };
    reader.readAsDataURL(photoFile);
  }, []);

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider =
    (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setState(parseInt(e.target.value));
      }
    };

  // Сохранение отредактированного изображения
  const handleSave = async () => {
    try {
      if (croppedAreaPixels && photoFileURL) {
        const croppedImage = await getCroppedImg(photoFileURL, croppedAreaPixels);
        if (croppedImage) {
          setPhotoPost([
            ...photoPost,
            { photoUrl: croppedImage, filter: "", photoUrlWithFilter: croppedImage }
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const imageRatio = async (url: string) => {
    try {
      let ratio = await getImageRatio(url);
      setInitialRatio(ratio);
    } catch (e) {
      console.error(e);
    }
  };

  // Удаление изображения из массива
  const removePhotoFromList = (index: number) => {
    const newPhotoList = [];
    for (let i = 0; i < photoPost.length; i++) {
      if (index === i) {
        continue;
      } else {
        newPhotoList.push(photoPost[i]);
      }
    }
    setPhotoPost(newPhotoList);
  };

  // Обработчик нажатия кнопки Full Screen
  const handleClickFullScreen = () => {
    handleFullScreen(!full);
    setFullScreen(!full);
  };

  return (
    <>
      <StyledModalHeaderNext>
        <StyledCloseNextButton onClick={handleAddPhotoButton}>
          <Image priority src="/img/icons/arrow-ios-back.svg" height={24} width={24} alt="close" />
        </StyledCloseNextButton>
        <StyledModalTitleNext>{"Cropping"}</StyledModalTitleNext>
        <Button theme={ThemeButton.CLEAR} onClick={handleNextToFilterButton}>
          Next
        </Button>
      </StyledModalHeaderNext>
      <StyledPhotoEditor>
        <EasyCropper
          photoFileURL={photoFileURL}
          setCroppedAreaPixels={setCroppedAreaPixels}
          zoomTo={value}
          aspectRatio={ratio}
          isObjectFit={isObjectFit}
          setZoom={setValue}
          // onCropComplete={onCropComplete}
        />
      </StyledPhotoEditor>
      {openZoom && (
        <StyledSliderContainer>
          <label htmlFor="zoom"></label>
          <Slider
            min="1"
            max="5"
            id="zoom"
            onInput={handleSlider(setValue)}
            onChange={handleSlider(setValue)}
            value={value}
            type="range"
            style={{
              width: "45%",
              "--min": 1,
              "--max": 5,
              "--val": value
            }}
          />
        </StyledSliderContainer>
      )}
      {resize && (
        <StyledResizeBlock>
          <StyleItemSize
            onClick={() => {
              setRatio(initialRatio);
              setIsObjectFit(true);
              setValue(1);
            }}
          >
            <StyledIconSize src={addPhoto} alt={"original"} /> <span>original</span>
          </StyleItemSize>
          <StyleItemSize
            onClick={() => {
              setRatio(1 / 1);
              setIsObjectFit(false);
            }}
          >
            <StyledIconSize src={resize11} alt={"1:1"} />
            1:1
          </StyleItemSize>
          <StyleItemSize
            onClick={() => {
              setRatio(4 / 5);
              setIsObjectFit(false);
            }}
          >
            <StyledIconSize src={resize45} alt={"4:5"} />
            4:5
          </StyleItemSize>
          <StyleItemSize
            onClick={() => {
              setRatio(16 / 9);
              setIsObjectFit(false);
            }}
          >
            <StyledIconSize src={resize169} alt={"16:9"} />
            16:9
          </StyleItemSize>
        </StyledResizeBlock>
      )}
      {openAddPhoto && (
        <StyledAddBlock>
          <StyledPhotoPost id={"scrollable-container"}>
            {photoPost.map((photo, index) => (
              <SmallPhoto
                photo={photo.photoUrl}
                key={index}
                index={index}
                removePhotoFromList={removePhotoFromList}
              />
            ))}
          </StyledPhotoPost>
          <div onClick={handleAddPhotoButton}>
            <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen} />
          </div>
          <div onClick={handleSave}>
            <StyledIconSavePhoto src={savePhoto} alt={savePhoto} />
          </div>
        </StyledAddBlock>
      )}
      {/* <div onClick={handleClickFullScreen}>
        <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen}/>
      </div> */}
      <div
        onClick={() => {
          setResize(!resize);
          if (openZoom === true) setOpenZoom(!openZoom);
        }}
      >
        <StyledIconResize src={resize ? resizePhotoOn : resizePhoto} alt={fullScreen} />
      </div>
      <div
        onClick={() => {
          setOpenZoom(!openZoom);
          if (resize === true) setResize(!resize);
        }}
      >
        <StyledIconZoom src={!openZoom ? zoom : zoomOn} alt={zoom} />
      </div>
      <div
        onClick={() => {
          setOpenAddPhoto(!openAddPhoto);
        }}
      >
        <StyledIconAddPhoto
          src={!openAddPhoto ? addPhoto : addPhotoOn}
          alt={addPhoto}
          full={full}
        />
      </div>
    </>
  );
};

// Стили
export default PostResizeModal;

type SizePhotoType = {
  width: number;
  height: number;
};

type PhotoEditorPropsType = {
  full: boolean;
};
type IconAddPhotoType = {
  full?: boolean;
};

const StyledPhotoEditor = styled.div`
  position: absolute;
  width: 490px;
  height: 490px;
  top: 62px;
  display: flex;
  justify-content: center;

  @media (max-width: 390px) {
    width: 80vw;
    height: 80vw;
    max-width: 340px;
    max-height: 340px;
  }
`;

const StyledPhotoPost = styled.div`
  position: absolute;
  width: 152px;
  height: 106px;
  background: ${baseTheme.colors.dark["300"]};
  display: flex;
  overflow-x: scroll;
  z-index: 100;
`;

const StyledSliderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  position: absolute;
  bottom: 100px;
  left: 50px;
  width: 80%;

  & label {
  }
`;

const StyleItemSize = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${baseTheme.colors.light["900"]};

  & span {
    color: ${baseTheme.colors.light["100"]};
  }
`;

const StyledIconSize = styled(Image)`
  width: 26px;
  height: 26px;
  background: ${baseTheme.colors.dark["100"]};
`;

const StyledIconFullScreen = styled(Image)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  background: ${baseTheme.colors.dark["100"]};
`;

const StyledIconZoom = styled(StyledIconFullScreen)`
  left: 80px;
`;

const StyledIconAddPhoto = styled(StyledIconFullScreen)<IconAddPhotoType>`
  left: ${(props) => (props.full ? "95%" : "430px")};
`;
const StyledIconResize = styled(StyledIconZoom)`
  left: 140px;
`;

const StyledIconPlusPhoto = styled(Image)`
  position: absolute;
  width: 40px;
  background: none;
  margin: 5px 5px;
  right: 0;
`;

const StyledIconSavePhoto = styled(StyledIconPlusPhoto)`
  top: 43px;

  &:hover {
    fill: red;
  }
`;

const StyledAddBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 106px;
  background: ${baseTheme.colors.dark["300"]};
  bottom: 60px;
  right: 18px;
  z-index: 2;
  opacity: 0.7;
`;

const StyledResizeBlock = styled(StyledAddBlock)`
  position: absolute;
  padding: 5px;
  width: 100px;
  height: 140px;
  background: ${baseTheme.colors.dark["100"]};
  bottom: 60px;
  left: 80px;
  z-index: 2;
  opacity: 1;
`;
