import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";
import { ImageToolModal } from "common/hoc/ImageToolModal";
import { styled } from "styled-components";
import { PhotoType } from "./PostCreationModal";
import Canvas from "./Canvas";
import { useTranslation } from "next-i18next";

const FilterModal = ({
    handleModalClose, 
    photoPost,
    handleBackToEditor,
    handleNextToPublishButton,
  }: {
    handleModalClose?: () => void
    photoPost: PhotoType[]
    handleBackToEditor: (filterPhotoList: PhotoType[]) => void
    handleNextToPublishButton: (filterPhotoList: PhotoType[]) => void
  }) => {

  const [photo, setPhoto] = useState(photoPost[0]) // изображение из массива, отображаемое в модальном окне
  const [filterPhotoList, setFilterPhotoList] = useState<PhotoType[]>(photoPost) // массив изображений с выбранными фильтрами

  const { t } = useTranslation("post_cr")

  // Обработчик выбора фильтра 
  const handleFilter = (filter: string) => {
    const filterPhotoPost = photoPost.map((el) => {
      if (el.photoUrl == photo.photoUrl) {
        el.filter = filter;
      }
      return el;
    });
    setFilterPhotoList(filterPhotoPost);
  };

  // Обработчик нажатия кнопки Back
  const handleBack = () => {
    handleBackToEditor(filterPhotoList)
  }

  // Обработчик нажатия кнопки Next
  const handleNextButton = () => {
    handleNextToPublishButton(filterPhotoList);
  };

  // Обработчик для сохранения url изображения с указанным фильтром, полученного из canvas
  const handleCanvas = (photoUrlFilter: string) => {
    const filterPhotoPost = photoPost.map((el) => {
      if (el.photoUrl == photo.photoUrl) {
        el.photoUrlWithFilter = photoUrlFilter;
      }
      return el;
    });
    setFilterPhotoList(filterPhotoPost);
  };

  return (
    <ImageToolModal
      handleModalClose={handleModalClose}
      photoPost={photoPost}
      handleBack={handleBack}
      title={t("filters")}
      setPhoto={setPhoto}
      photo={photo}
      nextStep={t("next")}
      handleNextStepButton={handleNextButton}
    >
      <StyledFiltersContainer key={photo.photoUrl}>
        {filtersList.map((el, index) => (
          <FilterElement
            key={index}
            filter={el.filter}
            filterTitle={el.filterTitle}
            photoUrl={photo.photoUrl}
            handleFilter={handleFilter}
          />
        ))}
      </StyledFiltersContainer>

      <HiddenCanvas key={photo.filter}>
        <Canvas
          photo={photo.photoUrl}
          filter={photo.filter}
          width={"450px"}
          height={"450px"}
          setImageUrl={handleCanvas}
        />
      </HiddenCanvas>
    </ImageToolModal>
  );
};

export default FilterModal;

const StyledFiltersContainer = styled.div<{ key: string }>`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 3;

  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  overflow: scroll;
`;
const HiddenCanvas = styled.div`

    width: fit-content;
    height: fit-content;
    visibility: hidden;
    z-index: -1;
    position: absolute; 
`;
