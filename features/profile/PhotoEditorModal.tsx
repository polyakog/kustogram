import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Slider } from './Slider';
import { Button } from 'common/components/Button/Button';
import { ThemeButton } from 'common/enums/themeButton';
import styled from "styled-components";
import { useSaveAvatarMutation } from 'assets/store/api/profile/profileApi';

////  //  Модальное окно редактирования изображения  //  ////

const PhotoEditorModal = ({
    photo,
    handleEditorClose
  }: {
    photo: File
    handleEditorClose: () => void 
  }) => {

  const [value, setValue] = useState(12) // начальное значение для zoom
  const [rotateAngle, setRotateAngle] = useState(0)  // начальное значение для rotate

  const [saveAvatarHandler] = useSaveAvatarMutation()
  
  const cropRef = useRef<AvatarEditor | null>(null)

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider = (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setState(parseInt(e.target.value))
    }
  }

  // Обработчик сохранени отредактированного изображения
  const handleSave = async () => {

    // подготовка данных
    if (cropRef.current) {
      const avatar = cropRef.current.getImage().toDataURL();

      // преобразование base64 в file
      const result = await fetch(avatar);
      const blob = await result.blob();
      const file = new File([blob], 'avatar', {type: 'image/png'})  

      // преобразование file в FormData
      const formData = new FormData()
      formData.append("avatar", file as File)

      try {
        await saveAvatarHandler(formData)
          .unwrap()
          .then(() => {
            handleEditorClose()
          })
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (<>
    <StyledAvatarEditor>
      <AvatarEditor     // width и height задается в styled component с учетом border
        ref={cropRef}
        image={photo}
        border={12}
        borderRadius={158}
        color={[23, 23, 23, 0.6]}
        scale={value/10}      
        rotate={rotateAngle}
        style={{
          width: "100%",
          height: "100%",
        }}
    />
    </StyledAvatarEditor>
    
    <StyledSliderContainer>
      <label htmlFor="zoom">Zoom:</label>
      <Slider
        min="10"
        max="50"
        id="zoom"
        onInput={handleSlider(setValue)}
        onChange={handleSlider(setValue)}
        value={value}
        type="range"
        style={{
          width: "80%",
          "--min": 10,
          "--max": 50,
          "--val": value
        }}
      />
    </StyledSliderContainer>
    <StyledSliderContainer>
      <label htmlFor="rotate">Rotate:</label>
      <Slider
        min="-180"
        max="180"
        id="rotate"
        onInput={handleSlider(setRotateAngle)}
        onChange={handleSlider(setRotateAngle)}
        value={rotateAngle}
        type="range"
        style={{
          width: "80%",
          "--min": -180,
          "--max": 180,
          "--val": rotateAngle
        }}
      />
    </StyledSliderContainer>
    <StyledContainerButton>
      <Button theme={ThemeButton.PRIMARY} width={"86px"} onClick={handleSave}>
        Save
      </Button>
    </StyledContainerButton>
    
  </>
  )
}

// Стили
export default PhotoEditorModal

const StyledAvatarEditor = styled.div
`
  margin: 20px auto;
  width: 340px;
  height: 340px;

  @media (max-width: 390px) {
    width: 80vw;
    height: 80vw;
    max-width: 340px;
    max-height: 340px;
  }
 
`;

const StyledSliderContainer = styled.div 
`
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;

  & label {
  }
`;

const StyledContainerButton = styled.div
  `
  margin-left: auto;  
  margin-right: 24px; 
  `