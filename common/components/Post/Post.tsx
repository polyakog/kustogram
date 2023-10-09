import { useEffect, useState } from 'react'

import { useDeletePostMutation, useUpdatePostMutation } from 'assets/store/api/posts/postsApi'
import { CreatePostResponse } from 'assets/store/api/posts/types'
import { useAuthMeQuery, useProfileQuery } from 'assets/store/api/profile/profileApi'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import Image from 'next/image'
import bookMarkOutline from 'public/img/icons/bookmark.svg'
import close from 'public/img/icons/close_white.svg'
import edit from 'public/img/icons/edit-2-outline.svg'
import likeOutline from 'public/img/icons/heart-outline.svg'
import like from 'public/img/icons/heart.svg'
import more from 'public/img/icons/more-horizontal-outline.svg'
import nextBtn from 'public/img/icons/next.svg'
import planeOutline from 'public/img/icons/paper-plane-outline.svg'
import prevBtn from 'public/img/icons/prev.svg'
import trash from 'public/img/icons/trash-outline.svg'
import { styled } from 'styled-components'

import { fakeData } from './fakeData'

type PostProps = {
  login: string
  postInfo: CreatePostResponse | undefined
  setIsPostActive: (state: boolean) => void
}

const Post = ({ postInfo, setIsPostActive, login }: PostProps) => {
  const { data: profile } = useProfileQuery()

  const [isLiked, setIsLiked] = useState(false)
  const [images, _] = useState(postInfo?.images)
  const [currentImage, setCurrentImage] = useState(0)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const { data: user } = useAuthMeQuery()
  const [isPostManagmentsActive, setIsPostManagmentActive] = useState(false)
  const [comment, setComment] = useState('')
  const [description, setDescription] = useState(postInfo?.description || '')
  const [isEditDescription, setIsEditDescription] = useState(false)

  let imageSrc = ''

  if (images && images.length) {
    imageSrc = images[currentImage].url
  }
  const switchFotoHandler = (direction: string): void => {
    if (images && direction === 'next') {
      if (currentImage + 1 === images.length) {
        setCurrentImage(0)
      } else {
        setCurrentImage(prev => prev + 1)
      }
    } else if (images && currentImage === 0) {
      setCurrentImage(images.length - 1)
    } else {
      setCurrentImage(prev => prev - 1)
    }
  }

  const deleteOperationHandler = () => {
    setIsDeleteModal(true)
    setIsPostManagmentActive(prev => !prev)
  }

  const editPostOperation = () => {
    setIsPostManagmentActive(false)
    setIsEditDescription(true)
  }

  const deletePostHandler = () => {
    if (postInfo) {
      deletePost(postInfo.id)
        .unwrap()
        .then(() => setIsPostActive(false))
    }
  }

  const closeDescriptionModal = () => {
    setDescription(postInfo?.description || '')
    setIsEditDescription(false)
  }

  const newDescriptionHandler = () => {
    if (postInfo && description !== postInfo.description) {
      const data = {
        postId: postInfo.id,
        body: {
          description,
        },
      }

      updatePost(data)
        .unwrap()
        .then(() => setIsEditDescription(false))
    }
  }

  const handleCrossClick = () => {
    setIsDeleteModal(false)
  }

  return (
    <StyledPostOverlay>
      {isDeleteModal && (
        <Modal
          bodyText="Are you sure you want to delete this post?"
          handleCrossClick={handleCrossClick}
          title="Delete Post"
        >
          <>
            <ModalButton onClick={deletePostHandler}>Yes</ModalButton>
            <ModalButton onClick={() => setIsDeleteModal(false)}>No</ModalButton>
          </>
        </Modal>
      )}
      <StyledModalContainer>
        <StyledImageWrapper>
          <StyledPostImage alt="post image" height={560} src={imageSrc} width={490} />
          {images && images.length > 1 ? (
            <>
              <PrevPhoto alt="prev" src={prevBtn} onClick={() => switchFotoHandler('prev')} />
              <NextPhoto alt="next" src={nextBtn} onClick={() => switchFotoHandler('next')} />
            </>
          ) : null}
        </StyledImageWrapper>
        {!isEditDescription ? (
          <StyledComents>
            <StyledCommentsHeading>
              <CloseModal alt="close" src={close} onClick={() => setIsPostActive(false)} />
              <User>
                <StyledAvatar alt="avatar" height={48} src={profile?.photo || ''} width={48} />
                <StyledUsername>{profile?.login}</StyledUsername>
              </User>
              <EditPost
                alt="more"
                src={more}
                onClick={() => setIsPostManagmentActive(prev => !prev)}
              />
              {isPostManagmentsActive && (
                <PostManagment>
                  <Operation onClick={editPostOperation}>
                    <StyledIcon alt="edit" src={edit} />
                    <TypeOfOperation>Edit Post</TypeOfOperation>
                  </Operation>
                  <Operation onClick={deleteOperationHandler}>
                    <StyledIcon alt="delete" src={trash} />
                    <TypeOfOperation>Delete Post</TypeOfOperation>
                  </Operation>
                </PostManagment>
              )}
            </StyledCommentsHeading>
            <CommentsWrapper>
              {postInfo?.description && (
                <SingleCommentWrapper>
                  <StyledAvatar alt="avatar" height={36} src={profile?.photo || ''} width={36} />
                  <PostDescription>
                    {profile?.login} {postInfo?.description}
                  </PostDescription>
                </SingleCommentWrapper>
              )}
              {fakeData.map((item, index) => (
                <SingleCommentWrapper key={item.id}>
                  <StyledAvatar alt="avatar" src={item.userImage} />
                  <StyledComment>{`${item.userName + index} ${item.comment}`}</StyledComment>

                  <StyledIcon
                    alt="like"
                    size="small"
                    src={isLiked ? like : likeOutline}
                    onClick={() => setIsLiked(prev => !prev)}
                  />
                </SingleCommentWrapper>
              ))}
            </CommentsWrapper>
            <LikesSection>
              <Wrapper>
                <IconsWrapper>
                  <StyledIcon alt="like" src={likeOutline} />
                  <StyledIcon alt="plain" src={planeOutline} />
                </IconsWrapper>
                <StyledIcon alt="bookmark" src={bookMarkOutline} />
              </Wrapper>
            </LikesSection>
            <AddCommentWrapper>
              <CommentField value={comment} onChange={e => setComment(e.target.value)} />
              <PublishBtn>Publish</PublishBtn>
            </AddCommentWrapper>
          </StyledComents>
        ) : (
          <EditPostContainer>
            <EditPostHeader>
              <h3>Edit Post</h3>
              <StyledIcon alt="close" src={close} onClick={closeDescriptionModal} />
            </EditPostHeader>
            <User>
              <StyledAvatar alt="avatar" height={48} src={profile?.photo || ''} width={48} />
              <StyledUsername>{login}</StyledUsername>
            </User>
            <NewDescriptionWrapper>
              <Text>Add publication descriptions</Text>
              <NewDescription onChange={e => setDescription(e.target.value)}>
                {description}
              </NewDescription>
              <AmountOfChars>{description.length}/500</AmountOfChars>
            </NewDescriptionWrapper>
            <SaveChanges onClick={newDescriptionHandler}>Save Changes</SaveChanges>
          </EditPostContainer>
        )}
      </StyledModalContainer>
    </StyledPostOverlay>
  )
}

export default Post

const NewDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 200px;
`

const Text = styled.p`
  color: #8d9094;
  align-self: flex-start;
`
const AmountOfChars = styled.p`
  color: #8d9094;
  align-self: flex-end;
`

const NewDescription = styled.textarea.attrs({
  maxLength: 500,
})`
  background: #171717;
  color: #fff;
  padding: 0 12px;
  height: 120px;
  resize: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  border: 1px solid #4c4c4c;
`

const SaveChanges = styled.button`
  border-radius: 2px;
  color: white;
  width: 135px;
  height: 36px;
  border: none;
  background: #397df6;
  align-self: flex-end;
  cursor: pointer;
`

const EditPostContainer = styled.div`
  background: #333;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 12px 24px;
`

const EditPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
`

const ModalButton = styled.button`
  border: 1px solid #397df6;
  width: 96px;
  height: 36px;
  color: #397df6;
  background: #333333;
  cursor: pointer;
  &:hover {
    color: white;
    background: #397df6;
  }
`

const CloseModal = styled(Image)`
  position: absolute;
  right: -30px;
  top: -30px;
  cursor: pointer;
`

const LikesSection = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  height: 107px;
  border-bottom: 1px solid #8d9094;
  border-top: 1px solid #8d9094;
`

const IconsWrapper = styled.div`
  display: flex;
  gap: 24px;
`

const NextPhoto = styled(Image)`
  cursor: pointer;
  position: absolute;
  top: 45%;
  right: 10%;
`

const PrevPhoto = styled(Image)`
  cursor: pointer;
  position: absolute;
  top: 45%;
  left: 10%;
`

const EditPost = styled(Image)`
  cursor: pointer;
`

const StyledIcon = styled(Image)<{ size?: string }>`
  width: ${props => (props.size ? '16px' : '24px')};
`

const PostDescription = styled.div``

const PostManagment = styled.div`
  color: #fff;
  width: 137px;
  height: 85px;
  background: #171717;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding-left: 12px;
  position: absolute;
  right: 24px;
  top: 40px;
`

const Operation = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const TypeOfOperation = styled.p`
  padding-left: 12px;
  font-size: 14px;
`

const StyledPostOverlay = styled.div`
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledModalContainer = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 560px;
  max-width: 1000px;
  width: 80vw;
  @media (max-height: 630px) {
    position: absolute;
    top: 20px;
  }
`

const CommentsWrapper = styled.div`
  height: 336px;
  display: flex;
  padding: 19px 0 9px;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const SingleCommentWrapper = styled.div`
  display: flex;
  padding: 0 24px;
  gap: 12px;
`

const StyledImageWrapper = styled.div`
  position: relative;
  background: black;
  max-height: 560px;
`

const StyledUsername = styled.p``

const StyledComment = styled.p`
  text-align: justify;
  word-break: break-all;
`

const StyledPostImage = styled(Image)`
  /* margin-top: 6px; hz pochemy ona yezjaet */
  object-fit: cover;
`

const StyledComents = styled.div`
  display: flex;
  flex-direction: column;
  background: #333;
  height: 100%;
  width: 100%;
`

const StyledCommentsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 12px 24px;
  border-bottom: 1px solid #8d9094;
`

const StyledAvatar = styled(Image)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
`

const AddCommentWrapper = styled(Wrapper)`
  padding: 17px 24px;
  gap: 24px;
`

const CommentField = styled.input.attrs({
  placeholder: 'Add a Comment...',
})`
  background: #4c4c4c;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  background: #333;
  flex-grow: 2;
`

const PublishBtn = styled.button`
  border: none;
  color: #397df6;
  background: #4c4c4c;
`

const User = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`
