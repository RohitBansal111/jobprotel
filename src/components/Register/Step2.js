import { useState, useEffect, useMemo } from "react";
import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
} from "../renderField";
import { RenderTagField } from "../renderTagField";
import titles from "./register.json";
import validate from "./validator/step2Validator";
import { RenderImageField } from "../file-input";
import * as dropdownServices from "../../services/dropDownServices";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

const interestedArea = [
  { id: "1", text: "react-redux" },
  { id: "2", text: "flutter" },
  { id: "3", text: "react-native" },
  { id: "4", text: "mongoDB" },
  { id: "5", text: "AWS-admin" },
];

const Step2 = ({
  userPersonalInfo,
  nextPage,
  prevPage,
  data,
  next,
  uploadFile,
  setArray,
  countrylist,
  setUserData,
  handleTimezone,
}) => {

  let titleStrings = new LocalizedStrings(titles);
  const [qualificationList, setQualificationList] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [inputField, setInputField] = useState(true);
  const [datetime, setDatetime] = useState(spacetime.now());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleImageChange = (event) => {
    // let image = [...event.target.files];
    uploadFile(event.target.files[0]);
  };

  const handleQualification = (e) => {
    let value = e.target.value;
    // let data = e.target.value
    setUserData({ ...data, qualificationId: value });
    if (value == "other") {
      setInputField(false);
    }
  };

  const SaveStep2 = (values) => {
    userPersonalInfo(values);
    nextPage();
  };

  useEffect(async () => {
    const resp = await dropdownServices.qualificationList();
    setQualificationList(resp.data);
  }, []);

  const handleChangeCountry = async (e) => {
    // console.log(e.target.value);
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  const genderRadio = [
    { id: "14ce6a75-7a2f-426e-a214-96a6a79a95mal", text: "Male" },
    { id: "14ce6a75-7a2f-426e-a214-96a6a79a95fem", text: "Female" },
  ];

  const handleTimeZone = (data) => {
    // console.log(data.label)
    setTimezone(data);
    handleTimezone(data);
  };

  useMemo(() => {
    const timezoneValue = timezone.value ?? timezone;
    setDatetime(datetime.goto(timezoneValue));
  }, [timezone]);

  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Personal Information</h4>
      <div className="form-main">
        <Form
          onSubmit={SaveStep2}
          validate={validate}
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex50">
                  <label htmlFor="gender"> {titleStrings.genderTitle} </label>
                  <div className="radio-button-groupss">
                    {genderRadio &&
                      genderRadio.map((gender) => (
                        <Field
                          label={titleStrings.maleTitle}
                          name="genderId"
                          value={gender.id}
                          component={RenderRadioButtonField}
                          type="radio"
                          defaultValue={next && data ? data.genderId : ""}
                        >
                          {gender.text}
                        </Field>
                      ))}
                  </div>
                </div>
                <div className="form-field flex50">
                  <label>Upload Profile {"\u2728"}</label>
                  <input
                    name="profileImage"
                    // label={titleStrings.uploadPhotoTitle}
                    // component={RenderImageField}
                    accept=".jpg, .jpeg, .png"
                    onClick={() => setArray("")}
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="addressLine1"
                    label={titleStrings.addressTitle}
                    component={renderField}
                    placeholder="Enter Address"
                    type="text"
                    defaultValue={next && data ? data.addressLine1 : ""}
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="addressLine2"
                    label={titleStrings.addressTitle2}
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
                    component={renderField}
                    placeholder="Enter age"
                    type="text"
                    defaultValue={next && data ? data.age : ""}
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="country"
                    label={titleStrings.countryTitle}
                    component={renderSelect}
                    onChange={handleChangeCountry}
                  >
                    <option value="">Select Country</option>
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
                    name="state"
                    label={titleStrings.stateTitle}
                    component={renderSelect}
                    // disabled={stateList && stateList == []}
                  >
                    <option value="">Select State</option>
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
                <div className="form-field flex50">
                  <Field
                    name="PostalCode"
                    label={titleStrings.zipcodeTitle}
                    component={renderField}
                    placeholder="Enter Zip Code"
                    type="text"
                    defaultValue={next && data ? data.PostalCode : ""}
                  />
                </div>
                {/* <div className="form-field flex50"> */}
                {/* <Field
                    name="timezone"
                    label="Time Zone"
                    placeholder="Time zone"
                    component={renderField}
                    type="text"
                    defaultValue={next && data ? data.timezone : ""}
                  /> */}
                {/* </div> */}
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
                  </div>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="qualificationId"
                    label={titleStrings.qualificationTitle}
                    component={inputField ? renderSelect : renderField}
                    onChange={handleQualification}
                    defaultValue={next && data ? data.qualificationId : ""}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {inputField &&
                      qualificationList &&
                      qualificationList.map((qualification) => (
                        <option value={qualification.id} key={qualification.id}>
                          {qualification.name}
                        </option>
                      ))}
                    <option value="Other">Other</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="interests"
                    defaultValue={next && data ? data.interests : ""}
                    label="Interested Area"
                    suggestions={interestedArea}
                    placeholder="Enter Intrested Area"
                    component={RenderTagField}
                  />
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
