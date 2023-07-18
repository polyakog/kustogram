import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useWindowSize } from "../hooks/useWindowSize";

type PropsType = {
  image: string;
  screenWidth: number;
  imageWidth: number;
};

export const VectorImage: React.FC<PropsType> = ({ image, screenWidth, imageWidth }) => {
  const { width, height } = useWindowSize();
  const imageSize = width
    ? width > screenWidth
      ? imageWidth
      : width - screenWidth + imageWidth
    : imageWidth;

  return (
    <StyledVectorImage>
      <Image
        // fill
        width={imageSize}
        src={image}
        alt={"vector-image"}
      />
    </StyledVectorImage>
  );
};

const StyledVectorImage = styled.div`
  position: relative;
  //   margin-top: 72px;
  display: flex;
  align-items: center;
  //   width:100%;
  //   max-width: 473px;
`;

export default VectorImage;
