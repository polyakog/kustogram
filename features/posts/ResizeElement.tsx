import { styled } from "styled-components";
import { baseTheme } from "../../styles/styledComponents/theme";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { SizeDataType } from "common/constants/Post/initialSizeData";
import { StyledAddBlock } from "./AddPhotoElement";

type ResizeElementType = {
    sizeData: SizeDataType[]
    setValue: (value: number) => void
    setRatio: (ratio: number) => void 
    setIsObjectFit: (isObjectFit: boolean) => void 
    setSizeData: (sizeData: SizeDataType[]) => void
}

const ResizeElement = ({
    sizeData, 
    setValue, 
    setRatio, 
    setIsObjectFit, 
    setSizeData} : ResizeElementType) => {
    
    const { t } = useTranslation("post_cr")

    // Изменение стиля иконки при выборе данного размера изображения
    const selectSize = (ind: number) => {
        const sizeDataSelected = sizeData.map((item, index) => {
          item.selected = false;
          if (index === ind) {
            item.selected = true;
          }
          return item;
        });
        setSizeData(sizeDataSelected)
      };

    const handleResizeClick = (item: SizeDataType, index: number) => {
        if (index === 0) {
          setValue(1);
        }
        setRatio(item.setRatio);
        setIsObjectFit(item.setIsObjectFit);
        selectSize(index);
      }

    return (
        <StyledResizeBlock>
          {sizeData.map((item, index) => {
            return (
              <StyleItemSize
                key={index}
                selected={item.selected ? "selected" : ""}
                onClick={() => handleResizeClick(item, index)}
              >
                <StyledIconSize alt={item.alt} src={item.selected ? item.srcActive : item.src} />
                {t(item.size)}
              </StyleItemSize>
            );
          })}
        </StyledResizeBlock>
    )
}

export default ResizeElement

const StyleItemSize = styled.div<{ selected?: string }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;

  color: ${(props) => (props.selected ? "white" : "grey")};
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

const StyledIconSize = styled(Image)`
  width: 26px;
  height: 26px;
  background: ${baseTheme.colors.dark["100"]};
  cursor: pointer;
`;