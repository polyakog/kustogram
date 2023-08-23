import { styled } from "styled-components";
import Image from "next/image";

const SmallPhoto = ({ photo, removePhotoFromList, index }: SmallProtoProps) => {
  return (
    <>
      <Image
        src={photo}
        width={90}
        height={90}
        alt="saved photo"
        style={{ objectFit: "contain", left: "30px", top: "10px", padding: "5px 0" }}
      />
      <StyleDeletePhoto
        onClick={() => {
          removePhotoFromList(index);
        }}
      >
        <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close" />
      </StyleDeletePhoto>
    </>
  );
};

export default SmallPhoto;

// Типы
type SmallProtoProps = {
  photo: string;
  removePhotoFromList: (index: number) => void;
  index: number;
};

// Стили
const StyleDeletePhoto = styled.button`
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  right: 21px;
  bottom: 28px;
  cursor: pointer;
`;
