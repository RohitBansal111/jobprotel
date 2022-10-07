import { Field, Form } from "react-final-form";
import Layout from "../../components/Layout";
import DefaultProfile from "./../../assets/images/demo.png";
import ConnectIcon from "./../../assets/icons/connect.png";
import badgeCrossIcon from "./../../assets/icons/badge-closeicon.png";
import validate from "./validator/profileValidate";
import {
  renderField,
  RenderRadioButtonField,
  RenderFileUploadField,
  renderSelect,
  renderNumberField,
  renderTextareaField,
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
import PhoneInput from "react-phone-number-input";
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
import { uploadPicture } from "../../services/uploadProfilePicService";
import { RenderPhoneInput } from "../../components/renderPhoneInput";

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
  const [phoneNumberFlag, setphoneNumberFlag] = useState();
  const [countrylist, setCountrylist] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [updatedResumeName, setUpdatedResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState([]);
  const [coverName, setCoverName] = useState("");
  const [updatedCoverName, setUpdatedCoverName] = useState("");
  const [coverLetter, setCoverLetter] = useState([]);
  const [collegeList, setCollegelist] = useState([]);
  const [collegeList2, setCollegelist2] = useState([]);
  const [genderList, setGenderlist] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [img, setImg] = useState({
    personalInfoImg: "",
  });
  const [qualificationList, setQualificationList] = useState(null);
  const [qualificationId, setQualificationId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [inputField, setInputField] = useState(false);
  const [inputField2, setInputField2] = useState(false);
  const [working, setWorking] = useState("");
  const [editData, setEditData] = useState([]);
  const [locationCheck, setLocationCheck] = useState(false);
  const [timezoneCheck, setTimezoneCheck] = useState(false);
  const [courseStatus, setCourseStatus] = useState(false);
  const [err, setErr] = useState([]);
  const [date, setDate] = useState("");

  const resumeHandler = (e) => {
    const files = e.target.files[0];
    setResumeFile(files);
    setResumeName(files.name);
  };

  const coverLetterHandler = (e) => {
    const files = e.target.files[0];
    setCoverLetter(files);
    setCoverName(files.name);
  };

  useEffect(async () => {
    if (authData) {
      getStudentData(authData.id);
      setId(authData.id);
    }
  }, [authData]);

  const getStudentData = async (id = authData.id) => {
    try {
      const resp = await studentServices.getStudentDetails(id);
      // console.log(resp.data.data, "::::");
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
        if (response?.studentDetails?.resumeFilePath !== undefined) {
          setStudentResume(
            `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.resumeFilePath}`
          );
        }

        if (response?.studentDetails?.resumeFilePath !== null) {
          setUpdatedResumeName(response?.studentDetails?.resumeFilePath);
          setResumeFile(response?.studentDetails?.resumeFilePath);
        }
        if (response?.studentDetails?.coverLetter !== null) {
          setUpdatedCoverName(response?.studentDetails?.coverLetter);
          setCoverLetter(response?.studentDetails?.coverLetter);
        }
        if (response?.studentDetails?.coverLetter) {
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

        if (response?.studentDetails?.timezone) {
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
            zipCode: response?.studentDetails?.postalCode,
            age: response?.studentDetails?.age,
            genderName: response?.studentDetails?.genderResponse?.id,
            collegeId: response?.studentDetails?.collegeResponse.id,
            collegeOthers: response?.studentDetails?.collegeOthers,

            designation: response?.studentDetails?.designationResponse?.id,
            qualificationId:
              response?.studentDetails?.qualificationResponse?.id,
            qualification: response?.studentDetails?.qualificationName,
            hours: response?.studentDetails?.workHoursPerWeek,
            categoryOfJob: response?.studentDetails?.categoryOfJob,
            salary: response?.studentDetails?.expectedSalary,
            working: response?.studentDetails?.workingType.toString(),
            experienceInYears: response?.studentDetails?.experienceInYears,
            experienceInMonths: response?.studentDetails?.experienceInMonths,
            timezone:
              response?.studentDetails?.timezone !== undefined
                ? JSON.parse(response?.studentDetails?.timezone)
                : "",
            intrestedArea: finalInterest && finalInterest,
            skills: finalSkill && finalSkill,
            phone: response?.studentDetails?.phoneNumber,
            location: response?.studentDetails?.location,
            startDate: response?.studentDetails?.startDate.split("T00")[0],
            endDate: response?.studentDetails?.endDate.split("T00")[0],
            isProfileCompleted: response?.studentDetails?.isProfileCompleted,
            courseStatus:
              response?.studentDetails?.courseStatus == 1
                ? "ongoing"
                : response?.studentDetails?.courseStatus == 2 && "completed",
          };
          setEditData(data);
          if (data.Country) {
            handleCollegeName(data.Country);
          }

          if (
            response?.studentDetails?.courseStatus &&
            response?.studentDetails?.courseStatus !== 0
          ) {
            setCourseStatus(true);
          }

          if (response?.studentDetails?.workingType) {
            setWorking(response.studentDetails.workingType);
          }
          if (data.location) {
            setLocationCheck(true);
          }
          if (data.timezone) {
            setTimezoneCheck(true);
          }
          if (data.qualification) {
            setInputField(true);
          }
          if (data.collegeOthers) {
            setInputField2(true);
          }
        }
      } else if (resp.status !== 200) {
        setLoading(false);
        toast.error(resp?.error ? resp.error : "someething went wrong");
      }

      window.scrollTo(0, 0);
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
  };

  const handleCollegeName = async (value) => {
    const collegeList = await dropdownServices.collegeList(value);
    if (collegeList.status == 200) {
      setCollegelist(collegeList.data);
    }
  };

  const handleChangeCountry = async (e) => {
    const resp = await dropdownServices.stateList(e.target.value);
    if (resp.status === 200) {
      setStateList(resp.data);
    }
    handleCollegeName(e.target.value);
  };

  const saveProfile = async (values) => {
    console.log(values,":::::")
    let formData = new FormData();

    formData.append("userId", id);
    formData.append("firstName", values.firstname);
    formData.append("lastName", values.lastname);
    formData.append("email", values.email);
    formData.append("addressLine1", values.addressLine1);
    formData.append("addressLine2", values.addressLine2);
    formData.append("stateId", values.state);
    formData.append("categoryOfJob", values.categoryOfJob);
    formData.append("city", values.city);
    formData.append("postalCode", values.zipCode);
    formData.append("genderId", values.genderName);
    formData.append("address", values.houseno);
    formData.append("age", values.age);

    if (values.courseStatus == "ongoing") {
      formData.append("courseStatus", 1);
      formData.append("startDate", values.startDate);
    } else if (values.courseStatus == "completed") {
      formData.append("courseStatus", 2);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
    }

    if (values.qualificationId == "879f9960-14ba-11ed-984a-068f5cec9f16") {
      formData.append("qualification", values.qualification);
    }
    formData.append(
      "qualificationId",
      qualificationId
        ? qualificationId
        : studentData?.studentDetails?.qualificationResponse?.id
    );

    let interestsArr = [];
    values?.intrestedArea?.map((interest) => interestsArr.push(interest.text));

    let skillsArr = [];
    values?.skills?.map((skill) => skillsArr.push(skill.text));

    for (var i = 0; i < interestsArr.length; i++) {
      formData.append(`interests[${i}]`, interestsArr[i]);
    }
    for (var i = 0; i < skillsArr.length; i++) {
      formData.append(`skills[${i}]`, skillsArr[i]);
    }

    if (
      values.collegeId == "d5436e27-34e0-11ed-984a-068f5cec9f16" ||
      values.collegeId == "be1ef22b-34e0-11ed-984a-068f5cec9f16" ||
      values.collegeId == "b0b26c3a-34e0-11ed-984a-068f5cec9f16" ||
      values.collegeId == "cab1eccd-34e0-11ed-984a-068f5cec9f16" ||
      values.collegeId == "a6032bdf-34e0-11ed-984a-068f5cec9f16"
    ) {
      formData.append("collegeOthers", values.collegeOthers);
    }
    formData.append(
      "collegeId",
      collegeId ? collegeId : studentData?.studentDetails?.collegeResponse?.id
    );
    formData.append(
      "experienceInYears",
      values.experienceInYears == undefined ? 0 : values.experienceInYears
    );
    formData.append(
      "experienceInMonths",
      values.experienceInMonths == undefined ? 0 : values.experienceInMonths
    );
    formData.append("expectedSalary", values.salary);
    formData.append("phoneNumber", values.phone);
    formData.append("workHoursPerWeek", values.hours);
    if (working == 1) {
      formData.append("workingTypes", working);
      formData.append("location", values.location);
    } else if (working == 2) {
      formData.append("workingTypes", working);
      formData.append("timezone", JSON.stringify(timezone));
    }
    if (!updatedResumeName || updatedResumeName == undefined) {
      formData.append("resumeFile", resumeFile);
      formData.append("operationType", 1);
    } else {
      formData.append("resumeFile", resumeFile);
      formData.append("operationType", 2);
    }
    if (coverLetter) {
      formData.append("coverLetter", coverLetter);
    }

    if (validation()) {
      const resp = await studentServices.updateStudentDetails(formData);
      setLoadingUpdate(true);

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
          // window.location.reload();
        }, 300);
        if (authData) {
          getStudentData(authData.id);
        }
      } else if (resp.errors && typeof resp.errors === "object") {
        setLoadingUpdate(false);
        setLoading(false);
        let errors = "";
        let keys = Object.keys(resp.errors);
        keys.forEach((key) => {
          errors = key + "," + errors;
        });

        errors = errors.replace(/,\s*$/, "");
        toast.error(errors + "is Required");
      } else if (resp.error) {
        setLoadingUpdate(false);
        setLoading(false);
        toast.error(resp.error ? resp.error : "Something went wrong");
      } else {
        setLoadingUpdate(false);
      }
    }
  };

  const validation = () => {
    let isValid = true;
    let error = {};
    if (resumeFile?.length == 0 || resumeFile == undefined) {
      isValid = false;
      error["resumeFile"] = "Required resume";
    }
    if (coverLetter?.length == 0 || coverLetter == undefined) {
      isValid = false;
      error["coverLetter"] = "Required coverLetter";
    }
    setErr(error);
    return isValid;
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

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files?.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const postPicture = async () => {
    let image = img.personalInfoImg;
    let imageData = {
      userId: authData.id,
      image,
    };
    const resp = await uploadPicture(imageData);
    if (resp.status == 200) {
      const resp2 = await studentServices.getStudentDetails(id);
      localStorage.setItem("jobPortalUser", JSON.stringify(resp2.data.data));
      if (resp2.status == 200) {
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp2.data.data,
          token: localStorage.getItem("jobPortalUserToken"),
        });
      }
    }
  };

  useEffect(() => {
    if (img?.personalInfoImg?.includes("base64")) {
      postPicture();
    }
  }, [img]);

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
    if (
      value == "d5436e27-34e0-11ed-984a-068f5cec9f16" ||
      value == "be1ef22b-34e0-11ed-984a-068f5cec9f16" ||
      value == "b0b26c3a-34e0-11ed-984a-068f5cec9f16" ||
      value == "cab1eccd-34e0-11ed-984a-068f5cec9f16" ||
      value == "a6032bdf-34e0-11ed-984a-068f5cec9f16"
    ) {
      setInputField2(true);
    } else {
      setInputField2(false);
    }
  };

  const handleCollegeList = () => {
    let arr = [];
    {
      collegeList?.length > 0 &&
        collegeList
          .filter((college) => college.name !== "Other")
          .map((college) => arr.push(college));
    }
    {
      collegeList?.length > 0 &&
        collegeList
          .filter((college) => college.name == "Other")
          .map((college) => arr.push(college));
    }

    setCollegelist2(arr);
  };

  const handleCourseStatus = (e) => {
    setCourseStatus(true);
  };

  const handleWorkingChange = (e) => {
    let value = e.target.value;
    setWorking(value);
    if (value == 1) {
      setTimezoneCheck(false);
      setLocationCheck(true);
    } else if (value == 2) {
      setLocationCheck(false);
      setTimezoneCheck(true);
    }
  };

  useEffect(() => {
    handleCollegeList();
  }, [collegeList]);

  useEffect(async () => {
    const countryList = await dropdownServices.countryList();
    const genderList = await dropdownServices.genderList();
    const skillsList = await dropdownServices.skillsList();
    const qualificationList = await dropdownServices.qualificationList();
    let skillListData = [];
    skillsList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      skillListData.push(obj);
    });
    setCountrylist(countryList.data);
    setGenderlist(genderList.data);
    setSkillslist(skillListData);
    setQualificationList(qualificationList.data);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    setDate(today);
  }, []);

  console.log(countrylist)

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
                        <img
                          src={
                            img.personalInfoImg
                              ? img.personalInfoImg
                              : studentProfilePic
                              ? studentProfilePic
                              : DefaultProfile
                          }
                          className="img-aws"
                          alt="avtar"
                          width={100}
                          height={100}
                          layout="fill"
                        />
                        <button type="button" className="update-profile">
                          <i className="fa fa-edit"></i> 
                          <input
                            name="profileImage"
                            id="profileImage"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            onChange={handleImageChange}
                          />
                        </button>
                      </span>
                    </div>
                    <h3>
                      {studentData?.firstName} {studentData?.lastName}{" "}
                    </h3>
                    <p>
                      {studentData?.studentDetails?.address}
                      {studentData?.studentDetails?.addressLine1 && ", "}
                      {studentData?.studentDetails?.addressLine1}
                      {studentData?.studentDetails?.addressLine2 && ", "}
                      {studentData?.studentDetails?.addressLine2 != undefined &&
                      studentData?.studentDetails?.addressLine2 != null
                        ? studentData?.studentDetails?.addressLine2
                        : ""}
                    </p>
                    <p>{studentData?.studentDetails?.cityName}</p>
                  </div>
                  <div className="profile-connect">
                    {studentData?.studentDetails && (
                      <>
                        <div className="profile-con">
                          <img src={ConnectIcon} alt="Connect" />
                          <span className="conn-count">
                            {studentData?.studentDetails?.availableConnects}
                          </span>
                        </div>
                        <h4>Available Connects</h4>
                      </>
                    )}
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData?.studentDetails?.experienceInYears}
                          {studentData?.studentDetails?.experienceInYears &&
                            "Year"}
                          {studentData?.studentDetails?.experienceInMonths &&
                            ", "}
                          {studentData?.studentDetails?.experienceInMonths}{" "}
                          {studentData?.studentDetails?.experienceInMonths &&
                            "Month"}
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
                        Hour / week{" "}
                        <span className="result">
                          {studentData?.studentDetails?.workHoursPerWeek}
                          {studentData?.studentDetails?.workHoursPerWeek &&
                            " hour"}
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
                  <div className="profile-strength">
                    {/* <div className="profile-strength-inner">
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
                    </div> */}
                  </div>
                </div>
                <ImageCropperModal
                  closeModal={closeModal}
                  showImageCropModal={modal}
                  imageSrc={img.personalInfoImg}
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
                                      label="First Name"
                                      placeholder="Enter first name"
                                      component={renderField}
                                      disabled
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="lastname"
                                      label="Last Name"
                                      placeholder="Enter last name"
                                      component={renderField}
                                      disabled
                                    />
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
                                      name="age"
                                      label="Age"
                                      placeholder="Enter age"
                                      component={renderNumberField}
                                      pattern="[0-9]*"
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
                                    <label>Phone Number</label>
                                    <Field
                                      name="companyPhone"
                                      placeholder="Enter Phone Number"
                                      label="Phone Number"
                                      value={phoneNumberFlag}
                                      onChange={setphoneNumberFlag}
                                      component={RenderPhoneInput}
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="zipCode"
                                      placeholder="Enter zip code"
                                      label="Zip Code"
                                      component={renderNumberField}
                                      pattern="[0-9]*"
                                    />
                                  </div>
                                  <div className="form-field flex50">
                                    {/* <div className="timezone--wrapper">
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
                                    </div> */}
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
                                  <div className="form-field flex100">
                                    <Field
                                      name="qualificationId"
                                      label="Education course"
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
                                        component={renderField}
                                      />
                                    </div>
                                  )}
                                  <div className="form-field flex100">
                                    <label>Course Status</label>
                                    <div className="radio-button-groupss absolute-error">
                                      <Field
                                        name="courseStatus"
                                        value="ongoing"
                                        component={RenderRadioButtonField}
                                        type="radio"
                                        onChange={handleCourseStatus}
                                        currentIndex="0"
                                      >
                                        On-Going
                                      </Field>
                                      <Field
                                        name="courseStatus"
                                        value="completed"
                                        component={RenderRadioButtonField}
                                        type="radio"
                                        onChange={handleCourseStatus}
                                        currentIndex="1"
                                      >
                                        Completed
                                      </Field>
                                    </div>
                                  </div>
                                  {courseStatus && (
                                    <div className="form-field flex50">
                                      <Field
                                        name="startDate"
                                        label="Start Date"
                                        placeholder="Enter start date"
                                        component={renderField}
                                        type="date"
                                        max={date}
                                      />
                                    </div>
                                  )}
                                  {courseStatus &&
                                    values.courseStatus == "completed" && (
                                      <div className="form-field flex50">
                                        <Field
                                          name="endDate"
                                          label="End Date"
                                          placeholder="Enter end date"
                                          component={renderField}
                                          type="date"
                                          min={values?.startDate}
                                          disabled={
                                            !values.startDate ? true : false
                                          }
                                          max={date}
                                        />
                                      </div>
                                    )}
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
                                  <div className="form-field flex100">
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
                                      {collegeList2.length > 0 &&
                                        collegeList2.map((college, i) => (
                                          <option
                                            value={college.collegeId}
                                            key={i}
                                          >
                                            {college.name}
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                  {inputField2 && (
                                    <div className="form-field flex100">
                                      <Field
                                        name="collegeOthers"
                                        component={renderField}
                                      />
                                    </div>
                                  )}
                                  <div className="form-field flex50">
                                    <Field
                                      name="experienceInYears"
                                      component={renderSelect}
                                      label="Experience in Year"
                                    >
                                      {/* <option value="0">0 year</option> */}
                                      {[...Array.from(Array(51).keys())]
                                        // .slice(1)
                                        .map((num, i) => (
                                          <option key={i} value={num}>
                                            {/* {num ? num + " year" : ""} */}
                                            {(num && num < 10) || num == 0
                                              ? `0${num} year`
                                              : `${num} year`}
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                  <div className="form-field flex50">
                                    <Field
                                      name="experienceInMonths"
                                      component={renderSelect}
                                      label="Experience in Month"
                                    >
                                      {[...Array.from(Array(12).keys())].map(
                                        (num, i) => (
                                          <option key={i} value={num}>
                                            {(num && num < 10) || num == 0
                                              ? `0${num} month`
                                              : `${num} month`}
                                          </option>
                                        )
                                      )}
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
                                      <div className="form-field flex50">
                                        <Field
                                          name="hours"
                                          placeholder="Hours"
                                          label="Hours / week (Available)"
                                          component={renderSelect}
                                        >
                                          <option value="" disabled>
                                            Select hours
                                          </option>
                                          {[...Array.from(Array(51).keys())]
                                            .slice(1)
                                            .map((num, i) => (
                                              <option key={i} value={num}>
                                                {num && num < 10
                                                  ? `0${num} hour`
                                                  : `${num} hour`}
                                              </option>
                                            ))}
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-field flex100">
                                    <Field
                                      name="categoryOfJob"
                                      label="Category of Job"
                                      component={renderField}
                                    />
                                  </div>
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
                                  </div>
                                  {locationCheck && (
                                    <div className="form-field flex100">
                                      <Field
                                        name="location"
                                        label="Location"
                                        placeholder="Enter job location"
                                        component={renderField}
                                      />
                                    </div>
                                  )}
                                  {timezoneCheck && (
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
                                      </div>{" "}
                                    </div>
                                  )}
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
                                    <p style={{ color: "red" }}>
                                      {err?.resumeFile}
                                    </p>
                                    <ul className="uploaded-documents">
                                      <li>
                                        {updatedResumeName
                                          ? updatedResumeName
                                          : resumeName}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="form-field flex100">
                                    <label className="d-block">
                                      Cover Letter
                                    </label>
                                    <div className="file-upload-placehlder">
                                      <input
                                        name="coverLetter"
                                        uploadlabel="Browse Cover Letter file"
                                        accept=".jpg, .jpeg, .png, application/pdf, .doc"
                                        type="file"
                                        onChange={coverLetterHandler}
                                      />
                                      <span>Upload Cover Letter</span>
                                    </div>
                                    <p style={{ color: "red" }}>
                                      {err?.coverLetter}
                                    </p>
                                    <ul className="uploaded-documents">
                                      <li>
                                        {coverName
                                          ? coverName
                                          : updatedCoverName}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                          <div className="form-field flex100 mb-5 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-save btn-primary"
                              disabled={loadingUpdate ? true : false}
                            >
                              {loadingUpdate && (
                                <div className="button-submit-loader">
                                  <Loader />
                                </div>
                              )}{" "}
                              {editData.isProfileCompleted
                                ? "Update"
                                : "Submit"}
                            </button>
                          </div>
                        </>
                      )}
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
