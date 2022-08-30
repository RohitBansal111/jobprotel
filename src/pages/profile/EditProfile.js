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
  renderNumberField,
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
import * as extraCertificateServices from "../../services/studentExtraCertificates";
import * as types from "../../types/auth";
import { Loader } from "../../components/Loader/Loader";
import app from "../../helpers/firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  query,
  equalTo,
  orderByChild,
  get,
  update,
  remove,
} from "@firebase/database";

const EditProfile = () => {
  const authData = useSelector((state) => state.auth.user);

  const db = getDatabase(app);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

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
  const [qualificationList, setQualificationList] = useState(null);
  const [qualificationId, setQualificationId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [inputField, setInputField] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const [working, setWorking] = useState("");
  const [callCertificate, setCallCertificate] = useState(false);
  const [editData, setEditData] = useState([]);

  const resumeHandler = (e) => {
    const files = e.target.files[0];
    setResumeFile(files);
    setResumeName(files.name);
  };

  const extraCertificateHandler = async (event) => {
    let files = event.target.files[0];
    let obj = {
      title: files.name.split(".").slice(0, -1).join("."),
      certificates: files,
    };
    let formData = new FormData();
    formData.append("studentId", authData.id);

    formData.append("AddMorecertificates", obj.title);
    formData.append("AddMorecertificates", obj.certificates);
    if (authData) {
      const resp = await extraCertificateServices.postExtraCertificates(
        formData
      );
      if (resp.status === 200) {
        setCallCertificate(true);
      }
    }

    // let image = [...event.target.files];

    // let imageArray = [];
    // image.map((data) => {
    //   let obj = {
    //     title: data.name.split(".").slice(0, -1).join("."),
    //     certificates: data,
    //   };
    //   imageArray.push(obj);
    // });
    // setPreviewImg(imageArray);
  };

  const getExtraCertificate = async (id) => {
    const resp = await extraCertificateServices.getExtraCertificates(id);
    let response = resp.data?.data?.result;
    if (resp.status === 200 && response.length > 0) {
      let arr = [];
      response.map((resp) => {
        let obj = {
          title: resp.title.split(".").slice(0, 1).join("."),
          certificates: resp.filePath,
          id: resp.id,
        };
        arr.push(obj);
      });
      setPreviewImg(arr);
    }
  };

  useEffect(async () => {
   
    if (authData) {
     
      getStudentData(authData.id);
      getExtraCertificate(authData.id);

      setId(authData.id);
     
    }
   
  }, [authData, callCertificate]);





  const handleFormTitleChange = (index, event) => {
    let data = [...previewImg];
    data[index][event.target.name] = event.target.value;
    setPreviewImg(data);
  };

  const manageCertificates = async (id) => {
    const resp = await extraCertificateServices.deleteExtraCertificates(id);
    if (resp.status === 200) {
      let arr = [];
      previewImg
        .filter((image) => image.id !== id)
        .map((image) => arr.push(image));
      setPreviewImg(arr);
      getExtraCertificate(authData.id);
    }
  };

  const editCertificates = async (id, title) => {
    if ((id, title)) {
      let formData = new FormData();
      formData.append("Title", title);
      formData.append("CertId", id);

      const resp = await extraCertificateServices.updateExtraCertificatesTitle(
        formData
      );
      if (resp.status === 200) {
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
        getExtraCertificate(authData.id);
      }
    }
  };

  const getStudentData = async (id = authData.id) => {
    try {
      // setStudentProfilePic(UserAvtar);
      // setImg({
      //   // ...img,
      //   personalInfoImg: UserAvtar,
      // });
     
      const resp = await studentServices.getStudentDetails(id);
      if (resp.status == 200) {
        setLoading(false);
        let response = resp.data.data;

        setStudentData(response);
        if (response?.studentDetails?.pictureUrl) {
          setStudentProfilePic(
            `${process.env.REACT_APP_IMAGE_API_URL}${response.studentDetails.pictureUrl}`
          );
          setImg({
            ...img,
            personalInfoImg: `${process.env.REACT_APP_IMAGE_API_URL}${response.studentDetails.pictureUrl}`,
          });
        }
        if(response?.studentDetails?.resumeFilePath !==undefined){
          setStudentResume(
            `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.resumeFilePath}`
          );
        }

        
        if (response?.studentDetails?.resumeFilePath) {
          setResumeName(response?.studentDetails?.resumeFilePath);
        }
        let finalInterest = [];
        if (response?.studentDetails?.interests) {
          let interest = response.studentDetails.interests?.split(",");
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

        let finalSkill = [];
        if (response?.studentDetails?.skills) {
          let skill = response.studentDetails.skills?.split(",");
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

        if (response?.studentDetails?.countryResponse) {
          CountryValue(response.studentDetails.countryResponse.id);
        }
        if (response?.studentDetails?.qualificationName !== null) {
          setInputField(true);
        }
        
        if (response?.studentDetails?.qualificationResponse == null) {
          setInputField(true);
        }
        if(response?.studentDetails?.timezone) {
          setTimezone(JSON.parse(response?.studentDetails?.timezone));
        }

        if (response) {
          let data = {
            firstname: response?.firstName,
            lastname: response?.lastName,
            email: response?.email,
            houseno: response?.studentDetails?.address,
            addressLine1: response?.studentDetails?.addressLine1,
            addressLine2:
              response?.studentDetails?.addressLine2 != null
                ? response?.studentDetails?.addressLine2
                : "",
            Country: response?.studentDetails?.countryResponse?.id,
            state: response?.studentDetails?.stateResponse.id,
            city: response?.studentDetails?.cityName,
            pin: response?.studentDetails?.postalCode,
            age: response?.studentDetails?.age,
            genderName: response?.studentDetails?.genderResponse?.id,
            collegeId: response?.studentDetails?.collegeResponse?.id,
            designation: response?.studentDetails?.designationResponse?.id,
            qualificationId:
              response?.studentDetails?.qualificationResponse?.id,
            qualification: response?.studentDetails?.qualificationName,
            hours: response?.studentDetails?.workHoursPerDay,
            days: response?.studentDetails?.workDaysPerWeek,
            salary: response?.studentDetails?.expectedSalary,
            working: response?.studentDetails?.workingType.toString(),
            experienceInYears: response?.studentDetails?.experienceInYears,
            experienceInMonths: response?.studentDetails?.experienceInMonths,
            timezone: response?.studentDetails?.timezone !==undefined ?JSON.parse(response?.studentDetails?.timezone):'',
            intrestedArea: finalInterest && finalInterest,
            skills:finalSkill&& finalSkill,
          };
          setEditData(data);
        }
      }else if (resp.status !== 200) {
        setLoading(false)
        toast.error(resp?.error ? resp.error : "someething went wrong")
      }

      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err, ":::");
    }
  };

  const handleTimeZone = (data) => {
    setTimezone(data);
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
    if (resp.status === 200) {
      setStateList(resp.data);
    }
  };

  const saveProfile = async (values) => {
    setLoadingUpdate(true);
    let formData = new FormData();

    formData.append("userId", id);
    formData.append("firstName", values.firstname);
    formData.append("lastName", values.lastname);
    formData.append("email", values.email);

    if (img.personalInfoImg && img.personalInfoImg.length > 1000) {
      formData.append("profileImage", img.personalInfoImg);
    }

    formData.append("addressLine1", values.addressLine1);
    formData.append("addressLine2", values.addressLine2);
    formData.append("stateId", values.state);
    formData.append(
      "designationId",
      designationId
        ? designationId
        : studentData.studentDetails.designationResponse.id
    );
    formData.append("city", values.city);
    formData.append("postalCode", values.pin);
    formData.append("genderId", values.genderName);
    formData.append("address", values.houseno);
    formData.append("age", values.age);

    if (values.qualificationId == "879f9960-14ba-11ed-984a-068f5cec9f16") {
      formData.append("qualification", values.qualification);
    }
    formData.append(
      "qualificationId",
      qualificationId
        ? qualificationId
        : studentData.studentDetails.qualificationResponse.id
    );

    let interestsArr = [];
    values.intrestedArea &&
      values.intrestedArea.map((interest) => interestsArr.push(interest.text));

    let skillsArr = [];
    values.skills && values.skills.map((skill) => skillsArr.push(skill.text));

    for (var i = 0; i < interestsArr.length; i++) {
      formData.append(`interests[${i}]`, interestsArr[i]);
    }
    for (var i = 0; i < skillsArr.length; i++) {
      formData.append(`skills[${i}]`, skillsArr[i]);
    }
    formData.append(
      "collegeId",
      collegeId ? collegeId : studentData.studentDetails.collegeResponse.id
    );
    formData.append("experienceInYears", values.experienceInYears);
    formData.append("experienceInMonths", values.experienceInMonths);
    formData.append("expectedSalary", values.salary);
    formData.append("workHoursPerDay", values.hours);
    formData.append("workDaysPerWeek", values.days);
    formData.append("timezone", JSON.stringify(timezone));
    formData.append("workingType", values.working);
    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    } else {
      formData.append("resumeFile", null);
    }

    // if (previewImg?.length > 0) {
    //   for (var i = 0; i < previewImg.length; i++) {
    //     formData.append(`ExtraCertificates[${i}].Title`, previewImg[i].title);
    //     formData.append(
    //       `ExtraCertificates[${i}].Certificates`,
    //       previewImg[i].certificates
    //     );
    //   }
    // }

    const resp = await studentServices.updateStudentDetails(formData);
    if (resp.status === 200) {
      setLoadingUpdate(false);
      //call firebase
      readUsers(authData.id, values.firstname, values.lastname);

      const resp2 = await studentServices.getStudentDetails(id);
      localStorage.setItem("jobPortalUser", JSON.stringify(resp2.data.data));
      if (resp2.status == 200) {
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp2.data.data,
          token: localStorage.getItem("jobPortalUserToken"),
        });
      }
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );

      setTimeout(() => {
        window.location.reload();
      }, 300);
      if (authData) {
        getStudentData(authData.id);
      }
    } else if (resp.errors && typeof resp.errors === "object") {
      setLoading(false);
      let errors = "";
      let keys = Object.keys(resp.errors);
      keys.forEach((key) => {
        errors = key + "," + errors;
      });

      errors = errors.replace(/,\s*$/, "");
      toast.error(errors + "is Required");
    } else if (resp.error) {
      setLoading(false);
      toast.error(resp.error ? resp.error : "Something went wrong");
    }
  };

  const readUsers = (userId, firstName, lastName) => {
    const starUserRef = ref(db, "User");
    onValue(starUserRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const convertedData = Object.keys(data).map((d) => {
          return data[d];
        });
        let finalData = convertedData.filter(
          (data) => data.studentId == userId
        );
        finalData.map((data) => {
          const updates = {};
          updates["/studentDisplayName/"] =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1) +
            " " +
            lastName;

          update(ref(db, "User/" + data.chatRoomID), updates);
        });
      }
    });
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
    if (event.target.files?.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const handleQualification = (e) => {
    let value = e.target.value;
    setQualificationId(value);
    if (value == "879f9960-14ba-11ed-984a-068f5cec9f16") {
      setInputField(true);
    } else {
      setInputField(false);
    }
  };

  const handleCollege = (e) => {
    let value = e.target.value;
    setCollegeId(value);
  };

  const handleDesignation = (e) => {
    let value = e.target.value;
    setDesignationId(value);
  };
  const handleWorkingChange = (e) => {
    setWorking(e.target.value);
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
              <div className="banner-edit"></div>
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
                      {studentData?.firstName} {studentData?.lastName}{" "}
                    </h3>
                    <p>
                      {studentData?.studentDetails?.address}
                      {", "}
                      {studentData?.studentDetails?.addressLine1}
                      {", "}
                      {studentData?.studentDetails?.addressLine2 !=
                        "undefined" &&
                      studentData?.studentDetails?.addressLine2 != "null"
                        ? studentData?.studentDetails?.addressLine2
                        : ""}
                    </p>
                    <p>{studentData?.studentDetails?.cityName}</p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {studentData?.studentDetails?.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData?.studentDetails?.experienceInYears}
                          Year{", "}
                          {studentData?.studentDetails?.experienceInMonths}{" "}
                          Month
                        </span>
                      </li>
                      <li>
                        College / University{" "}
                        <span className="result">
                          {
                            studentData?.studentDetails?.collegeResponse
                              ?.collegeName
                          }
                        </span>
                      </li>
                      <li>
                        Education{" "}
                        <span className="result">
                          {
                            studentData?.studentDetails?.qualificationResponse
                              ?.qualificationName
                          }
                        </span>
                      </li>
                      <li>
                        Hours / day{" "}
                        <span className="result">
                          {studentData?.studentDetails?.workHoursPerDay}
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
                      {studentData?.email}
                    </p>
                  </div>
                  {/* <div className="profile-strength">
                      <div className="profile-strength-inner">
                        <h3>
                          Profile strength:{" "}
                          <span className="profile-completed">
                            60% Completed
                          </span>
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
                    </div> */}
                </div>
                <ImageCropperModal
                  closeModal={closeModal}
                  showImageCropModal={modal}
                  readFile={readFile}
                  imageSrc={img.personalInfoImg}
                  setProfileImage={setProfileImage}
                  setImg={setImg}
                />
                <Form
                  onSubmit={saveProfile}
                  validate={validate}
                  initialValues={editData}
                >
                  {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                      {loading ? (
                        <div className="inner-page-wrapper page-wrapper-loader">
                          <div className="fullpage-loader py-5">
                            {" "}
                            <Loader />{" "}
                          </div>
                        </div>
                      ) : (
                        <>
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
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="lastname"
                                      label="Last name"
                                      placeholder="Enter last name"
                                      component={renderField}
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="age"
                                      label="Age"
                                      placeholder="Enter age"
                                      component={renderNumberField}
                                      pattern="[0-9]*"
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
                                            key={index}
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
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="addressLine1"
                                      label="Address line 1"
                                      component={renderField}
                                      placeholder="Enter Address Line 1"
                                      type="text"
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="addressLine2"
                                      label="Address line 2"
                                      component={renderField}
                                      placeholder="Enter Address Line 2"
                                      type="text"
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="Country"
                                      label="Country"
                                      component={renderSelect}
                                      onChange={handleChangeCountry}
                                    >
                                      <option value="" disabled>
                                        Select Country
                                      </option>
                                      {countrylist &&
                                        countrylist.map((country, i) => (
                                          <option value={country.id} key={i}>
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
                                    >
                                      <option value="" disabled>
                                        Select State
                                      </option>
                                      {stateList &&
                                        stateList.map((state, i) => (
                                          <option value={state.id} key={i}>
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
                                    ></Field>
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="pin"
                                      placeholder="Enter pin"
                                      label="PIN"
                                      component={renderNumberField}
                                      pattern="[0-9]*"
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="collegeId"
                                      label="College"
                                      component={renderSelect}
                                      placeholder="Enter college / university name"
                                      onChange={handleCollege}
                                    >
                                      <option value="" disabled>
                                        Select College
                                      </option>
                                      {collegeList &&
                                        collegeList.length > 0 &&
                                        collegeList.map((college, i) => (
                                          <option
                                            value={college.collegeId}
                                            key={i}
                                          >
                                            {college.name}
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="designation"
                                      label="Categories of Job"
                                      component={renderSelect}
                                      onChange={handleDesignation}
                                    >
                                      {designationlist &&
                                        designationlist.map(
                                          (designation, i) => (
                                            <option
                                              value={designation.id}
                                              key={i}
                                            >
                                              {designation.title}
                                            </option>
                                          )
                                        )}
                                    </Field>
                                  </div>
                                  <div className="form-field flex100">
                                    <Field
                                      name="qualificationId"
                                      label="Qualification"
                                      component={renderSelect}
                                      onChange={handleQualification}
                                    >
                                      <option value="" disabled>
                                        Select
                                      </option>
                                      {qualificationList &&
                                        qualificationList.map(
                                          (qualification, i) => (
                                            <option
                                              value={qualification.id}
                                              key={i}
                                            >
                                              {qualification.name}
                                            </option>
                                          )
                                        )}
                                    </Field>
                                  </div>
                                  {inputField && (
                                    <div className="form-field flex100">
                                      <Field
                                        name="qualification"
                                        // label="Qualification"
                                        component={renderField}
                                      />
                                    </div>
                                  )}
                                  <div className="form-field flex100">
                                    <div className="uploadImageSection mb-2">
                                      <div className="file-label-image">
                                        <label>Upload Profile</label>
                                        <div className="file-upload">
                                          <input
                                            name="profileImage"
                                            id="profileImage"
                                            accept=".jpg, .jpeg, .png"
                                            type="file"
                                            onChange={handleImageChange}
                                          />
                                        </div>
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
                                    >
                                      <option value="">Select hours</option>
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
                                    >
                                      <option value="">Select days</option>
                                      <option value="1">1 day</option>
                                      <option value="2">2 days</option>
                                      <option value="3">3 days</option>
                                      <option value="4">4 days</option>
                                      <option value="5">5 days</option>
                                    </Field>
                                  </div>
                                  <div className="form-field flex100">
                                    <div className="d-flex justify-content-between">
                                      <div className="form-field flex50">
                                        <Field
                                          name="salary"
                                          placeholder="Enter expected salary"
                                          label="Expected Salary"
                                          component={renderNumberField}
                                          pattern="[0-9]*"
                                        />
                                      </div>
                                      <div className="form-field flex50 inner-multi-field-2">
                                        <div className="form-field flex50">
                                          <Field
                                            name="experienceInYears"
                                            component={renderSelect}
                                            label="Experience in Year's"
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
                                        </div>
                                        <div className="form-field flex50">
                                          <Field
                                            name="experienceInMonths"
                                            component={renderSelect}
                                            label="Experience in Month's"
                                          >
                                            <option value="0">0 month</option>
                                            {[...Array.from(Array(12).keys())]
                                              .slice(1)
                                              .map((num, i) => (
                                                <option key={i} value={num}>
                                                  {num ? num + " month's" : ""}
                                                </option>
                                              ))}
                                          </Field>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-field flex50">
                                    <label>Working Type</label>
                                    <div className="radio-button-groupss absolute-error">
                                      <Field
                                        name="working"
                                        value="1"
                                        component={RenderRadioButtonField}
                                        type="radio"
                                        onChange={handleWorkingChange}
                                        dvalue={working}
                                        currentIndex="0"
                                      >
                                        Onsite
                                      </Field>
                                      <Field
                                        name="working"
                                        value="2"
                                        component={RenderRadioButtonField}
                                        type="radio"
                                        onChange={handleWorkingChange}
                                        dvalue={working}
                                        currentIndex="1"
                                      >
                                        OffSite
                                      </Field>
                                    </div>
                                    {/* <p> {err && err.working && err.working}</p> */}
                                  </div>
                                  <div className="form-field flex100">
                                    <label className="d-block">Resume</label>
                                    <div className="file-upload-placehlder">
                                      <input
                                        name="resume"
                                        uploadlabel="Browse resume file"
                                        type="file"
                                        onChange={resumeHandler}
                                      />
                                      <span>Upload Resume</span>
                                    </div>
                                    <ul className="uploaded-documents">
                                      <li>
                                        {resumeName}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="form-field flex100">
                                    <label className="d-block">
                                      Extra Certificates
                                    </label>
                                    <div className="file-upload-placehlder">
                                      <input
                                        name="documents"
                                        uploadlabel="Browse documents"
                                        type="file"
                                        accept=".jpg, .jpeg, .png, application/pdf, .doc"
                                        onChange={extraCertificateHandler}
                                        multiple
                                      />
                                      <span>Add Extra Certificates</span>
                                    </div>
                                    <ul className="uploaded-documents">
                                      {previewImg &&
                                        previewImg.length > 0 &&
                                        previewImg.map((img, index) => (
                                          <>
                                            <li key={index}>
                                              <div className="change-title">
                                                <label>
                                                  {index + 1}. File Title
                                                </label>
                                                <div className="d-flex">
                                                  <input
                                                    name="title"
                                                    className="edit-profile-file"
                                                    onChange={(e) =>
                                                      handleFormTitleChange(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    value={img.title}
                                                  />
                                                  <button className="btn p-0 ms-3">
                                                    <i
                                                      className="fa fa-times-circle"
                                                      aria-hidden="true"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        manageCertificates(
                                                          img.id
                                                        )
                                                      }
                                                    />
                                                    <span className="btn btn-edit p-0 ps-3">
                                                      <i
                                                        className="fa fa-edit"
                                                        aria-hidden="true"
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                          editCertificates(
                                                            img.id,
                                                            img.title
                                                          )
                                                        }
                                                      />
                                                    </span>
                                                  </button>
                                                </div>
                                              </div>
                                              <div className="uploaded-file-name py-1">
                                                <span>{img.certificates}</span>
                                              </div>
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
                        </>
                      )}
                      <div className="form-field flex100 mb-5 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-save btn-primary"
                        >
                          {loadingUpdate && (
                            <div className="button-submit-loader">
                              <Loader />
                            </div>
                          )}{" "}
                          Update Info
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
