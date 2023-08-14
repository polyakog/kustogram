import AvatarEditor from "react-avatar-editor";
import { styled } from "styled-components";
import Image from "next/image";

const SmallPhoto = ({ photo, removePhotoFromList, index }: SmallProtoProps) => {
  return (
    <>
      <AvatarEditor // width и height задается в styled component с учетом border
        image={photo}
        style={{
          width: "90px",
          height: "90px",
          left: "30px",
          top: "10px"
        }}
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

type SmallProtoProps = {
  photo: string;
  removePhotoFromList: (index: number) => void;
  index: number;
};

const StyleDeletePhoto = styled.button`
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  right: 21px;
  bottom: 32px;
`;
