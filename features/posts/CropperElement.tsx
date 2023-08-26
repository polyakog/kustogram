import { useRef, useState, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropperElement = ({
  photoFile,
  setSavedImageUrl,
  zoomTo
}: {
  photoFile: File;
  setSavedImageUrl: (image: string) => void;
  zoomTo: number;
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    debugger;
    if (cropperRef.current?.cropper) {
      const cropper = cropperRef.current.cropper;
      cropper.reset();
    }
  }, [zoomTo]);

  const aspectRatio = 9 / 16;
  // const [croppedImg, setCroppedImg] = useState<string>('')

  const cropper = cropperRef?.current?.cropper;
  cropper?.setAspectRatio(aspectRatio);
  cropper?.zoom(zoomTo);
  if (cropper && cropper.getCroppedCanvas()) {
    const imageUrl = cropper.getCroppedCanvas().toDataURL();
    setSavedImageUrl(imageUrl);
  }

  const zoomN = 2;
  const onReady = () => {
    // cropper?.zoom(zoomN)
    if (cropper && cropper.getCroppedCanvas()) {
      const imageUrl = cropper.getCroppedCanvas().toDataURL();
      setSavedImageUrl(imageUrl);
    }
  };

  return (
    <Cropper
      src={URL.createObjectURL(photoFile)}
      style={{
        width: "100%",
        height: "100%"
      }}
      aspectRatio={aspectRatio}
      guides={true}
      // crop={onCrop}
      ref={cropperRef}
      viewMode={3}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false}
      responsive={true}
      // cropBoxMovable={false}
      cropBoxResizable={false}
      toggleDragModeOnDblclick={false}
      dragMode={"move"}
      highlight={false}
      ready={onReady}
      // zoom={onZoom}
    />
  );
};

export default CropperElement;
