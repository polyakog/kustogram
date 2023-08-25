import styled from "styled-components";
import { baseTheme } from "../../styles/styledComponents/theme";
import SmallPhoto from "./SmallPhoto";
import plusPhoto from "../../public/img/icons/plus-circle-outline.svg";
import fullScreen from "../../public/img/icons/expand-outline.svg";
import savePhoto from "../../public/img/icons/save-photos.svg";
import { PhotoType } from "./PostCreationModal";
import Image from "next/image";

type AddPhotoElementType = {
  photoPost: PhotoType[];
  handleAddPhotoButton: () => void;
  setPhotoPost: (photoPost: PhotoType[]) => void;
  handleSave: () => Promise<void>;
};
const AddPhotoElement = ({
  photoPost,
  handleAddPhotoButton,
  setPhotoPost,
  handleSave
}: AddPhotoElementType) => {
  // Удаление изображения из массива
  const removePhotoFromList = (index: number) => {
    const newPhotoList = [];
    for (let i = 0; i < photoPost.length; i++) {
      if (index === i) {
        continue;
      } else {
        newPhotoList.push(photoPost[i]);
      }
    }
    setPhotoPost(newPhotoList);
  };
  return (
    <StyledAddBlock>
      <StyledPhotoPost id={"scrollable-container"}>
        {photoPost.map((photo, index) => (
          <SmallPhoto
            photo={photo.photoUrl}
            key={index}
            index={index}
            removePhotoFromList={removePhotoFromList}
          />
        ))}
      </StyledPhotoPost>
      <div onClick={handleAddPhotoButton} style={{ cursor: "pointer" }}>
        <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen} />
      </div>
      <div onClick={handleSave} style={{ cursor: photoPost.length < 10 ? "pointer" : "default" }}>
        <StyledIconSavePhoto src={savePhoto} alt={savePhoto} />
      </div>
    </StyledAddBlock>
  );
};

export default AddPhotoElement;

export const StyledAddBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 106px;
  background: ${baseTheme.colors.dark["300"]};
  bottom: 60px;
  right: 18px;
  z-index: 2;
  opacity: 0.7;
`;

const StyledPhotoPost = styled.div`
  position: absolute;
  width: 152px;
  height: 106px;
  background: ${baseTheme.colors.dark["300"]};
  display: flex;
  overflow-x: scroll;
  z-index: 100;
`;

const StyledIconPlusPhoto = styled(Image)`
  position: absolute;
  width: 40px;
  background: none;
  margin: 5px 5px;
  right: 0;
`;

const StyledIconSavePhoto = styled(StyledIconPlusPhoto)`
  top: 43px;

  &:hover {
    fill: red;
  }
`;
