import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";
import { ImageToolModal } from "common/hoc/ImageToolModal";
import { styled } from "styled-components";
import { PhotoType } from "./PostCreationModal";
import Canvas from "./Canvas";

const FilterModal = ({
  handleModalClose,
  photoPost,
  handleBackToEditor,
  handleNextToPublishButton
}: {
  handleModalClose?: () => void;
  photoPost: PhotoType[];
  handleBackToEditor: (filterPhotoList: PhotoType[]) => void;
  handleNextToPublishButton: (filterPhotoList: PhotoType[]) => void;
}) => {
  const [photo, setPhoto] = useState(photoPost[0]);
  const [filterPhotoList, setFilterPhotoList] = useState<PhotoType[]>(photoPost);

  const handleFilter = (filter: string, newPhoto: string) => {
    const filterPhotoPost = photoPost.map((el) => {
      if (el.photoUrl == photo.photoUrl) {
        el.filter = filter;
      }
      return el;
    });
    setFilterPhotoList(filterPhotoPost);
  };

  const handleBack = () => {
    handleBackToEditor(filterPhotoList);
    console.log("photo in filter at back", filterPhotoList);
  };

  const handleNextButton = () => {
    handleNextToPublishButton(filterPhotoList);
  };
  const handleCanvas = (canvasUrl: string) => {
    const filterPhotoPost = photoPost.map((el) => {
      if (el.photoUrl == photo.photoUrl) {
        el.photoUrlWithFilter = canvasUrl;
      }
      return el;
    });
    setFilterPhotoList(filterPhotoPost);
    console.log("canvas new");
    console.log("filterPhotoList", filterPhotoPost[0].photoUrlWithFilter);
  };

  return (
    <ImageToolModal
      handleModalClose={handleModalClose}
      photoPost={photoPost}
      handleBack={handleBack}
      title="Filters"
      setPhoto={setPhoto}
      photo={photo}
      nextStep="Next"
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
          width={"0"}
          height={"0"}
          setImageUrl={handleCanvas}
          isImgSizes={true}
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
  position: absolute;
`;
