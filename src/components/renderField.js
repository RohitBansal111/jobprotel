import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { getInstance } from "../redux/actions/axiosFactory";
import moment from "moment";
const axiosInstance = getInstance();

export const renderRangeField = ({
  input,
  label,
  onChange,
  name,
  children,
  placeholder,
  value,
  type,
  min,
  max,
  step,
  meta: { touched, error },
}) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      let { name, value } = e.target;
      let data = e.target.validity.valid ? value : undefined;
      if (data !== undefined) {
        input.onChange(e);
        onChange && onChange(e);
      }
    },
  };
  return (
    <div className="field-render-main">
      <label htmlFor={`label${label}`}>{label}</label>
      <div className="field-inner-group">
        <input
          {...inputProps}
          placeholder={placeholder}
          id={`label${label}`}
          className="form-control"
          min={min}
          max={max}
          step={step}
        />
        {children}
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export const renderNumberField = ({
  input,
  label,
  onChange,
  name,
  children,
  placeholder,
  value,
  type,
  meta: { touched, error },
  pattern,
  // min,
}) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      let { name, value } = e.target;
      let data = e.target.validity.valid ? value : undefined;
      if (data !== undefined) {
        input.onChange(e);
        onChange && onChange(e);
      }
    },
  };
  return (
    <div className="field-render-main">
      <label htmlFor={`label${label}`}>{label}</label>
      <div className="field-inner-group">
        <input
          {...inputProps}
          placeholder={placeholder}
          id={`label${label}`}
          className="form-control"
          pattern={pattern}
          // min={min}
        />
        {children}
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export const renderField = ({
  input,
  label,
  onChange,
  name,
  children,
  placeholder,
  value,
  type,
  meta: { touched, error },
  pattern,
  disabled=false,
  min
}) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      input.onChange(e);
      onChange && onChange(e);
    },
  };
 
  return (
    <div className="field-render-main">
      <label htmlFor={`label${label}`}>{label}</label>
      <div className="field-inner-group">
        <input
          {...inputProps}
          placeholder={placeholder}
          id={`label${label}`}
          className="form-control"
          disabled={disabled}
          min={min}
          // max={placeholder=='Enter end date'?moment(new Date()).format('YYYY-MM-DD'):''}
        />
        {children}
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export const renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  onError,
  onChange,
}) => {
  const inputProps = {
    ...input,
    onClick: (e) => {
      input.onChange(e);
      onChange && onChange(e);
    },
  };
  return (
    <div
      className={
        "field-render-main " +
        (touched ? (error ? "is-danger" : "is-success") : "")
      }
    >
      <label>{label}</label>
      <div className="field-inner-group render-select">
        <select {...inputProps} className="form-control">
          {children}
        </select>
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

renderSelect.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.any,
  meta: PropTypes.object,
};

export const renderMultiSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  onError,
}) => (
  <div
    className={
      "field-render-main " +
      (touched ? (error ? "is-danger" : "is-success") : "")
    }
  >
    <label>{label}</label>
    <div className="field-inner-group">
      <select multiple {...input} className="form-control">
        {children}
      </select>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

renderMultiSelect.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.any,
  meta: PropTypes.object,
};

export const RenderRadioButtonField = ({
  input,
  label,
  onChange,
  name,
  children,
  checked,
  type,
  optionLength,
  currentIndex,
  meta: { touched, error }
}) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      input.onChange(e);
      onChange && onChange(e);
    },
  };

  return (
    <>
      <div className="field-render-main render-radio">
        <label className="radio-group">
          <input type="radio" checked {...inputProps} />
          {children}
          <span className="radiobtn"></span>
        </label>
      </div>
      {touched && error && currentIndex == 0 ? (
        <span class="error">{error}</span>
      ) : null}
    </>
  );
};

export const rendercheckbox = ({
  input,
  label,
  name,
  type,
  checked,
  meta: { touched, error, warning },
  onError,
}) => {
  return (
    <div className="field-render-main">
      <label className="cursor-pointer">
        <input
          type="checkbox"
          {...input}
          name={name}
          className="checkboxInput"
        />
        {touched && error ? (onError ? onError(true) : null) : null}
        {touched && !error ? (onError ? onError(false) : null) : null}
        &nbsp; {label}
      </label>
    </div>
  );
};

export const renderTextareaField = ({
  input,
  label,
  name,
  values,
  type,
  meta: { touched, error },
}) => (
  <div className="field-render-main">
    <label>{label}</label>
    <div className="field-inner-group">
      <textarea
        name={label}
        {...input}
        placeholder={`Enter ${label}`}
        type={type}
        className="form-control"
      ></textarea>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

export const RenderFileUploadField = ({
  input: { name, value, onChange },
  label,
  uploadlabel,
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
    // uploadFiles(event.target.files[0]);
  };
  const uploadFiles = (file) => {
    let formData = new FormData();
    formData.append("image", file);
    return new Promise(function (resolve, reject) {
      axiosInstance
        .post("/file/uploadfile", formData, {
          headers: {
            "Content-Type": "image/*",
            authorization: "Bearer " + token,
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
    <div
      className={`fileFilledViewer d-block ${className} ${
        touched && error ? "error-border" : ""
      }`}
    >
      <div className="uploadImageSection mb-2">
        <label> {label} </label>
        <div className="resume-upload">
          <button
            type="button"
            className="btn themesecondarybackground fileUpload"
          >
            <i className="fa fa-upload me-3"></i> {uploadlabel || "Upload File"}
          </button>
          <input
            name={name}
            onChange={onUpload}
            id={name}
            accept={fileType || ".jpg, .jpeg, .png"}
            type="file"
          ></input>
        </div>
        {touched && error && <span className="error">{error}</span>}
        {progress && (
          <div className="upload-progress">
            <progress value={progress} max="100"></progress>
            <label>{progress}%</label>
          </div>
        )}
        {isPlaceHolderImage && (
          <div
            className={
              !value
                ? "awsFileOption fileUploadPlace"
                : "uploadedFile-section awsFileOption"
            }
          >
            {/* <i className="fa fa-user"></i>
            <i className="fa fa-camera"></i> */}
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
          </div>
        )}
      </div>
    </div>
  );
};

RenderFileUploadField.propTypes = {
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
