import { FC, useState } from 'react'

import { store } from 'assets/store/store'
import PostCreationModal from 'features/posts/PostCreationModal'
import { Provider } from 'react-redux'

import { StyledModalContainer, StyledModalOverlay } from '../../Modals/Modal.styled'

type CreatePostProps = {
  isOpenModalEdit: boolean
  setIsOpenModalEdit: (state: boolean) => void
}

export const CreatePost: FC<CreatePostProps> = ({ isOpenModalEdit, setIsOpenModalEdit }) => {
  // const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(true);
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  const closeModal = () => {
    setIsOpenModalEdit(false)
  }

  const handleFullScreen = (full: boolean) => {
    setFullScreen(full)
  }

  return (
    <Provider store={store}>
      {isOpenModalEdit && (
        <StyledModalOverlay>
          <StyledModalContainer
            height={fullScreen ? '100%' : '564px'}
            width={fullScreen ? '100%' : '492px'}
          >
            <PostCreationModal
              handleEditorClose={closeModal}
              handleFullScreen={handleFullScreen}
              setIsOpenModalEdit={setIsOpenModalEdit}
            />
          </StyledModalContainer>
        </StyledModalOverlay>
      )}
    </Provider>
  )
}
