import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField, renderNumberField, renderSelect } from "../renderField";
import titles from "./register.json";
import validate from "./validator/EmployerStep2Validate";
import ImageCropperModal from "../Image-cropper";
import React, { useState,useEffect } from "react";
import RenderPhoneInput from "../renderPhoneInput";

const EmployerStep2 = ({ 
  prevPage,
  EmployerCompleteInfo,
  uploadLogoFile,
  employer,
  next,
  initialEmpStep2,
}) => {
  let titleStrings = new LocalizedStrings(titles);
  const [modal, setModal] = useState(false);
  const [logoImage, setLogoImage] = useState([]);
  const [err, setErr] = useState([]);
  const [cropperFinalMedia, setcropperFinalMedia] = useState(null);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [userProfileAvtar, setUserProfileAvtar] = useState({});
  const [logo, setLogo] = useState("");
  const [img, setImg] = useState({
    personalInfoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const validation = () => {
    let isValid = true;
    let error = {};
    if (!logo) {
      error.logo = "Profile Image is Required";
      isValid = false;
    }
    setErr(error);
    return isValid;
  };

  const handleImageChange = (event) => {
    setModal(true)
    if (event.target.files && event.target.files.length > 0) {
      //uploadLogoFile(event.target.files[0]);
      //setLogo(event.target.files[0]);
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  useEffect(async () => {
    if(employer.logoImageUrl)
    {  
      setImg({personalInfoImg: employer.logoImageUrl.personalInfoImg})
      setLogoImage(employer.logoUrl)
    }
    
  }, []);

  const SaveStep2 = (values) => {
    if (validation()) {
      EmployerCompleteInfo(values);
    }
  };

  const instanceSaveStep2 = (values) => {
    
    initialEmpStep2({
      ...values,
      logoImageUrl:img,
      logoUrl: logoImage
    });
    prevPage();
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const closeModal=()=>{
    console.log("inclose")
    setModal(false)
  }
  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Company Information</h4>
      <ImageCropperModal
        closeModal={closeModal}
        showImageCropModal={modal}
        readFile={readFile}
        imageSrc={img.personalInfoImg}
        setProfileImage={setProfileImage}
        setImg={setImg}
      />
        <div className="form-main">
          <ImageCropperModal
            closeModal={closeModal}
            showImageCropModal={modal}
            readFile={readFile}
            imageSrc={img.personalInfoImg}
            setProfileImage={setLogoImage}
            setImg={setImg}
        />
        <Form onSubmit={SaveStep2} validate={validate} initialValues={employer}>
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex100">
                  <div className="uploadImageSection mb-2">
                    <div className="file-label-image">
                      <label>Upload Profile</label>
                      <div className="file-upload">
                        <input
                          name="logoUrl"
                          label={titleStrings.companyLogoTitle}
                          accept=".jpg, .jpeg, .png"
                          onChange={handleImageChange}
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="aws-placeholder image4">
                      <img
                        src={img.personalInfoImg}
                        className="img-aws"
                        alt="user"
                        width={100}
                        height={100}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div style={{ color: "red" }}>{err && err.logo}</div>
                </div>
                <div className="form-field flex50 mb-2">
                  <Field
                    name="companyPhone"
                    label={titleStrings.companyPhoneNoTitle}
                    component={RenderPhoneInput}
                    placeholder="Enter Company Phone Number"
                    type="text"
                    pattern="[0-9]*"
                    defaultValue={next && employer ? employer.companyPhone : ""}
                  />
                 
                </div>
                <div className="form-field flex50">
                  <Field
                    name="countryId"
                    label={titleStrings.countryTitle}
                    component={renderSelect}
                  >
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>USA</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="stateId"
                    label={titleStrings.stateTitle}
                    component={renderSelect}
                  >
                    <option value="" disabled>Select State</option>
                    <option>Haryana</option>
                    <option>Punjab</option>
                    <option>Alaska</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="city"
                    label={titleStrings.cityTitle}
                    component={renderField}
                    placeholder="Enter City"
                    type="text"
                  ></Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="address"
                    label={titleStrings.companyAddressTitle}
                    component={renderField}
                    placeholder="Enter company address"
                    type="text"
                    defaultValue={next && employer ? employer.address : ""}
                  />
                </div>
                <div className="form-field flex100">
                  <Field
                    name="recruitingManagerName"
                    label={titleStrings.managerNameTitle}
                    component={renderField}
                    placeholder="Enter recuriting manager name"
                    type="text"
                    defaultValue={
                      next && employer ? employer.recruitingManagerName : ""
                    }
                  />
                </div>
              </div>
              <div className="form-action">
                <button
                  type="button"
                  onClick={() => instanceSaveStep2(values)}
                  className="btn btn-secondary prev-btn text-white text-center"
                >
                  {" "}
                  {titleStrings.prevTitle}{" "}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary next-btn text-white text-center"
                >
                  {" "}
                  {titleStrings.nextTitle}{" "}
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EmployerStep2;
