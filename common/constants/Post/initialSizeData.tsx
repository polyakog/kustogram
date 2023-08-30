/* eslint-disable no-magic-numbers */
import addPhotoGrey from 'public/img/icons/image-outline-grey.svg'
import addPhoto from 'public/img/icons/image-outline.svg'
import resize11 from 'public/img/icons/resize11.svg'
import resize11a from 'public/img/icons/resize11a.svg'
import resize169 from 'public/img/icons/resize169.svg'
import resize169a from 'public/img/icons/resize169a.svg'
import resize45 from 'public/img/icons/resize45.svg'
import resize45a from 'public/img/icons/resize45a.svg'

export const initSizeData = [
  {
    size: 'original',
    alt: 'original size',
    src: addPhotoGrey,
    selected: false,
    srcActive: addPhoto,
    setRatio: 1,
    setIsObjectFit: true,
  },
  {
    size: '1:1',
    alt: '1:1',
    src: resize11,
    selected: true,
    srcActive: resize11a,
    setRatio: 1 / 1,
    setIsObjectFit: false,
  },
  {
    size: '4:5',
    alt: '4:5',
    src: resize45,
    selected: false,
    srcActive: resize45a,
    setRatio: 4 / 5,
    setIsObjectFit: false,
  },
  {
    size: '16:9',
    alt: '16:9',
    src: resize169,
    selected: false,
    srcActive: resize169a,
    setRatio: 16 / 9,
    setIsObjectFit: false,
  },
]

export type SizeDataType = (typeof initSizeData)[number]
