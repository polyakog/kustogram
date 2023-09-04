import { useState, useCallback } from 'react'

import Cropper from 'react-easy-crop'

const EasyCroppe = ({
  photoFileURL,
  zoomTo,
  aspectRatio,
  isObjectFit,
  setZoom,
  setCroppedAreaPixels,
}: {
  aspectRatio: number
  isObjectFit: boolean
  photoFileURL: string | undefined
  setCroppedAreaPixels: (image: CropArgType | null) => void
  setZoom: (zoomTo: number) => void
  zoomTo: number
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })

  let objectFit: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover' = 'cover'

  if (isObjectFit) {
    objectFit = 'contain'
  }
  const onCropComplete = useCallback((croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <Cropper
      aspect={aspectRatio}
      crop={crop}
      image={photoFileURL}
      objectFit={objectFit}
      zoom={zoomTo}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}

export default EasyCroppe

export type CropArgType = {
  // width of the cropped area
  height: number
  width: number
  x: number
  // x/y are the coordinates of the top/left corner of the cropped area
  y: number // height of the cropped area
}
