import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EmployerStep1 from "../../components/EmployerRegister/EmployerStep1";
import EmployerStep2 from "../../components/EmployerRegister/EmployerStep2";
import ChooseRole from "../../components/Register/chooseRole";
import Step1 from "../../components/Register/Step1";
import Step2 from "../../components/Register/Step2";
import Step3 from "../../components/Register/Step3";
import Logo from "./../../assets/images/logo.png";
import * as authServices from "../../services/authServices";
import * as dropdownData from "../../services/dropDownServices";
import toast from "toastr";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  toast.options = { preventDuplicates: true };
  const [currentPage, setPage] = useState(0);
  const [activeRole, setActiveRole] = useState("Student");
  const [array, setArray] = useState([]);
  const [countrylist, setCountrylist] = useState([]);
  const [collegeList, setCollegelist] = useState([]);
  const [genderList, setGenderlist] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    PostalCode: "",
    address: "",
    addressLine1: "",
    addressLine2: "",
    age: "",
    captcha: "",
    city: "",
    collegeId: "",
    confirmPassword: "",
    countryId: "",
    certificate: "No",
    designation: "",
    email: "",
    expectedSalary: "",
    experienceInYears: "",
    experienceInMonths: "",
    firstName: "",
    genderId: "",
    interests: [],
    lastName: "",
    password: "",
    profileImage: null,
    profileImageUrl: "",
    qualificationId: "",
    qualification: "",
    resumeFile: null,
    roles: "",
    stateId: "",
    timezone: "",
    workHoursPerDay: "",
    workDaysPerWeek: "",
    workingType: "1",
    extraCertificateFile: null,
    resumeFileName: "",
    extraCertificateArray: [],
    skills: [],
  });
  const [next, setNext] = useState(false);

  const [employer, setEmployer] = useState({
    firstName: "",
    lastName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    logoUrl: "",
    logoImageUrl: "",
    address: "",
    recruitingManagerName: "",
    companyPhone: "",
    countryId: "",
    stateId: "",
    city: "",
    roles: "",
    // companyEmail: "Aslam11@gmail.com",
    companyName: "",
  });

  const [completeEmpInfo, setCompleteEmpInfo] = useState(false);

  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const userPersonalInfo = (data) => {
    console.log(data);
    setUserData({ ...userData, ...data });
  };
  const initialPersonalInfo = (data) => {
    setUserData({ ...employer, ...data });
  };
  const userProfessionalInfo = (data1) => {
    setUserData({ ...userData, ...data1 });
    finalSubmit({ ...userData, ...data1 });
  };

  const handlechangeCollege = async(data) => {
    const resp = await dropdownData.collegeList(data);
    // console.log(resp, ":::")
    if(resp.status == 200) {
      setCollegelist(resp.data)
    }
  }
  const initialProfInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const initialEmpStep2 = (data) => {
    setEmployer({ ...employer, ...data });
  };

  const uploadExtraCertificateFile = async (extraCertificate) => {
    setUserData({ ...userData, extraCertificateFile: [...extraCertificate] });
    // let result = [...extraCertificate];
    // let ar = [];
    // const count = result.length;
    // const dt =
    //   (await result) &&
    //   result.map((img) => {
    //     let fileReader = new FileReader();
    //     fileReader.readAsDataURL(img);
    //     fileReader.onloadend = async () => {
    //       let res = await fileReader.result;
    //       ar.push(res);
    //       if (count == ar.length) {
    //         setUserData({ ...userData, extraCertificateFile: [...ar] });
    //       }
    //     };
    //   });
  };

  const uploadResumeFile = (data) => {
    setUserData({ ...userData, resumeFile: data });

    // let baseURL = "";
    // let reader = new FileReader();
    // reader.readAsDataURL(data);
    // reader.onload = () => {
    //   baseURL = reader.result;
    //   setUserData({ ...userData, resumeFile: baseURL });
    // };
  };

  const nextPage = () => {
    setPage((prev) => ++prev);
  };

  const prevPage = () => {
    setNext(true);
    setPage((prev) => --prev);
  };

  const handleRole = (role) => {
    setActiveRole(role);
  };

  const finalSubmit = async (userData) => {
    if (userData.workHoursPerDay !== "") {
      let user = userData;

      let interestsArr = [];
      user.interests &&
        user.interests.map((interest) => interestsArr.push(interest.text));

      let skillsArr = [];
      user.skills && user.skills.map((skill) => skillsArr.push(skill.text));

      let formData = new FormData();
      // let keys= Object.keys(userData);

      // keys.forEach(key => {
      // formData.append(key, userData[key]);
      // })

      formData.append("PostalCode", userData.PostalCode);
      formData.append("address", userData.address);
      formData.append("addressLine1", userData.addressLine1);
      formData.append("addressLine2", userData.addressLine2);
      formData.append("age", userData.age);
      formData.append("city", userData.city);
      formData.append("collegeId", userData.collegeId);
      formData.append("confirmPassword", userData.confirmPassword);
      formData.append("countryId", userData.countryId);
      formData.append("designationId", userData.designation);
      formData.append("email", userData.email);
      formData.append("expectedSalary", userData.expectedSalary);
      formData.append("experienceInYears", userData.experienceInYears);
      formData.append("experienceInMonths", userData.experienceInMonths);
      formData.append("firstName", userData.firstName);
      formData.append("genderId", userData.genderId);
      for (var i = 0; i < interestsArr.length; i++) {
        formData.append(`interests[${i}]`, interestsArr[i]);
      }
      formData.append("lastName", userData.lastName);
      formData.append("password", userData.password);
      formData.append("profileImage", userData.profileImage);
      if (userData.qualificationId == "Other") {
        formData.append("qualification", userData.qualification);
      } else {
        formData.append("qualificationId", userData.qualificationId);
      }

      formData.append("resumeFile", userData.resumeFile);
      formData.append("roles", userData.roles);
      formData.append("stateId", userData.stateId);
      formData.append("timezone", JSON.stringify(userData.timezone));
      formData.append("workHoursPerDay", userData.workHoursPerDay);
      formData.append("workDaysPerWeek", userData.workDaysPerWeek);
      formData.append("workingType", userData.workingType);
      if (
        userData.extraCertificateFile &&
        userData.extraCertificateFile.length > 0
      ) {
        for (var i = 0; i < userData.extraCertificateFile.length; i++) {
          formData.append(
            `ExtraCertificates[${i}].Title`,
            userData.extraCertificateFile[i].title
          );
          formData.append(
            `ExtraCertificates[${i}].Certificates`,
            userData.extraCertificateFile[i].certificates
          );
        }
      }
      for (var i = 0; i < skillsArr.length; i++) {
        formData.append(`skills[${i}]`, skillsArr[i]);
      }

      const resp = await authServices.registerUser(formData);

      if (resp && resp.status == 200) {
        setLoading(false);
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
        navigate("/");
      } else {
        setLoading(false);
        if (resp.errors && typeof resp.errors === "object") {
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
      }
    }
  };

  // Employer Section starts here****
  const employerBasicInfo = (data) => {
    setEmployer({ ...employer, ...data });
  };

  const EmployerCompleteInfo = (data, phoneNumberFlag, img) => {
    setEmployer({
      ...employer,
      ...data,
      companyPhone: phoneNumberFlag,
      logoUrl: img.personalInfoImg,
    });
    // setCompleteEmpInfo(true);
    finalSubmitEmployer({
      ...employer,
      ...data,
      companyPhone: phoneNumberFlag,
      logoUrl: img.personalInfoImg,
    });
  };

  const finalSubmitEmployer = async (employer) => {
    let formData = new FormData();
    formData.append("address", employer.address);
    formData.append("recruitingManagerName", employer.recruitingManagerName);
    formData.append("companyPhone", employer.companyPhone);
    formData.append("companyName", employer.companyName);
    formData.append("countryId", employer.countryId);
    formData.append("stateId", employer.stateId);
    formData.append("cityName", employer.city);
    formData.append("firstName", employer.firstName);
    formData.append("lastName", employer.lastName);
    formData.append("companyEmail", employer.companyEmail);
    formData.append("email", employer.companyEmail);
    formData.append("password", employer.password);
    formData.append("confirmPassword", employer.confirmPassword);
    formData.append("logoUrl", employer.logoUrl);
    formData.append("roles", employer.roles);

    const resp = await authServices.registerEmployer(formData);
    if (resp && resp.status == 200) {
      setLoading(false);
      navigate("/");
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
    } else {
      setLoading(false);
      if (resp.errors && typeof resp.errors === "object") {
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
    }
  };

  // useEffect(() => {
  //   if (completeEmpInfo) {
  //     finalSubmitEmployer(employer);
  //   }
  // }, []);

  useEffect(async () => {
    const countryList = await dropdownData.countryList();
    const collegeList = await dropdownData.collegeList();
    const genderList = await dropdownData.genderList();
    const skillsList = await dropdownData.skillsList();

    let skillListData = [];
    skillsList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      skillListData.push(obj);
    });
    // setCollegelist(collegeList.data);
    setCountrylist(countryList.data);
    setGenderlist(genderList.data);
    setSkillslist(skillListData);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="register-page-main">
        <div className="register-sidebar">
          <div className="register-info-steps">
            <div className="brand-media">
              <Link to="/">
                <img src={Logo} alt="Real Job" />
              </Link>
            </div>
            <div className="register-content">
              <h1 className="text-white mb-4">Welcome to Jobs Portal</h1>
              <h3 className="text-white">
                #1 Intelligent time tracking application for jobs
              </h3>
              {activeRole === "Student" && (
                <ul className="resgiter-listing-steps">
                  <li
                    className={
                      currentPage === 0
                        ? "active"
                        : currentPage === 1 ||
                          currentPage === 2 ||
                          currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Choose role</h5>
                      <p>Choose your journey to proceed</p>
                    </div>
                  </li>
                  <li
                    className={
                      currentPage === 1
                        ? "active"
                        : currentPage === 2 || currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Basic Information</h5>
                      <p>Please provide your Name and email</p>
                    </div>
                  </li>
                  <li
                    className={
                      currentPage === 2
                        ? "active"
                        : currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Personal Information</h5>
                      <p>Please provide address, qualification etc</p>
                    </div>
                  </li>
                  <li className={currentPage === 3 ? "active" : ""}>
                    <div className="register-steps">
                      <h5>Professional Information</h5>
                      <p>Please provide vour experience colleae details etc</p>
                    </div>
                  </li>
                </ul>
              )}

              {activeRole === "Employer" && (
                <ul className="resgiter-listing-steps">
                  <li
                    className={
                      currentPage === 0
                        ? "active"
                        : currentPage === 1 ||
                          currentPage === 2 ||
                          currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Choose role</h5>
                      <p>Choose your journey to proceed</p>
                    </div>
                  </li>
                  <li
                    className={
                      currentPage === 1
                        ? "active"
                        : currentPage === 2 || currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Basic Information</h5>
                      <p>Please provide your Name and email</p>
                    </div>
                  </li>
                  <li
                    className={
                      currentPage === 2
                        ? "active"
                        : currentPage === 3
                        ? "finish"
                        : ""
                    }
                  >
                    <div className="register-steps">
                      <h5>Company Information</h5>
                      <p>Please add complete the profile</p>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="data-loader">
            <Loader />
          </div>
        ) : null}
        <div className="register-form-area">
          <div className="register-form-boxen">
            {currentPage === 0 && (
              <ChooseRole
                nextPage={nextPage}
                role={activeRole}
                selectRole={handleRole}
                setUserData={setUserData}
                setEmployer={setEmployer}
              />
            )}
            {activeRole && activeRole === "Student" && (
              <div className="studen-section">
                {currentPage === 1 && (
                  <Step1
                    prevPage={prevPage}
                    nextPage={nextPage}
                    userBasicInfo={userBasicInfo}
                    data={userData}
                  />
                )}
                {currentPage === 2 && (
                  <Step2
                    prevPage={prevPage}
                    nextPage={nextPage}
                    userPersonalInfo={userPersonalInfo}
                    data={userData}
                    next={next}
                    countrylist={countrylist}
                    genderList={genderList}
                    skillslist={skillslist}
                    initialPersonalInfo={initialPersonalInfo}
                    handlechangeCollege={handlechangeCollege}
                  />
                )}
                {currentPage === 3 && (
                  <Step3
                    prevPage={prevPage}
                    userProfessionalInfo={userProfessionalInfo}
                    uploadExtraCertificateFile={uploadExtraCertificateFile}
                    uploadResumeFile={uploadResumeFile}
                    data={userData}
                    setArray={setArray}
                    collegeList={collegeList}
                    skillslist={skillslist}
                    next={next}
                    initialProfInfo={initialProfInfo}
                    setLoading={setLoading}
                  />
                )}
              </div>
            )}
            {activeRole && activeRole === "Employer" && (
              <div className="studen-section">
                {currentPage === 1 && (
                  <EmployerStep1
                    prevPage={prevPage}
                    nextPage={nextPage}
                    next={next}
                    data={employer}
                    employerBasicInfo={employerBasicInfo}
                  />
                )}
                {currentPage === 2 && (
                  <EmployerStep2
                    prevPage={prevPage}
                    nextPage={nextPage}
                    EmployerCompleteInfo={EmployerCompleteInfo}
                    employer={employer}
                    initialEmpStep2={initialEmpStep2}
                    countrylist={countrylist}
                    setLoading={setLoading}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
