import React from 'react'

import { Button } from 'common/components/Button/Button'
import { ThemeButton } from 'common/enums/themeButton'
import { PhotoType } from 'features/posts/PostCreationModal'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

const PostPhotoSelectModal = ({
  handleModalClose,
  avatar,
  setPhotoFile,
  handleNextToResize,
  setPhotoPost,
  setPostDescription,
  isDraft,
}: {
  avatar?: string
  handleModalClose: () => void
  handleNextToResize: () => void
  isDraft: boolean
  setPhotoFile: (photoFile: File | string) => void
  setPhotoPost: (post: PhotoType[]) => void
  setPostDescription: (postDescription: string) => void
}) => {
  const { t } = useTranslation('post_cr')

  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]

      setPhotoFile(file)
      handleNextToResize()
    }
  }

  // Загрузка черновика поста из Indexed BD
  const handleOpenDraft = () => {
    const dbName = 'PostDraft'

    const openRequest = indexedDB.open(dbName, 1) // открытие БД

    openRequest.onerror = () => {
      console.error('Database error')
    }
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result

      // создание хранилища, если не существует
      if (!db.objectStoreNames.contains('post')) {
        db.createObjectStore('post', { autoIncrement: true })
      }

      console.log('store is exist')
    }
    openRequest.onsuccess = () => {
      const db = openRequest.result

      // вывод ошибки при устаревшей версии БД
      db.onversionchange = () => {
        db.close()
        console.log('База данных устарела, пожалуйста, перезагрузите страницу.')
      }

      const transaction = db.transaction('post', 'readonly') // начало транзакции
      const post = transaction.objectStore('post')
      const request = post.get('1') // получение данных из хранилища

      request.onsuccess = () => {
        const photoPost = request.result.photoPost as PhotoType[] // фото для поста
        const postDescription = request.result.postDescription as string // описание для поста

        setPhotoPost(photoPost) // сохранение фото в state
        setPhotoFile(photoPost[0].photoUrl) // сохранение первой фотографии из массива вместо файла, который должен был быть выбран из файловой системы устройства
        setPostDescription(postDescription) // сохранение описания в state
        handleNextToResize() // переход к следующему модальному окну
      }

      request.onerror = () => {
        console.log('Ошибка', request.error)
      }
    }
    openRequest.onblocked = () => {
      console.log('пожалуйста, перезагрузите страницу.')
    }
  }

  return (
    <StyledModalBody>
      <StyledModalHeader>
        <StyledModalTitle>{t('add_photo')}</StyledModalTitle>
        <StyledCloseButton onClick={handleModalClose}>
          <Image alt="close" height={24} src="/img/icons/close_white.svg" width={24} priority />
        </StyledCloseButton>
      </StyledModalHeader>
      <StyledModalImageContainer>
        {avatar ? (
          <Image alt="Avatar" id="avatar" src={avatar} />
        ) : (
          <StyledModalImage
            alt="avatar"
            height={48}
            src="/img/icons/image-outline.svg"
            width={48}
            priority
          />
        )}
      </StyledModalImageContainer>
      <input accept="image/*" id="file-upload" type="file" onChange={handleSelectPhoto} />
      <StyledLabel htmlFor="file-upload">{t('select_from_comp')}</StyledLabel>
      <StyledContainerButton>
        {isDraft && (
          <Button theme={ThemeButton.OUTLINED} width="228px" onClick={handleOpenDraft}>
            Open Draft
          </Button>
        )}
      </StyledContainerButton>
    </StyledModalBody>
  )
}

export default PostPhotoSelectModal

// styles

const StyledLabel = styled.label`
  margin: 0 auto;
  background: #397df6;
  width: 228px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 6px 0;
`

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid ${baseTheme.colors.dark['100']};
`

const StyledModalTitle = styled.span`
  flex: 1;
  color: ${baseTheme.colors.light['100']};
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`

const StyledCloseButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
`

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 564px;
  margin: auto;

  & #file-upload {
    display: none;
  }

  & #upload-btn {
    margin: 20px auto;

    @media (max-width: 390px) {
      width: 80vw;
      max-width: 222px;
    }
  }

  & label {
    cursor: pointer;
  }
`

const StyledModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  background: ${baseTheme.colors.dark['500']};
  color: ${baseTheme.colors.light['100']};
  margin: 72px auto 40px;
  border-radius: 2px;
  width: 222px;
  height: 228px;

  & #avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 222px;
    height: 228px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media (max-width: 390px) {
    width: 80vw;
    max-width: 222px;
  }
`

const StyledModalImage = styled(Image)`
  color: ${baseTheme.colors.light['100']};

  margin: auto;
  border-radius: 2px;
  width: ${props => props.width};
  height: ${props => props.height};
`
const StyledContainerButton = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`
