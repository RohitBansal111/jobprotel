import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { getInstance } from '../redux/actions/axiosFactory';
const axiosInstance = getInstance();

export const RenderImageField = ({
  input: { name, value, onChange },
  label,
  uploadLabel,
  type,
  meta: { touched, error, warning },
  token,
  cssClass,
  imageWidth,
  isPlaceHolderImage = true,
  className,
  fileType,
}) => {
  let [progress, setProgress] = useState(null);
  let fileSize;
  // let [fileName, setFileName] = useState(null);
  const onUpload = (event) => {
    //  onChange(event.target.files[0]);
    fileSize = event.target.files[0] && event.target.files[0].size;
    // setFileName(fileSize = event.target.files[0] && event.target.files[0].name);
    uploadFiles(event.target.files[0]);
  };
  const uploadFiles = (file) => {
    let formData = new FormData();
    formData.append('image', file);
    return new Promise(function (resolve, reject) {
      axiosInstance
        .post('/file/uploadfile', formData, {
          headers: {
            'Content-Type': 'image/*',
            authorization: 'Bearer ' + token,
          },
          onUploadProgress: function (progressEvent) {
            setProgress((progressEvent.loaded / progressEvent.total) * 100);
          },
        })
        .then((response) => {
          let file = response.data;
          file.fileSize = fileSize;
          //let image = { publicId: path.public_id, imageUrl: path.path }
          onChange(file);
          setProgress(null);
          // onUploadSuccess(response.data.path);
          resolve(response.data);
        })
        .catch((err) => {
          error = err.message;
          reject(err);
        });
    });
  };
  return (
    <div className={`fileFilledViewer d-block ${className} ${touched && error ? "error-border" : ""}`} >
      {/* <label> {fileName} </label> */}
      
        <div className="fileUpload onlyImageFile ml-2" role="button">
          <label> {label} </label>
          <div className="uploadImageSection mb-2">
          {isPlaceHolderImage && (
          <div className={!value ? "awsFileOption fileUploadPlace" : "uploadedFile-section awsFileOption"}>
            <div className="aws-placeholder image4">
              {value && value.Location && (
                <img
                  src={value && value.Location}
                  className="img-aws"
                  alt={name}
                  width={40}
                  height={40}
                  layout="fill"
                />
              )}
            </div>
          </div>)}
            <div className="upload-bttn-placeholder">
                <button
                  type="button"
                  className="btn themesecondarybackground fileUpload"
                >
                  {uploadLabel || 'Upload File'}
                </button>
                <input
                  name={name}
                  onChange={onUpload}
                  id={name}
                  accept={fileType || '.jpg, .jpeg, .png'}
                  type="file"
                ></input>
            </div>
          </div>
          {touched && error && <span className="error">{error}</span>}
          {progress && (
            <div className="upload-progress">
              <progress value={progress} max="100"></progress>
              <label>{progress}%</label>
            </div>
          )}
        </div>
    </div>
  );
};

RenderImageField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  uploadlabel: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  onUploadSuccess: PropTypes.func,
  touched: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
  token: PropTypes.string,
  cssClass: PropTypes.string,
};