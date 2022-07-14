import { Field, Form } from "react-final-form";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/profile-img.jpg";
import ConnectIcon from "./../../assets/icons/connect.png";
import badgeCrossIcon from "./../../assets/icons/badge-closeicon.png";
import validate from "./validator/profileValidate";
import {
  renderField,
  RenderRadioButtonField,
  RenderFileUploadField,
  renderSelect,
} from "./../../components/renderField";
import { RenderImageField } from "../../components/file-input";
import { RenderTagField } from "../../components/renderTagField";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as studentServices from "../../services/studentServices";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import * as dropdownServices from "../../services/dropDownServices";
import ImageCropperModal from "../../components/Image-cropper";

const EditProfile = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentProfilePic, setStudentProfilePic] = useState("");
  const [studentResume, setStudentResume] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [countrylist, setCountrylist] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [collegeList, setCollegelist] = useState([]);
  const [genderList, setGenderlist] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [modal, setModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [img, setImg] = useState({
    personalInfoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const authData = useSelector((state) => state.auth.user);

  const getStudentData = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      const response = resp.data.data.result;
      setStudentData(response);
      setImg({
        ...img,
        personalInfoImg: `${process.env.REACT_APP_IMAGE_API_URL}${response.pictureUrl}`,
      });

      setStudentResume(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.resumeFilePath}`
      );

      if (response && response.interests) {
        let interest = response.interests && response.interests.split(",");
        let finalInterest = [];
        interest &&
          interest.length > 0 &&
          interest.map((data) => {
            if (data && data != "") {
              const obj = { id: data, text: data };
              finalInterest.push(obj);
            }
            setInterests(finalInterest);
          });
      }

      if (response && response.skills) {
        let skill = response.skills && response.skills.split(",");
        let finalSkill = [];
        skill &&
          skill.length > 0 &&
          skill.map((data) => {
            if (data && data != "") {
              const obj = { id: data, text: data };
              finalSkill.push(obj);
            }
            setSkills(finalSkill);
          });
      }
console.log(response)
     //  if(response.stateResponse.stateName) {
     //      setStateList(response.stateResponse.stateName)
     //  }
    }
  };

  const handleTimeZone = (data) => {
    setTimezone(data.value);
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  useEffect(async () => {
    if (authData) {
      getStudentData(authData.id);
    }
  }, [authData]);

  const saveProfile = (values) => {
    console.log(values);
  };

  const closeModal = () => {
    setModal(false);
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files && event.target.files.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  useEffect(async () => {
    const countryList = await dropdownServices.countryList();
    const collegeList = await dropdownServices.collegeList();
    const genderList = await dropdownServices.genderList();
    const skillsList = await dropdownServices.skillsList();

    let skillListData = [];
    skillsList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      skillListData.push(obj);
    });
    setCollegelist(collegeList.data);
    setCountrylist(countryList.data);
    setGenderlist(genderList.data);
    setSkillslist(skillListData);
  }, []);

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit">
                {/* <Link to="#" className="btn edit-btn">Edit Profile</Link> */}
              </div>
            </div>
          </div>
        </section>
        <section className="job-feeds-wrapper">
          <div className="container">
            <div className="profile-feed-inner">
              <div className="user-profile-left">
                <div className="user-profile-coll">
                  <div className="user-profile-detail">
                    <div
                      className="profile-pic-progress"
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="profile-img">
                        <img src={studentProfilePic} alt="user profile" />
                      </span>
                    </div>
                    <h3>
                      {studentData &&
                        studentData.firstName &&
                        studentData.firstName}{" "}
                      {studentData &&
                        studentData.lastName &&
                        studentData.lastName}{" "}
                    </h3>
                    <p>
                      {studentData &&
                        studentData.address &&
                        studentData.address}
                      {", "}
                      {studentData &&
                        studentData.addressLine1 &&
                        studentData.addressLine1}
                      {", "}
                      {studentData &&
                        studentData.addressLine2 !== "undefined" &&
                        studentData.addressLine2}
                    </p>
                    <p>
                      {studentData &&
                        studentData.cityName &&
                        studentData.cityName}
                    </p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {studentData &&
                          studentData.availableConnects &&
                          studentData.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData &&
                            studentData.experienceInYears &&
                            studentData.experienceInYears}
                          Year{", "}
                          {studentData &&
                            studentData.experienceInMonths &&
                            studentData.experienceInMonths}{" "}
                          Month
                        </span>
                      </li>
                      <li>
                        College / University{" "}
                        <span className="result">
                          {studentData &&
                            studentData.collegeResponse &&
                            studentData.collegeResponse.collegeName &&
                            studentData.collegeResponse.collegeName}
                        </span>
                      </li>
                      <li>
                        Education{" "}
                        <span className="result">
                          {studentData &&
                            studentData.qualificationResponse &&
                            studentData.qualificationResponse
                              .qualificationName &&
                            studentData.qualificationResponse.qualificationName}
                        </span>
                      </li>
                      <li>
                        Hours / day{" "}
                        <span className="result">
                          {studentData &&
                            studentData.workHoursPerDay &&
                            studentData.workHoursPerDay}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      michael-taylor028@gmail.com
                    </p>
                  </div>
                  <div className="profile-strength">
                    <div className="profile-strength-inner">
                      <h3>
                        Profile strength:{" "}
                        <span className="profile-completed">60% Completed</span>
                      </h3>
                      <div className="profile-strength-bar">
                        <p
                          className="profile-progress"
                          style={{ width: "60%" }}
                        ></p>
                        <div className="profile-complete-bar">
                          <span
                            className="complete-bar completed"
                            style={{ left: "25%" }}
                          ></span>
                          <span
                            className="complete-bar completed"
                            style={{ left: "50%" }}
                          ></span>
                          <span
                            className="complete-bar"
                            style={{ left: "75%" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ImageCropperModal
                  closeModal={closeModal}
                  showImageCropModal={modal}
                  readFile={readFile}
                  imageSrc={img.personalInfoImg}
                  setProfileImage={setProfileImage}
                  setImg={setImg}
                />
                <Form onSubmit={saveProfile} validate={validate}>
                  {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                      <section className="profile-information-view">
                        <div className="profile-information-coll">
                          <h3>Personal information</h3>
                          <div className="profile-edit-info-list">
                            <div className="form-field-group">
                              <div className="form-field flex50">
                                <Field
                                  name="firstname"
                                  label="First name"
                                  placeholder="Enter first name"
                                  component={renderField}
                                  defaultValue={studentData.firstName}
                                />
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="lastname"
                                  label="Last name"
                                  placeholder="Enter last name"
                                  component={renderField}
                                  defaultValue={studentData.lastName}
                                />
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="age"
                                  label="Age"
                                  placeholder="Enter age"
                                  component={renderField}
                                  defaultValue={studentData.age}
                                />
                              </div>
                              <div className="form-field flex50">
                                <label htmlFor="gender"> Gender </label>
                                <div className="radio-button-groupss">
                                  <Field
                                    label="Male"
                                    name="genderName"
                                    value="Male"
                                    component={RenderRadioButtonField}
                                    type="radio"
                                    defaultValue={
                                      studentData &&
                                      studentData.genderResponse &&
                                      studentData.genderResponse.genderName
                                    }
                                  >
                                    Male
                                  </Field>
                                  <Field
                                    label="Female"
                                    name="genderName"
                                    value="Female"
                                    component={RenderRadioButtonField}
                                    type="radio"
                                    defaultValue={
                                      studentData &&
                                      studentData.genderResponse &&
                                      studentData.genderResponse.genderName
                                    }
                                  >
                                    Female
                                  </Field>
                                </div>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="email"
                                  placeholder="Enter email Address"
                                  label="Email Address"
                                  component={renderField}
                                />
                              </div>
                              <div className="form-field flex50">
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
                                    defaultValue={studentData.timezone}
                                  />
                                </div>
                              </div>
                              <div className="form-field flex100">
                                <Field
                                  name="intrestedArea"
                                  label="Interested area"
                                  placeholder="Enter interested area"
                                  suggestions={skillslist}
                                  component={RenderTagField}
                                  value={interests}
                                  dvalue={interests}
                                />
                              </div>
                              <div className="form-field flex100 mb-2">
                                <Field
                                  name="houseno"
                                  label="Address"
                                  component={renderField}
                                  placeholder="Enter Address"
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.address &&
                                    studentData.address
                                  }
                                />
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="addressLine1"
                                  label="Address line 1"
                                  component={renderField}
                                  placeholder="Enter Address Line 1"
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.addressLine1 &&
                                    studentData.addressLine1
                                  }
                                />
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="addressLine2"
                                  label="Address line 2"
                                  component={renderField}
                                  placeholder="Enter Address Line 2"
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.addressLine2 &&
                                    studentData.addressLine2
                                  }
                                />
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="Country"
                                  label="Country"
                                  component={renderSelect}
                                  onChange={handleChangeCountry}
                                  defaultValue={
                                    studentData &&
                                    studentData.countryResponse &&
                                    studentData.countryResponse.countryName
                                  }
                                >
                                  <option value="" disabled>
                                    Select Country
                                  </option>
                                  {countrylist &&
                                    countrylist.map((country) => (
                                      <option
                                        value={country.id}
                                        key={country.id}
                                      >
                                        {country.countryName}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="state"
                                  label="State"
                                  component={renderSelect}
                                  defaultValue={
                                    studentData &&
                                    studentData.stateResponse &&
                                    studentData.stateResponse.stateName
                                  }
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
                                  placeholder="city"
                                  label="City"
                                  component={renderField}
                                  defaultValue={studentData.cityName}
                                ></Field>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="pin"
                                  placeholder="Enter pin"
                                  label="PIN"
                                  component={renderField}
                                  defaultValue={studentData.postalCode}
                                />
                              </div>
                              <div className="form-field flex100">
                                <input
                                  name="profileImage"
                                  id="profileImage"
                                  accept=".jpg, .jpeg, .png"
                                  type="file"
                                  onChange={handleImageChange}
                                />
                              </div>
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
                          </div>
                        </div>
                      </section>
                      <section className="profile-information-view">
                        <div className="profile-information-coll">
                          <h3>Professional information</h3>
                          <div className="profile-edit-info-list">
                            <div className="form-field-group">
                              <div className="form-field flex50">
                                <Field
                                  name="hours"
                                  placeholder="Hours"
                                  label="Hours / day"
                                  component={renderSelect}
                                  defaultValue={
                                    studentData &&
                                    studentData.workHoursPerDay &&
                                    studentData.workHoursPerDay
                                  }
                                >
                                  <option defaultValue="">Select hours</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                </Field>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="salary"
                                  placeholder="Enter expected salary"
                                  label="Expected salary"
                                  component={renderField}
                                  defaultValue={studentData.expectedSalary}
                                />
                              </div>
                              <div className="form-field flex50">
                                {/* <Field
                                  name="experience"
                                  placeholder="Enter experience"
                                  label="Total Experience"
                                  component={renderField}
                                /> */}

                                <Field
                                  name="experienceInYears"
                                  label="Experience"
                                  component={renderSelect}
                                  placeholder="Year's"
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.experienceInYears &&
                                    studentData.experienceInYears
                                  }
                                >
                                  <option value="0">0 year</option>
                                  {[...Array.from(Array(51).keys())]
                                    .slice(1)
                                    .map((num, i) => (
                                      <option key={i} value={num}>
                                        {num ? num + " year's" : ""}
                                      </option>
                                    ))}
                                </Field>
                                <Field
                                  name="experienceInMonths"
                                  label="Experience"
                                  component={renderSelect}
                                  placeholder="Month's"
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.experienceInMonths &&
                                    studentData.experienceInMonths
                                  }
                                >
                                  <option value="0">0 month</option>
                                  {[...Array.from(Array(13).keys())]
                                    .slice(1)
                                    .map((num, i) => (
                                      <option key={i} value={num}>
                                        {num ? num + " month's" : ""}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                              <div className="form-field flex50">
                                {/* <Field
                                  name="working"
                                  placeholder="Enter working (onsite/offsite)"
                                  label="Working"
                                  component={renderField}
                                /> */}

                                <div className="radio-button-groupss">
                                  <Field
                                    name="working"
                                    value="Onsite"
                                    component={RenderRadioButtonField}
                                    type="radio"
                                    defaultValue={
                                      studentData &&
                                      studentData.workingType &&
                                      studentData.workingType
                                    }
                                    currentIndex="0"
                                  >
                                    OnSite
                                  </Field>
                                  <Field
                                    name="working"
                                    value="OffSite"
                                    component={RenderRadioButtonField}
                                    type="radio"
                                    defaultValue={
                                      studentData &&
                                      studentData.workingType &&
                                      studentData.workingType
                                    }
                                    currentIndex="1"
                                  >
                                    OffSite
                                  </Field>
                                </div>
                              </div>
                              <div className="form-field flex100">
                                <Field
                                  name="resume"
                                  label="Resume"
                                  uploadLabel="Browse resume file"
                                  component={RenderFileUploadField}
                                  type="text"
                                />
                                <ul>
                                  <li>
                                    {studentData && studentData.resumeFilePath && (
                                      <a href={studentResume} target="_blank">
                                        {studentData.resumeFilePath}
                                      </a>
                                    )}
                                  </li>
                                </ul>
                              </div>
                              <div className="form-field flex100">
                                <Field
                                  name="documents"
                                  label="Extra Certificates"
                                  uploadLabel="Browse documents"
                                  component={RenderFileUploadField}
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="profile-information-view">
                        <div className="profile-information-coll">
                          <h3>Skill</h3>
                          <div className="form-field-group">
                            <div className="form-field flex100">
                              <Field
                                name="skills"
                                label="Skills"
                                suggestions={skillslist}
                                placeholder="Enter skills"
                                component={RenderTagField}
                                value={skills}
                                dvalue={skills}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className="form-field flex100 mb-5 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-save btn-primary"
                          onClick={() => saveProfile(values)}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EditProfile;
