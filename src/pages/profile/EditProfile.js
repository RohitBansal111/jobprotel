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
import toast from "toastr";
import * as types from "../../types/auth";

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
  const [stateValue, setStateValue] = useState();
  const [designationlist, setDesignationlist] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState([]);

  const [collegeList, setCollegelist] = useState([]);
  const [genderList, setGenderlist] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [modal, setModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [id, setId] = useState("");
  const [img, setImg] = useState({
    personalInfoImg: "",
  });
  const [imageValid, setImageValid] = useState(false);
  const [qualificationList, setQualificationList] = useState(null);
  const [qualificationId, setQualificationId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [inputField, setInputField] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);

  const resumeHandler = (e) => {
    const files = e.target.files[0];
    setResumeFile(files);
    setResumeName(files.name);
  };

  const extraCertificateHandler = (event) => {
    let image = [...event.target.files];

    let imageArray = [];
    let titles = [];
    image.map((data) => {
      let obj = {
        title: data.name.split(".").slice(0, -1).join("."),
        certificates: data,
      };
      imageArray.push(obj);
      // titles.push(data.name.split(".").slice(0, -1).join("."));
    });
    setPreviewImg(imageArray);
    // setInputFields(titles);
  };
  const handleFormChange = (index, event) => {
    let data = [...previewImg];
    data[index][event.target.name] = event.target.value;
    setPreviewImg(data);
  };

  const manageCertificates = (img) => {
    let arr = [];
    previewImg
      .filter((image) => image.name !== img)
      .map((image) => arr.push(image));
    setPreviewImg(arr);
  };
  const getStudentData = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      const response = resp.data.data.result;
      console.log(response);
      setStudentData(response);
      setStudentProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.pictureUrl}`
      );
      setImg({
        ...img,
        personalInfoImg: `${process.env.REACT_APP_IMAGE_API_URL}${response.pictureUrl}`,
      });
      setStudentResume(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.resumeFilePath}`
      );
      if (response && response.resumeFilePath) {
        setResumeName(response.resumeFilePath);
      }
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

      if (response && response.countryResponse) {
        CountryValue(response.countryResponse.id);
      }
    }
  };

  const handleTimeZone = (data) => {
    setTimezone(data.value);
  };

  const CountryValue = async (data) => {
    const resp = await dropdownServices.stateList(data);
    setStateList(resp.data);
    if (resp.data.length > 0) {
      setStateValue(resp, data[0]);
    }
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownServices.stateList(e.target.value);
    setStateList(resp.data);
  };

  const handlechangeGender = (e) => {
    console.log(e.target.value);
  };
  useEffect(async () => {
    if (authData) {
      getStudentData(authData.id);
      setId(authData.id);
    }
  }, [authData]);

  const saveProfile = async (values) => {
    let formData = new FormData();

    formData.append("userId", id);
    formData.append("firstName", values.firstname);
    formData.append("lastName", values.lastname);
    formData.append("email", values.email);
    if (imageValid) {
      formData.append("profileImage", img.personalInfoImg);
    } else {
      formData.append("profileImage", null);
    }
    formData.append("addressLine1", values.addressLine1);
    formData.append("addressLine2", values.addressLine2);
    formData.append("stateId", values.state.data[0].id);
    formData.append(
      "designationId",
      designationId ? designationId : studentData.designationResponse.id
    );
    formData.append("city", values.city);
    formData.append("postalCode", values.pin);
    formData.append("genderId", values.genderName);
    formData.append("address", values.houseno);
    formData.append("age", values.age);

    if (values.qualificationId == "Other") {
      formData.append("qualification", values.qualification);
    } else {
      formData.append(
        "qualificationId",
        qualificationId ? qualificationId : studentData.qualificationResponse.id
      );
    }

    let interestsArr = [];
    interests && interests.map((interest) => interestsArr.push(interest.text));

    let skillsArr = [];
    skills && skills.map((skill) => skillsArr.push(skill.text));

    for (var i = 0; i < interestsArr.length; i++) {
      formData.append(`interests[${i}]`, interestsArr[i]);
    }
    for (var i = 0; i < skillsArr.length; i++) {
      formData.append(`skills[${i}]`, skillsArr[i]);
    }
    formData.append(
      "collegeId",
      collegeId ? collegeId : studentData.collegeResponse.id
    );
    formData.append("experienceInYears", values.experienceInYears);
    formData.append("experienceInMonths", values.experienceInMonths);
    formData.append("expectedSalary", values.salary);
    formData.append("workHoursPerDay", values.hours);
    formData.append("workDaysPerWeek", values.days);
    formData.append("timezone", timezone);
    formData.append("workingType", values.working);
    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    } else {
      formData.append("resumeFile", null);
    }

    if (previewImg?.length > 0) {
      for (var i = 0; i < previewImg.length; i++) {
        formData.append(`ExtraCertificates[${i}].Title`, previewImg[i].title);
        formData.append(
          `ExtraCertificates[${i}].Certificates`,
          previewImg[i].certificates
        );
      }
    }

    const resp = await studentServices.updateStudentDetails(formData);
    console.log(resp);
    if(resp.status === 200){
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      const resp2 = await studentServices.getStudentDetails(id);
      console.log(resp2,"student data")
      console.log(resp2.data.data.result,"student data")
      if (resp2.status == 200) {
        // dispatch({
        //   type: types.LOGIN_USER_SUCCESS,
        //   payload: resp2.data.data.result,
        //   token: localStorage.getItem("jobPortalUserToken"),
        // });
      }
    }if (resp.errors && typeof resp.errors === "object") {
      let errors = "";
      let keys = Object.keys(resp.errors);
      keys.forEach((key) => {
        errors = key + "," + errors;
      });

      errors = errors.replace(/,\s*$/, "");
      toast.error(errors + "is Required");
    } else if (resp.error) {
      toast.error(resp.error ? resp.error : "Something went wrong");
    }
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
      setImageValid(true);
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

  const handleCollege = (e) => {
    let value = e.target.value;
    console.log(value);
    setCollegeId(value);
  };

  const handleDesignation = (e) => {
    let value = e.target.value;
    console.log(value);
    setDesignationId(value);
  };

  useEffect(async () => {
    const countryList = await dropdownServices.countryList();
    const collegeList = await dropdownServices.collegeList();
    const genderList = await dropdownServices.genderList();
    const skillsList = await dropdownServices.skillsList();
    const designationList = await dropdownServices.designationList();
    const qualificationList = await dropdownServices.qualificationList();
    let skillListData = [];
    skillsList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      skillListData.push(obj);
    });
    setCollegelist(collegeList.data);
    setCountrylist(countryList.data);
    setGenderlist(genderList.data);
    setSkillslist(skillListData);
    setDesignationlist(designationList.data);
    setQualificationList(qualificationList.data);
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
                                  {genderList &&
                                    genderList.length > 0 &&
                                    genderList.map((gender, index) => (
                                      <Field
                                        name="genderName"
                                        value={gender.id}
                                        component={RenderRadioButtonField}
                                        type="radio"
                                        currentIndex={index}
                                        defaultValue={
                                          studentData &&
                                          studentData.genderResponse &&
                                          studentData.genderResponse.id
                                        }
                                      >
                                        {gender.name}
                                      </Field>
                                    ))}
                                </div>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="email"
                                  placeholder="Enter email Address"
                                  label="Email Address"
                                  component={renderField}
                                  defaultValue={
                                    studentData &&
                                    studentData.email &&
                                    studentData.email
                                  }
                                  disabled
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
                                  label="Interested Area"
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
                                  defaultValue={stateValue && stateValue}
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
                              <div className="form-field flex50">
                                <Field
                                  name="collegeId"
                                  label="College"
                                  component={renderSelect}
                                  placeholder="Enter college / university name"
                                  onChange={handleCollege}
                                  defaultValue={
                                    studentData &&
                                    studentData.collegeResponse &&
                                    studentData.collegeResponse.collegeName
                                  }
                                >
                                  <option value="" disabled>
                                    Select College
                                  </option>
                                  {collegeList &&
                                    collegeList.length > 0 &&
                                    collegeList.map((college) => (
                                        
                                        <option value={college.collegeId} key={college.collegeId}>
                                        {college.name}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                              <div className="form-field flex50">
                                <Field
                                  name="designation"
                                  label="Category"
                                  component={renderSelect}
                                  placeholder="Enter category"
                                  onChange={handleDesignation}
                                  defaultValue={
                                    studentData &&
                                    studentData.designationResponse &&
                                    studentData.designationResponse
                                      .qualificationName
                                  }
                                >
                                  {designationlist &&
                                    designationlist.map((designation) => (
                                      <option value={designation.id} key={designation.id}>
                                        {designation.title}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                              <div className="form-field flex100">
                                <Field
                                  name="qualificationId"
                                  label="Qualification"
                                  component={renderSelect}
                                  onChange={handleQualification}
                                  defaultValue={
                                    studentData &&
                                    studentData.qualificationResponse &&
                                    studentData.qualificationResponse
                                      .qualificationName
                                  }
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
                                    label="Qualification"
                                    component={renderField}
                                  />
                                </div>
                              )}
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
                                  name="days"
                                  label="Days / Week"
                                  component={renderSelect}
                                  type="text"
                                  defaultValue={
                                    studentData &&
                                    studentData.workDaysPerWeek &&
                                    studentData.workDaysPerWeek
                                  }
                                >
                                  <option selected="">Select days</option>
                                  <option value="1">1 day</option>
                                  <option value="2">2 days</option>
                                  <option value="3">3 days</option>
                                  <option value="4">4 days</option>
                                  <option value="5">5 days</option>
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

                                <label>Working</label>
                                <div className="radio-button-groupss">
                                  <Field
                                    name="working"
                                    value="1"
                                    component={RenderRadioButtonField}
                                    type="radio"
                                    defaultValue={
                                      studentData &&
                                      studentData.workingType &&
                                      studentData.workingType
                                    }
                                    currentIndex="0"
                                  >
                                    Onsite
                                  </Field>
                                  <Field
                                    name="working"
                                    value="2"
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
                                <label>Resume</label>
                                <input
                                  name="resume"
                                  uploadLabel="Browse resume file"
                                  //     component={RenderFileUploadField}
                                  type="file"
                                  onChange={resumeHandler}
                                />
                                <ul>
                                  <li>
                                    {resumeName}
                                    {/* {studentData && studentData.resumeFilePath && (
                                      <a href={studentResume} target="_blank">
                                      </a>
                                    )} */}
                                  </li>
                                </ul>
                              </div>
                              <label>Extra Certificates</label>
                              <div className="form-field flex100">
                                <input
                                  name="documents"
                                  uploadLabel="Browse documents"
                                  type="file"
                                  accept=".jpg, .jpeg, .png, application/pdf, .doc"
                                  onChange={extraCertificateHandler}
                                  multiple
                                />
                                <ul className="uploaded-documents">
                                  {previewImg &&
                                    previewImg.length > 0 &&
                                    previewImg.map((img, index) => (
                                      <>
                                        <li>
                                          {index + 1}. {img.certificates.name}
                                          <label>File Title</label>
                                          <input
                                            name="title"
                                            onChange={(e) =>
                                              handleFormChange(index, e)
                                            }
                                            value={img.title}
                                          />
                                          <button className="btn btn-remove">
                                            <i
                                              className="fa fa-times-circle"
                                              aria-hidden="true"
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                manageCertificates(
                                                  img.certificates.name
                                                )
                                              }
                                            />
                                          </button>
                                        </li>
                                      </>
                                    ))}
                                </ul>
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
