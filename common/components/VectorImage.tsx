import React from 'react'

import Image from 'next/image'
import styled from 'styled-components'

import { useWindowSize } from '../hooks/useWindowSize'

type PropsType = {
  alt?: string
  image: string
  imageHeight?: number
  imageWidth: number
  screenWidth: number
}

export const VectorImage: React.FC<PropsType> = ({
  image,
  screenWidth,
  imageWidth,
  imageHeight,
  alt = 'vector-image',
}) => {
  const { width } = useWindowSize()
  let imageSize

  if (width) {
    if (width > screenWidth) {
      imageSize = imageWidth
    } else {
      imageSize = width - screenWidth + imageWidth
    }
  } else {
    imageSize = imageWidth
  }
  // const imageSize = width
  //   ? width > screenWidth
  //     ? imageWidth
  //     : width - screenWidth + imageWidth
  //   : imageWidth

  return (
    <StyledVectorImage>
      <Image alt={alt} height={imageHeight} src={image} width={imageSize} />
    </StyledVectorImage>
  )
}

const StyledVectorImage = styled.div`
  position: relative;
  //   margin-top: 72px;
  display: flex;
  align-items: center;
  //   width:100%;
  //   max-width: 473px;
`

export default VectorImage
