import React, { useState } from "react";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import FilterModal from "./FilterModal";
import PostDescriptionModal from "./PostDescriptionModal";
import PostResizeModal from "./PostResizeModal";

const PostCreationModal = ({
  handleEditorClose,
  handleFullScreen
}: {
  handleEditorClose: () => void;
  handleFullScreen: (full: boolean) => void;
}) => {
  const [openComp, setOpenComp] = useState(true); // начальное значение для rotate
  const [photoPost, setPhotoPost] = useState<PhotoType[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // открытие модального окна для наложения фильтров
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); // открытие модального окна для описания поста
  const [openResize, setOpenResize] = useState(false); // открытие окна изменения размеров изображения
  const [photoFile, setPhotoFile] = useState<File>(); // изображение, передаваемое в компоненту редактирования

  const handleNextToResize = () => {
    setOpenComp(false);
    setOpenResize(true);
  };

  const handleAddPhotoButton = () => {
    setOpenComp(true);
    setOpenResize(false);
  };

  const handleNextToFilterButton = () => {
    setIsFilterOpen(true);
    setOpenResize(false);
  };

  const handleNextToPublishButton = (photoPost: PhotoType[]) => {
    setIsDescriptionOpen(true);
    setIsFilterOpen(false);
    setPhotoPost(photoPost);
  };

  const handleBackToEditor = (photoPost: PhotoType[]) => {
    setOpenResize(true);
    setIsFilterOpen(false);
    setPhotoPost(photoPost);
  };

  const handleBackToFilters = (photoPost: PhotoType[]) => {
    setIsFilterOpen(true);
    setIsDescriptionOpen(false);
    setPhotoPost(photoPost);
  };

  return (
    <>
      {openComp && (
        <PostPhotoSelectModal
          handleModalClose={handleEditorClose}
          avatar={""}
          handleFullScreen={handleFullScreen}
          setPhotoFile={setPhotoFile}
          handleNextToResize={handleNextToResize}
        />
      )}
      {openResize && photoFile && (
        <PostResizeModal
          photoFile={photoFile}
          handleFullScreen={handleFullScreen}
          handleNextToFilterButton={handleNextToFilterButton}
          handleAddPhotoButton={handleAddPhotoButton}
          setPhotoPost={setPhotoPost}
          photoPost={photoPost}
        />
      )}
      {isFilterOpen && (
        <FilterModal
          handleBackToEditor={handleBackToEditor}
          handleNextToPublishButton={handleNextToPublishButton}
          photoPost={photoPost}
        />
      )}
      {isDescriptionOpen && (
        <PostDescriptionModal
          handleBackToFilters={handleBackToFilters}
          handleModalClose={handleEditorClose}
          photoPost={photoPost}
          photoFile={photoFile}
        />
      )}
    </>
  );
};

// Стили
export default PostCreationModal;

export type PhotoType = {
  photoUrl: string;
  filter: string;
  photoUrlWithFilter: string;
};
