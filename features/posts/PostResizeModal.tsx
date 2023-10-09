/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'

import { Button } from 'common/components/Button/Button'
import {
  StyledCloseNextButton,
  StyledModalHeaderNext,
  StyledModalTitleNext,
} from 'common/components/Modals/Modal.styled'
import { initSizeData } from 'common/constants/Post/initialSizeData'
import { ThemeButton } from 'common/enums/themeButton'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import fullScreen from 'public/img/icons/expand-outline.svg'
import addPhoto from 'public/img/icons/image-outline.svg'
import addPhotoOn from 'public/img/icons/image.svg'
import zoom from 'public/img/icons/maximize-outline.svg'
import zoomOn from 'public/img/icons/maximize.svg'
import resizePhoto from 'public/img/icons/photo-resize.svg'
import resizePhotoOn from 'public/img/icons/photo-resizeOn.svg'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import AddPhotoElement from './AddPhotoElement'
import getCroppedImg, { getImageRatio } from './cropImage'
import EasyCropper, { CropArgType } from './EasyCropper'
import { PhotoType } from './PostCreationModal'
import 'cropperjs/dist/cropper.css'
import ResizeElement from './ResizeElement'
import { Slider } from './Slider'

const PostResizeModal = ({
  handleFullScreen,
  handleNextToFilterButton,
  setPhotoPost,
  photoPost,
  photoFile,
  handleAddPhotoButton,
  photoFileURL,
  setPhotoFileURL,
}: {
  handleAddPhotoButton: () => void
  handleFullScreen: (full: boolean) => void
  handleNextToFilterButton: () => void
  photoFile: File | string
  photoFileURL: string | undefined
  photoPost: PhotoType[]
  setPhotoFileURL: (photoFileURL: string) => void
  setPhotoPost: (photoPost: PhotoType[]) => void
}) => {
  const [value, setValue] = useState(1) // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false) // открытие окна zoom
  const [openAddPhoto, setOpenAddPhoto] = useState(false) // открытие окна добавления новой фотографии
  const [full, setFullScreen] = useState(false) // переход в режим отображения на весь экран
  const [resize, setResize] = useState(false) // открытие окна изменения соотношения сторон изображения
  const [ratio, setRatio] = useState(1) // первоначальное соотношение сторон кадра
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null) // сохранение вырезанной области
  const [isObjectFit, setIsObjectFit] = useState(false) // параметр вписывания изображения для easy-crop
  const [sizeData, setSizeData] = useState(initSizeData) // массив параметров для модального окна изменения размеров
  // const [photoFileURL, setPhotoFileURL] = useState<string>() // url изображени, загруженного из компьютера

  const { t } = useTranslation('post_cr')

  const photoPostLength = 10

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const url = reader.result

      if (typeof url === 'string') {
        setPhotoFileURL(url)
        imageRatio(url)
      }
    }
    if (typeof photoFile !== 'string') {
      reader.readAsDataURL(photoFile)
    } else {
      setPhotoFileURL(photoFile)
      imageRatio(photoFile)
    }
  }, [])

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider =
    (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setState(parseInt(e.target.value, 10))
      }
    }

  // Сохранение отредактированного изображения
  const handleSave = async () => {
    if (photoPost.length < photoPostLength) {
      try {
        if (croppedAreaPixels && photoFileURL) {
          const croppedImage = await getCroppedImg(photoFileURL, croppedAreaPixels)

          if (croppedImage) {
            setPhotoPost([
              ...photoPost,
              { photoUrl: croppedImage, filter: '', photoUrlWithFilter: croppedImage },
            ])
          }
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('error')
    }
  }

  // Обработчик нажатия кнопки zoom
  const handleZoomOpen = () => {
    setOpenZoom(!openZoom)
    if (resize === true) setResize(!resize)
  }

  // Обработчик нажатия кнопки resize
  const handleResizeOpen = () => {
    setResize(!resize)
    if (openZoom === true) setOpenZoom(!openZoom)
  }

  // Обработчик нажатия кнопки Full Screen
  // const handleClickFullScreen = () => {
  //   handleFullScreen(!full)
  //   setFullScreen(!full)
  // }

  // Определение соотношения сторон загруженного изображения
  const imageRatio = async (url: string) => {
    try {
      const newRatio = await getImageRatio(url)
      const sizeDataWithRatio = sizeData.map(item => {
        if (item.size === 'original') item.setRatio = newRatio

        return item
      })

      setSizeData(sizeDataWithRatio)
    } catch (e) {
      console.error(e)
    }
  }

  // // Удаление изображения из массива
  // const removePhotoFromList = (index: number) => {
  //   const newPhotoList = [];
  //   for (let i = 0; i < photoPost.length; i++) {
  //     if (index === i) {
  //       continue;
  //     } else {
  //       newPhotoList.push(photoPost[i]);
  //     }
  //   }
  //   setPhotoPost(newPhotoList);
  // };

  // // Изменение стиля иконки при выборе данного размера изображения
  // const selectSize = (ind: number) => {
  //   const sizeDataSelected = sizeData.map((item, index) => {
  //     item.selected = false;
  //     if (index === ind) {
  //       item.selected = true;
  //     }
  //     return item;
  //   });
  //   setSizeData(sizeDataSelected)
  // };

  return (
    <>
      <StyledModalHeaderNext>
        <StyledCloseNextButton onClick={handleAddPhotoButton}>
          <Image
            alt="arrowBack"
            height={24}
            src="/img/icons/arrow-ios-back.svg"
            width={24}
            priority
          />
        </StyledCloseNextButton>
        <StyledModalTitleNext>{t('cropping')}</StyledModalTitleNext>
        <Button
          disabled={photoPost.length === 0}
          theme={ThemeButton.CLEAR}
          onClick={handleNextToFilterButton}
        >
          {t('next')}
        </Button>
      </StyledModalHeaderNext>
      <StyledPhotoEditor>
        <EasyCropper
          aspectRatio={ratio}
          isObjectFit={isObjectFit}
          photoFileURL={photoFileURL}
          setCroppedAreaPixels={setCroppedAreaPixels}
          setZoom={setValue}
          zoomTo={value}
        />
      </StyledPhotoEditor>

      {openZoom && (
        <StyledSliderContainer>
          <label htmlFor="zoom" />
          <Slider
            id="zoom"
            max="5"
            min="1"
            type="range"
            value={value}
            style={{
              width: '45%',
              '--min': 1,
              '--max': 5,
              '--val': value,
            }}
            onChange={handleSlider(setValue)}
            onInput={handleSlider(setValue)}
          />
        </StyledSliderContainer>
      )}

      {resize && (
        <ResizeElement
          setIsObjectFit={setIsObjectFit}
          setRatio={setRatio}
          setSizeData={setSizeData}
          setValue={setValue}
          sizeData={sizeData}
        />
        // <StyledResizeBlock>
        //   {sizeData.map((item, index) => {
        //     return (
        //       <StyleItemSize
        //         key={index}
        //         selected={item.selected ? "selected" : ""}
        //         onClick={() => {
        //           if (index === 0) {
        //             setValue(1);
        //           }
        //           setRatio(item.setRatio);
        //           setIsObjectFit(item.setIsObjectFit);
        //           selectSize(index);
        //         }}
        //       >
        //         <StyledIconSize alt={item.alt} src={item.selected ? item.srcActive : item.src} />
        //         {t(item.size)}
        //       </StyleItemSize>
        //     );
        //   })}
        // </StyledResizeBlock>
      )}

      {openAddPhoto && (
        <AddPhotoElement
          handleAddPhotoButton={handleAddPhotoButton}
          handleSave={handleSave}
          photoPost={photoPost}
          setPhotoPost={setPhotoPost}
        />
        // <StyledAddBlock>
        //   <StyledPhotoPost id={"scrollable-container"}>
        //     {photoPost.map((photo, index) => (
        //       <SmallPhoto
        //         photo={photo.photoUrl}
        //         key={index}
        //         index={index}
        //         removePhotoFromList={removePhotoFromList}
        //       />
        //     ))}
        //   </StyledPhotoPost>
        //   <div onClick={handleAddPhotoButton} style={{ cursor: "pointer" }}>
        //     <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen} />
        //   </div>
        //   <div
        //     onClick={handleSave}
        //     style={{ cursor: photoPost.length < 10 ? "pointer" : "default" }}
        //   >
        //     <StyledIconSavePhoto src={savePhoto} alt={savePhoto} />
        //   </div>
        // </StyledAddBlock>
      )}

      {/* <div onClick={handleClickFullScreen}>
        <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen}/>
      </div> */}
      <div onClick={() => handleResizeOpen()}>
        <StyledIconResize alt={fullScreen} src={resize ? resizePhotoOn : resizePhoto} />
      </div>
      <div onClick={() => handleZoomOpen()}>
        <StyledIconZoom alt={zoom} src={!openZoom ? zoom : zoomOn} />
      </div>
      <div onClick={() => setOpenAddPhoto(!openAddPhoto)}>
        <StyledIconAddPhoto
          alt={addPhoto}
          full={full}
          src={!openAddPhoto ? addPhoto : addPhotoOn}
        />
      </div>
    </>
  )
}

// Стили
export default PostResizeModal

// type SizePhotoType = {
//   width: number;
//   height: number;
// };

// type PhotoEditorPropsType = {
//   full: boolean;
// };
type IconAddPhotoType = {
  full?: boolean
}

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
`

// const StyledPhotoPost = styled.div`
//   position: absolute;
//   width: 152px;
//   height: 106px;
//   background: ${baseTheme.colors.dark["300"]};
//   display: flex;
//   overflow-x: scroll;
//   z-index: 100;
// `;

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
`

// const StyleItemSize = styled.div<{ selected?: string }>`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 5px;

//   font-family: Inter;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   cursor: pointer;

//   color: ${(props) => (props.selected ? "white" : "grey")};
// `;

// const StyledIconSize = styled(Image)`
//   width: 26px;
//   height: 26px;
//   background: ${baseTheme.colors.dark["100"]};
//   cursor: pointer;
// `;

const StyledIconFullScreen = styled(Image)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  background: ${baseTheme.colors.dark['100']};
`

const StyledIconZoom = styled(StyledIconFullScreen)`
  left: 20px;
`

const StyledIconAddPhoto = styled(StyledIconFullScreen)<IconAddPhotoType>`
  left: ${props => (props.full ? '95%' : '430px')};
  cursor: pointer;
`
const StyledIconResize = styled(StyledIconZoom)`
  left: 80px;
`

// const StyledIconPlusPhoto = styled(Image)`
//   position: absolute;
//   width: 40px;
//   background: none;
//   margin: 5px 5px;
//   right: 0;
// `;

// const StyledIconSavePhoto = styled(StyledIconPlusPhoto)`
//   top: 43px;

//   &:hover {
//     fill: red;
//   }
// `;

// const StyledAddBlock = styled.div`
//   position: absolute;
//   width: 200px;
//   height: 106px;
//   background: ${baseTheme.colors.dark["300"]};
//   bottom: 60px;
//   right: 18px;
//   z-index: 2;
//   opacity: 0.7;
// `;

// const StyledResizeBlock = styled(StyledAddBlock)`
//   position: absolute;
//   padding: 5px;
//   width: 100px;
//   height: 140px;
//   background: ${baseTheme.colors.dark["100"]};
//   bottom: 60px;
//   left: 80px;
//   z-index: 2;
//   opacity: 1;
// `;
