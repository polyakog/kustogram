import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

const PostPhotoSelectModal = ({
  handleModalClose,
  avatar,
  setPhotoFile,
  handleNextToResize,
}: {
  avatar?: string
  handleModalClose: () => void
  handleNextToResize: () => void
  setPhotoFile: (photoFile: File) => void
}) => {
  const { t } = useTranslation('post_cr')

  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]

      console.log(['file', file])
      setPhotoFile(file)
      handleNextToResize()
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
