import React from 'react';
import Image from "next/image";
import styled from "styled-components";
import { useWindowSize } from 'assets/hooks/useWindowSize';

type PropsType = {
    image: string
    screenWidth: number
    imageWidth: number
}

export const VectorImage: React.FC<PropsType> = ({ image, screenWidth, imageWidth }) => {
    const { width, height } = useWindowSize()
    const imageSize = (width ? (width > screenWidth
        ? imageWidth
        : width - screenWidth + imageWidth) : imageWidth)

    return (
        
            <Image
                width={imageSize}
                src={image}
                alt={'vector-image'} />
        
    );
};

export default VectorImage;



