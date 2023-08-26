import React, { FC, useState } from "react";
import { StyledModalContainer, StyledModalOverlay } from "../../Modals/Modal.styled";
import { Provider } from "react-redux";
import { store } from "assets/store/store";
import PostCreationModal from "features/posts/PostCreationModal";
import { TFunction } from "next-i18next";

type CreatePostProps = {
  isOpenModalEdit: boolean;
  setIsOpenModalEdit: (state: boolean) => void;
};

export const CreatePost: FC<CreatePostProps> = ({ isOpenModalEdit, setIsOpenModalEdit }) => {
  // const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModalEdit(false);
  };

  const handleFullScreen = (full: boolean) => {
    setFullScreen(full);
  };

  return (
    <>
      <Provider store={store}>
        {isOpenModalEdit && (
          <StyledModalOverlay>
            <StyledModalContainer
              width={fullScreen ? "100%" : "492px"}
              height={fullScreen ? "100%" : "564px"}
            >
              <PostCreationModal
                setIsOpenModalEdit={setIsOpenModalEdit}
                handleEditorClose={closeModal}
                handleFullScreen={handleFullScreen}
              />
            </StyledModalContainer>
          </StyledModalOverlay>
        )}
      </Provider>
    </>
  );
};
