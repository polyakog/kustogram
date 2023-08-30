/* eslint-disable no-param-reassign */
import { useState } from 'react'

import { ImageToolModal } from 'common/hoc/ImageToolModal'
import { filtersList } from 'common/utils/filters'
import { useTranslation } from 'next-i18next'
import { styled } from 'styled-components'

import Canvas from './Canvas'
import FilterElement from './FilterElement'
import { PhotoType } from './PostCreationModal'

const FilterModal = ({
  handleModalClose,
  photoPost,
  handleBackToEditor,
  handleNextToPublishButton,
}: {
  handleBackToEditor: (filterPhotoList: PhotoType[]) => void
  handleModalClose?: () => void
  handleNextToPublishButton: (filterPhotoList: PhotoType[]) => void
  photoPost: PhotoType[]
}) => {
  const [photo, setPhoto] = useState(photoPost[0]) // изображение из массива, отображаемое в модальном окне
  const [filterPhotoList, setFilterPhotoList] = useState<PhotoType[]>(photoPost) // массив изображений с выбранными фильтрами

  const { t } = useTranslation('post_cr')

  // Обработчик выбора фильтра
  const handleFilter = (filter: string) => {
    const filterPhotoPost = photoPost.map(el => {
      if (el.photoUrl === photo.photoUrl) {
        el.filter = filter
      }

      return el
    })

    setFilterPhotoList(filterPhotoPost)
  }

  // Обработчик нажатия кнопки Back
  const handleBack = () => {
    handleBackToEditor(filterPhotoList)
  }

  // Обработчик нажатия кнопки Next
  const handleNextButton = () => {
    handleNextToPublishButton(filterPhotoList)
  }

  // Обработчик для сохранения url изображения с указанным фильтром, полученного из canvas
  const handleCanvas = (photoUrlFilter: string) => {
    const filterPhotoPost = photoPost.map(el => {
      if (el.photoUrl === photo.photoUrl) {
        el.photoUrlWithFilter = photoUrlFilter
      }

      return el
    })

    setFilterPhotoList(filterPhotoPost)
  }

  return (
    <ImageToolModal
      handleBack={handleBack}
      handleModalClose={handleModalClose}
      handleNextStepButton={handleNextButton}
      nextStep={t('next')}
      photo={photo}
      photoPost={photoPost}
      setPhoto={setPhoto}
      title={t('filters')}
    >
      <StyledFiltersContainer key={photo.photoUrl}>
        {filtersList.map(el => (
          <FilterElement
            key={el.filterTitle}
            filter={el.filter}
            filterTitle={el.filterTitle}
            handleFilter={handleFilter}
            photoUrl={photo.photoUrl}
          />
        ))}
      </StyledFiltersContainer>

      <HiddenCanvas key={photo.filter}>
        <Canvas
          filter={photo.filter}
          height="450px"
          photo={photo.photoUrl}
          setImageUrl={handleCanvas}
          width="450px"
        />
      </HiddenCanvas>
    </ImageToolModal>
  )
}

export default FilterModal

const StyledFiltersContainer = styled.div<{ key: string }>`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 3;

  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  overflow: scroll;
`
const HiddenCanvas = styled.div`
  width: fit-content;
  height: fit-content;
  visibility: hidden;
  z-index: -1;
  position: absolute;
`
