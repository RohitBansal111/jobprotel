import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { getCroppedImg } from "./canvasUtils";

const ImageCropperModal = ({
  closeModal,
  showImageCropModal,
  readFile,
  imageSrc,
  setProfileImage,
  setImg
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


  const showCroppedImage = useCallback(async () => {
    // closeModal();
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      // convertToBlob(croppedImage)
      setCroppedImage(croppedImage);
      setProfileImage(croppedImage);
      setImg({personalInfoImg: croppedImage})
      closeModal()
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation,closeModal,setProfileImage,setImg]);

  const convertToBlob = async (base64) => {
    try {
      const base64Response = await fetch(`${base64}`);
      const blob = await base64Response.blob();
      console.log(blob);
      return blob;
    } catch (error) {
      return null;
    }
  };
  
  return (
    <Modal
      open={showImageCropModal}
      center
      onClose={closeModal}
      classNames={{ modal: "medium-size theme-modal" }}
    >
      <div className="normal-react-modal modal-content">
          <div className="modal-header modal-multi-heading">
            <h5 className="modal-title">Crop Profile Image</h5>
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
