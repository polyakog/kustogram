import Image from 'next/image'
import fullScreen from 'public/img/icons/expand-outline.svg'
import plusPhoto from 'public/img/icons/plus-circle-outline.svg'
import savePhoto from 'public/img/icons/save-photos.svg'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import { PhotoType } from './PostCreationModal'
import SmallPhoto from './SmallPhoto'

type AddPhotoElementType = {
  handleAddPhotoButton: () => void
  handleSave: () => Promise<void>
  photoPost: PhotoType[]
  setPhotoPost: (photoPost: PhotoType[]) => void
}
const AddPhotoElement = ({
  photoPost,
  handleAddPhotoButton,
  setPhotoPost,
  handleSave,
}: AddPhotoElementType) => {
  // Удаление изображения из массива
  const removePhotoFromList = (index: number) => {
    const newPhotoList = []

    for (let i = 0; i < photoPost.length; i++) {
      if (index === i) {
        continue
      } else {
        newPhotoList.push(photoPost[i])
      }
    }
    setPhotoPost(newPhotoList)
  }

  const photoPostLength = 10 // максимальное количество фотографий

  return (
    <StyledAddBlock>
      <StyledPhotoPost id="scrollable-container">
        {photoPost.map((photo, index) => (
          <SmallPhoto
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            photo={photo.photoUrl}
            removePhotoFromList={removePhotoFromList}
          />
        ))}
      </StyledPhotoPost>
      <div style={{ cursor: 'pointer' }} onClick={handleAddPhotoButton}>
        <StyledIconPlusPhoto alt={fullScreen} src={plusPhoto} />
      </div>
      <div
        style={{ cursor: photoPost.length < photoPostLength ? 'pointer' : 'default' }}
        onClick={handleSave}
      >
        <StyledIconSavePhoto alt={savePhoto} src={savePhoto} />
      </div>
    </StyledAddBlock>
  )
}

export default AddPhotoElement

export const StyledAddBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 106px;
  background: ${baseTheme.colors.dark['300']};
  bottom: 60px;
  right: 18px;
  z-index: 2;
  opacity: 0.7;
`

const StyledPhotoPost = styled.div`
  position: absolute;
  width: 152px;
  height: 106px;
  background: ${baseTheme.colors.dark['300']};
  display: flex;
  overflow-x: scroll;
  z-index: 100;
`

const StyledIconPlusPhoto = styled(Image)`
  position: absolute;
  width: 40px;
  background: none;
  margin: 5px 5px;
  right: 0;
`

const StyledIconSavePhoto = styled(StyledIconPlusPhoto)`
  top: 43px;

  &:hover {
    fill: red;
  }
`
