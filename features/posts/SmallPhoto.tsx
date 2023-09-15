import Image from 'next/image'
import { styled } from 'styled-components'

const SmallPhoto = ({ photo, removePhotoFromList, index }: SmallProtoProps) => {
  return (
    <>
      <Image
        alt="saved photo"
        height={90}
        src={photo}
        style={{ objectFit: 'contain', left: '30px', top: '10px', padding: '5px 0' }}
        width={90}
      />
      <StyleDeletePhoto
        onClick={() => {
          removePhotoFromList(index)
        }}
      >
        <Image alt="close" height={24} src="/img/icons/close_white.svg" width={24} priority />
      </StyleDeletePhoto>
    </>
  )
}

export default SmallPhoto

// Типы
type SmallProtoProps = {
  index: number
  photo: string
  removePhotoFromList: (index: number) => void
}

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
`
