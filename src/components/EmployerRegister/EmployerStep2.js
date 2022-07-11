import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField, renderNumberField, renderSelect } from "../renderField";
import titles from "./register.json";
import validate from "./validator/EmployerStep2Validate";
import ImageCropperModal from "../Image-cropper";
import React, { useState, useEffect } from "react";
// import RenderPhoneInput from "../renderPhoneInput";
import * as dropdownServices from "../../services/dropDownServices";
import PhoneInput from "react-phone-number-input";

const EmployerStep2 = ({
  prevPage,
  EmployerCompleteInfo,
  employer,
  initialEmpStep2,
  countrylist,
}) => {
  let titleStrings = new LocalizedStrings(titles);
  const [modal, setModal] = useState(false);
  const [logoImage, setLogoImage] = useState([]);
  const [err, setErr] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [stateList, setStateList] = useState([]);
  const [phoneNumberFlag, setphoneNumberFlag] = useState();

  const [img, setImg] = useState({
    personalInfoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files && event.target.files.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  useEffect(async () => {
    const resp = await dropdownServices.stateList(employer.countryId);
    setStateList(resp.data);
  }, [employer.countryId]);

  useEffect(async () => {
    if (employer.logoImageUrl) {
      setImg({ personalInfoImg: employer.logoImageUrl.personalInfoImg });
      setLogoImage(employer.logoUrl);
    }
  }, []);

  const SaveStep2 = (values) => {
    console.log("called", values);
    // if(validation ()){
      EmployerCompleteInfo(values);
    // }
  };

  const instanceSaveStep2 = (values) => {
    console.log(values);
    initialEmpStep2({
      ...values,
      logoImageUrl: img,
      logoUrl: logoImage,
      companyPhone: phoneNumberFlag,
    });
    prevPage();
  };

  const validation = () => {
    let isValid = true;
    let error = {};
    if (!img) {
      error.logo = "Profile Image is Required";
      isValid = false;
    }
    setErr(error);
    return isValid;
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (employer.companyPhone && employer.companyPhone !== "") {
      setphoneNumberFlag(employer.companyPhone);
    }
  }, []);

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
                  <div className="field-render-main">
                    <label>Company Phone Number</label>
                    <PhoneInput
                      name="companyPhone"
                      placeholder="Enter Company Phone Number"
                      value={phoneNumberFlag}
                      onChange={setphoneNumberFlag}
                    />
                  </div>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="countryId"
                    label={titleStrings.countryTitle}
                    component={renderSelect}
                    onChange={handleChangeCountry}
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {countrylist &&
                      countrylist.map((country) => (
                        <option value={country.id} key={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="stateId"
                    label={titleStrings.stateTitle}
                    component={renderSelect}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {stateList &&
                      stateList.map((state) => (
                        <option value={state.id} key={state.id}>
                          {state.stateName}
                        </option>
                      ))}
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
                  />
                </div>
                <div className="form-field flex100">
                  <Field
                    name="recruitingManagerName"
                    label={titleStrings.managerNameTitle}
                    component={renderField}
                    placeholder="Enter recuriting manager name"
                    type="text"
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
                  onClick={() => SaveStep2(values)}
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
