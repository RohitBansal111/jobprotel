import { Modal } from "react-responsive-modal";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { getCroppedImg } from "./canvasUtils";

const ImageCropperModal = ({
  setshowImageCropModal,
  showImageCropModal,
  readFile,
  imageSrc,
  setcropperFinalMedia,
  uploadCrop,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCloseModal = setshowImageCropModal(false)

  const showCroppedImage = useCallback(async () => {
    setshowImageCropModal(false);
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setcropperFinalMedia(croppedImage);
      uploadCrop(croppedImage);
      setshowImageCropModal(false);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation, uploadCrop]);

  return (
    <Modal
      open={showImageCropModal}
      center
      onClose={onCloseModal}
      classNames={{ modal: "medium-size theme-modal" }}
    >
      <div className="normal-react-modal modal-content">
          <div className="modal-header modal-multi-heading">
            <h5 class="modal-title">Crop Profile Image</h5>
          </div>
          <div className="modal-body">
          <div className="image-cropper-wrapper">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="image-cropper-actions">
            <div className="action-sliders">
              <p> Zoom </p>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className="action-sliders">
              <p> Rotation </p>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <button onClick={showCroppedImage} className="btn btn-primary">
              Show Result
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropperModal;
