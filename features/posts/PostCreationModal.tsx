import React, { useState, useRef, useEffect } from "react";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import FilterModal from "./FilterModal";
import PostDescriptionModal from "./PostDescriptionModal";
import PostResizeModal from "./PostResizeModal";
import { useOutsideClick } from "common/hooks/useOutsideClick";
import { Modal } from "common/components/Modals/ModalPublic/Modal";
import styled from "styled-components";
import { TFunction } from "next-i18next";

///  //  Модальное окно для создания поста: выбор изображений,       //  ///
//     наложение фильтров,  изменение размеров, добавление описания        //

const PostCreationModal = ({
  handleEditorClose,
  handleFullScreen,
  setIsOpenModalEdit
}: {
  handleEditorClose: () => void;
  handleFullScreen: (full: boolean) => void;
  setIsOpenModalEdit: (state: boolean) => void;
}) => {
  const [openComp, setOpenComp] = useState(true); // открытие модального окна для выбора изображения
  const [photoPost, setPhotoPost] = useState<PhotoType[]>([]); // массив объектов с параметрами изображения
  const [isFilterOpen, setIsFilterOpen] = useState(false); // открытие модального окна для наложения фильтров
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); // открытие модального окна для описания поста
  const [openResize, setOpenResize] = useState(false); // открытие модального окна изменения размеров изображения
  const [photoFile, setPhotoFile] = useState<File>(); // изображение, передаваемое в компоненту редактирования

  // Обработчик перехода из окна выбора изображения в окно изменения размеров
  const handleNextToResize = () => {
    setOpenComp(false);
    setOpenResize(true);
  };

  // Обработчик перехода из окна изменения размеров в окно выбора изображения
  const handleAddPhotoButton = () => {
    setOpenComp(true);
    setOpenResize(false);
  };

  // Обработчик перехода из окна изменения размеров в окно наложения фильтров
  const handleNextToFilterButton = () => {
    setIsFilterOpen(true);
    setOpenResize(false);
  };

  // Обработчик перехода из окна наложения фильтров в окно добавления описания
  const handleNextToPublishButton = (photoPost: PhotoType[]) => {
    setIsDescriptionOpen(true);
    setIsFilterOpen(false);
    setPhotoPost(photoPost);
  };

  // Обработчик перехода из окна наложения фильтров в окно изменения размеров
  const handleBackToEditor = (photoPost: PhotoType[]) => {
    setOpenResize(true);
    setIsFilterOpen(false);
    setPhotoPost(photoPost);
  };

  // Обработчик перехода из окна добавления описания в окно наложения фильтров
  const handleBackToFilters = (photoPost: PhotoType[]) => {
    setIsFilterOpen(true);
    setIsDescriptionOpen(false);
    setPhotoPost(photoPost);
  };

  const [closeCreation, setCloseCreation] = useState(false);

  const ref = useOutsideClick(() => {
    setCloseCreation(true);
  });

  const close = () => {
    setIsOpenModalEdit(false);
  };

  return (
    <>
      {closeCreation && (
        <Modal
          bg="no bg"
          height="250px"
          handleCrossClick={() => setCloseCreation(false)}
          title="Undo Creation
        "
          bodyText="Do you really want to close the creation of a publication? If you close everything will be deleted"
        >
          <>
            <ModalBtn onClick={close}>Yes</ModalBtn>
            <ModalBtn onClick={() => setCloseCreation(false)}>No</ModalBtn>
          </>
        </Modal>
      )}
      <div ref={ref}>
        {openComp && (
          <PostPhotoSelectModal
            handleModalClose={handleEditorClose}
            avatar={""}
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
          />
        )}
      </div>
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

const ModalBtn = styled.button`
  background: black;
  border: 1px solid #397df6;
  color: #397df6;
  cursor: pointer;
  width: 50px;
  padding: 5px 10px;
  &:hover {
    color: white;
    background: #397df6;
  }
`;
