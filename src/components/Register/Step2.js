import React, { useState, useEffect, useMemo } from "react";
import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
  renderNumberField,
} from "../renderField";
import { RenderTagField } from "../renderTagField";
import titles from "./register.json";
import validate from "./validator/step2Validator";
import { RenderImageField } from "../file-input";
import * as dropdownServices from "../../services/dropDownServices";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import ImageCropperModal from "../Image-cropper";

const Step2 = ({
  userPersonalInfo, 
  nextPage,
  prevPage,
  data,
  next,
  countrylist,
  genderList,
  skillslist,
}) => {
  let titleStrings = new LocalizedStrings(titles);
  const [qualificationList, setQualificationList] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [qualificationId, setQualificationId] = useState("");
  const [inputField, setInputField] = useState(false);
  const [modal, setModal] = useState(false);
  const [datetime, setDatetime] = useState(spacetime.now());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [err, setErr] = useState([]);
  const [img, setImg] = useState({
    personalInfoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const validation = () => {
    let isValid = true;
    let error = {};
    if (!data.profileImage) {
      error.profileImage = "Profile Image is Required";
      isValid = false;
    }
    setErr(error);
    return isValid;
  };

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files && event.target.files.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const handleQualification = (e) => {
    let value = e.target.value;
    setQualificationId(value);
    if (value == "Other") {
      setInputField(true);
    } else {
      setInputField(false);
    }
  };

  const SaveStep2 = (values) => {
    console.log("values", values);
    if (validation) {
      userPersonalInfo({
        ...values,
        timezone: timezone,
        qualificationId: qualificationId,
        profileImageUrl: img,
        profileImage: profileImage,
      });
      nextPage();
    }
  };

  useEffect(async () => {
    const resp = await dropdownServices.qualificationList();
    setQualificationList(resp.data);
    setQualificationId(data.qualificationId && data.qualificationId);
    console.log("data.profileImageUrl-9", data.profileImageUrl);
    if (data.profileImageUrl) {
      setImg({ personalInfoImg: data.profileImageUrl.personalInfoImg });
      setProfileImage(data.profileImage);
    }
  }, []);

  useEffect(async () => {
    const resp = await dropdownServices.stateList(data.countryId);
    setStateList(resp.data);
  }, [data.countryId]);

  const handleChangeCountry = async (e) => {
    // console.log(e.target.value);
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  const handleTimeZone = (data) => {
    console.log(data);
    setTimezone(data.value);
    //handleTimezoneData(data.value);
  };

  useMemo(() => {
    const timezoneValue = timezone.value ?? timezone;
    setDatetime(datetime.goto(timezoneValue));
  }, [timezone]);

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

  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Personal Information</h4>
      <div className="form-main">
        <ImageCropperModal
          closeModal={closeModal}
          showImageCropModal={modal}
          readFile={readFile}
          imageSrc={img.personalInfoImg}
          setProfileImage={setProfileImage}
          setImg={setImg}
        />
        <Form initialValues={data} onSubmit={SaveStep2} validate={validate}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex50">
                  <label htmlFor="gender"> {titleStrings.genderTitle} </label>
                  <div className="radio-button-groupss">
                    {genderList &&
                      genderList.length > 0 &&
                      genderList.map((gender) => (
                        <Field
                          label={titleStrings.maleTitle}
                          name="genderId"
                          value={gender.id}
                          component={RenderRadioButtonField}
                          type="radio"
                          defaultValue={next && data ? data.genderId : ""}
                        >
                          {gender.name}
                        </Field>
                      ))}
                  </div>
                </div>
                <div className="form-field flex50">
                  <label>Upload Profile {"\u2728"}</label>
                  <input
                    name="profileImage"
                    id="profileImage"
                    label={titleStrings.uploadPhotoTitle}
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <div style={{ color: "red" }}>{err && err.profileImage}</div>
                  <div className="aws-placeholder image4">
                    <img
                      src={img.personalInfoImg}
                      className="img-aws"
                      alt="avtar"
                      width={100}
                      height={100}
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="address"
                    label={titleStrings.addressTitle}
                    component={renderField}
                    placeholder="Enter Address"
                    type="text"
                    defaultValue={next && data ? data.address : ""}
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="addressLine1"
                    label={titleStrings.addressTitleLine1}
                    component={renderField}
                    placeholder="Enter Address Line 1"
                    type="text"
                    defaultValue={next && data ? data.addressLine1 : ""}
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="addressLine2"
                    label={titleStrings.addressTitleLine2}
                    component={renderField}
                    placeholder="Enter Address Line 2"
                    type="text"
                    defaultValue={next && data ? data.addressLine2 : ""}
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="age"
                    label={titleStrings.ageTitle}
                    component={renderNumberField}
                    placeholder="Enter Age"
                    type="text"
                    pattern="[0-9]*"
                    defaultValue={next && data ? data.age : ""}
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="countryId"
                    label={titleStrings.countryTitle}
                    component={renderSelect}
                    onChange={handleChangeCountry}
                    defaultValue={next && data ? data.countryId : ""}
                  >
                    <option value="" disabled>Select Country</option>
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
                    defaultValue={next && data ? data.stateId : ""}
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
                    defaultValue={next && data ? data.city : ""}
                  ></Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="PostalCode"
                    label={titleStrings.zipcodeTitle}
                    component={renderNumberField}
                    placeholder="Enter Zip Code"
                    type="text"
                    pattern="[0-9]*"
                    defaultValue={next && data ? data.PostalCode : ""}
                  />
                </div>

                <div className="form-field flex100">
                  <div className="timezone--wrapper">
                    <label>Time Zone</label>
                    <TimezoneSelect
                      name="timezone"
                      value={timezone}
                      onChange={handleTimeZone}
                      labelStyle="Time Zone"
                      timezones={{
                        ...allTimezones,
                        "America/Lima": "Pittsburgh",
                        "Europe/Berlin": "Frankfurt",
                      }}
                    />
                    <div style={{ color: "red" }}>{err && err.timeZone}</div>
                  </div>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="qualificationId"
                    label={titleStrings.qualificationTitle}
                    component={renderSelect}
                    onChange={handleQualification}
                    defaultValue={next && data ? data.qualificationId : ""}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {qualificationList &&
                      qualificationList.map((qualification) => (
                        <option value={qualification.id} key={qualification.id}>
                          {qualification.name}
                        </option>
                      ))}
                    <option value="Other">Other</option>
                  </Field>
                </div>
                {inputField && (
                  <div className="form-field flex100">
                    <Field
                      name="qualification"
                      label={titleStrings.qualificationTitle}
                      component={renderField}
                      defaultValue={next && data ? data.qualification : ""}
                    />
                  </div>
                )}
                <div className="form-field flex100">
                  <Field
                    name="interests"
                    defaultValue={next && data ? data.interests : ""}
                    label="Interested Area"
                    suggestions={skillslist}
                    placeholder="Enter Intrested Area"
                    component={RenderTagField}
                  />
                  <div style={{ color: "red" }}>{err && err.interests}</div>
                </div>
              </div>
              <div className="form-action">
                <button
                  type="button"
                  onClick={() => prevPage()}
                  className="btn btn-secondary prev-btn text-white text-center"
                >
                  {titleStrings.prevTitle}{" "}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary next-btn text-white text-center"
                >
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

export default Step2;
