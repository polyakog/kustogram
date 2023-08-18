import { ImageToolModal } from "common/hoc/ImageToolModal";
import { useState } from "react";
import { styled } from "styled-components";
import { PhotoType } from "./PostCreationModal";
import { useCreatePostMutation } from "assets/store/api/posts/postsApi";

const PostDescriptionModal = ({
  handleBackToFilters,
  photoPost,
  handleModalClose
}: {
  handleBackToFilters: (photoPost: PhotoType[]) => void;
  photoPost: PhotoType[];
  handleModalClose: () => void;
}) => {
  const [photo, setPhoto] = useState(photoPost[0]);
  const [createPostHandler] = useCreatePostMutation();
  const [description, setDescription] = useState("");

  const handleBack = () => {
    handleBackToFilters(photoPost);
  };

  const handlePublishButton = async () => {
    const formData = new FormData();
    for (const photo of photoPost) {
      const result = await fetch(photo.photoUrlWithFilter);
      const blob = await result.blob();
      const file = new File([blob], "avatar", { type: "image/png" });

      // преобразование file в FormData
      formData.append("posts", file as File);
    }
    formData.append("description", description);

    createPostHandler(formData);
  };

  return (
    <>
      <ImageToolModal
        handleModalClose={handleModalClose}
        photoPost={photoPost}
        handleBack={handleBack}
        title="Publication"
        setPhoto={setPhoto}
        photo={photo}
        nextStep="Publish"
        handleNextStepButton={handlePublishButton}
      >
        <StyledDescriptionContainer>
          <StyledTitle>Add publication descriptions</StyledTitle>
          <StyledDescription onChange={(e) => setDescription(e.target.value)}>
            {description}
          </StyledDescription>
          <StyledDescriptionLimit>{description.length}/500</StyledDescriptionLimit>
        </StyledDescriptionContainer>
      </ImageToolModal>
    </>
  );
};

export default PostDescriptionModal;

const StyledDescriptionContainer = styled.div`
  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  overflow: scroll;

  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 14px;
  color: #8d9094;
`;

const StyledDescription = styled.textarea.attrs({
  maxLength: 500
})`
  width: 95%;
  background: #171717;
  border: 1px solid #4c4c4c;
  color: #8d9094;
  height: 120px;
  word-break: break-all;
  padding: 10px;
`;

const StyledDescriptionLimit = styled.p`
  color: #8d9094;
  align-self: flex-end;
  padding-right: 5%;
  font-size: 12px;
`;
