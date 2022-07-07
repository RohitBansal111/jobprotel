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

const Register = () => {
  const navigate = useNavigate();
  const [currentPage, setPage] = useState(0);
  const [activeRole, setActiveRole] = useState("Student");
  const [array, setArray] = useState([]);
  const [countrylist, setCountrylist] = useState([]);
  const [collegeList, setCollegelist] = useState([]);
  const [genderList, setGenderlist] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [skills, setSkills] = useState([]);

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
    email: "",
    expectedSalary: "",
    experienceInYears: "",
    experienceInMonths: "",
    firstName: "",
    genderId: "14ce6a75-7a2f-426e-a214-96a6a79a95mal",
    interests: [],
    lastName: "",
    password: "",
    profileImage: null,
    qualificationId: "",
    resumeFile: null,
    roles: "",
    stateId: "",
    timezone: "",
    workHoursPerDay: "",
    workingType: "",
    extraCertificateFile: null,
    skills: [],
    category: "",
  });
  const [next, setNext] = useState(false);

  const [employer, setEmployer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    logoUrl: null,
    address: "",
    recruitingManagerName: "",
    companyPhone: "",
    roles: "",
    phone: "1212343123",
    companyEmail: "ASD@gmail.com",
    companyName: "asdfg",
  });

  const [completeEmpInfo, setCompleteEmpInfo] = useState(false);

  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const handleCaptchaCode = (captcha) => {
    setUserData({ ...userData, captcha: captcha });
  };

  const userPersonalInfo = (data) => {
    // let arr = []
    // {data.interests.map(interest => (
    //   arr.push(interest.text)
    // ))}
    // setSkills(arr)
    setUserData({ ...userData, ...data });
  };

  const uploadFile = (profileImage) => {
    setUserData({ ...userData, profileImage: profileImage });
    // let baseURL = "";
    // let reader = new FileReader();
    // reader.readAsDataURL(profileImage);
    // reader.onload = () => {
    //   baseURL = reader.result;
    //   // console.log(baseURL, "baseUrl..");
    //   setUserData({ ...userData, profileImage: baseURL });
    // };
  };

  const userProfessionalInfo = (data1) => {
    setUserData({ ...userData, ...data1 });
    finalSubmit();
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

  const handleTimezoneData = (data) => {
    setUserData({ ...userData, timezone: data });
  };

  const handleAgeChange = (e) => {
    let { name, value } = e.target;
    let data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setUserData({ ...userData, age: data });
    }
  };

  const handlePostalCodeChange = (e) => {
    let { name, value } = e.target;
    let data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setUserData({ ...userData, PostalCode: data });
    }
  };

  const handleSalaryExpectations = (e) => {
    let { name, value } = e.target;
    let data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setUserData({ ...userData, expectedSalary: data });
    }
  };

  const finalSubmit = async () => {
    if (userData.workHoursPerDay !== "") {
      let user = userData;
      console.log(user);

      let interestsArr = [];
      user.interests.map((interest) =>
        // console.log(interest.text)
        interestsArr.push(interest.text)
      );

      let skillsArr = [];
      user.skills.map((skill) =>
        // console.log(skill.text)
        skillsArr.push(skill.text)
      );

      //{...userData, interests: interestsArr, skills: skillsArr}
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
      formData.append("captcha", userData.captcha);
      formData.append("city", userData.city);
      formData.append("collegeId", userData.collegeId);
      formData.append("confirmPassword", userData.confirmPassword);
      formData.append("countryId", userData.countryId);
      formData.append("email", userData.email);
      formData.append("expectedSalary", userData.expectedSalary);
      formData.append("experienceInYears", userData.experienceInYears);
      formData.append("experienceInMonths", userData.experienceInMonths);
      formData.append("firstName", userData.firstName);
      formData.append("genderId", userData.genderId);
      // formData.append("interests",userData.interests)
      for (var i = 0; i < interestsArr.length; i++) {
        formData.append(`interests[${i}]`, interestsArr[i]);
      }
      formData.append("lastName", userData.lastName);
      formData.append("password", userData.password);
      formData.append("profileImage", userData.profileImage);
      formData.append("qualificationId", userData.qualificationId);

      formData.append("qualification", "BCA");

      formData.append("resumeFile", userData.resumeFile);
      formData.append("roles", userData.roles);
      formData.append("stateId", userData.stateId);
      formData.append("timezone", userData.timezone);
      formData.append("workHoursPerDay", userData.workHoursPerDay);
      formData.append("workingType", userData.workingType);
      // formData.append("extraCertificateFile",userData.extraCertificateFile)
      for (var i = 0; i < userData.extraCertificateFile.length; i++) {
        formData.append(
          `extraCertificateFile[${i}]`,
          userData.extraCertificateFile[i]
        );
      }
      // formData.append("skills",userData.skills)
      for (var i = 0; i < skillsArr.length; i++) {
        formData.append(`skills[${i}]`, skillsArr[i]);
      }
      // formData.append("skills",userData.skills)
      formData.append("category", userData.category);

      const resp = await authServices.registerUser(formData);
      console.log(resp);

      if (resp && resp.status == 200) {
        navigate("/");
        alert(resp.data.message);
      }
    }
  };

  // Employer Section starts here****
  const employerBasicInfo = (data) => {
    setEmployer({ ...employer, ...data });
  };

  const EmployerCompleteInfo = (data) => {
    if (employer.recruitingManagerName !== "") {
      setEmployer({ ...employer, ...data });
    }
    setCompleteEmpInfo(true);
  };

  const uploadLogoFile = (data) => {
    setEmployer({ ...employer, logoUrl: data });
  };

  const compPhoneChange = (e) => {
    let { name, value } = e.target;
    let data = e.target.validity.valid ? value : undefined;
    if (data !== undefined) {
      setEmployer({ ...employer, companyPhone: data });
    }
  };

  const finalSubmitEmployer = async () => {
    let formData = new FormData();
    formData.append("firstName", employer.firstName);
    formData.append("lastName", employer.lastName);
    formData.append("email", employer.email);
    formData.append("password", employer.password);
    formData.append("confirmPassword", employer.confirmPassword);
    formData.append("logoUrl", employer.logoUrl);
    formData.append("address", employer.address);
    formData.append("recruitingManagerName", employer.recruitingManagerName);
    formData.append("companyPhone", employer.companyPhone);
    formData.append("roles", employer.roles);
    formData.append("phone", "1212343123",)
    formData.append("companyEmail", "ASD@gmail.com");
    formData.append("companyName", "asdfg");

    const resp = await authServices.registerEmployer(formData);
    if (resp && resp.status == 200) {
      navigate("/");
      alert(resp.data.message);
    }
  };

  useEffect(() => {
    if (completeEmpInfo) {
      finalSubmitEmployer();
    }
  }, [completeEmpInfo]);

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
    setCollegelist(collegeList.data);
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
              <img src={Logo} alt="Real Job" />
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
                      <h5>Complete Information</h5>
                      <p>Please add complete the profile</p>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
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
                    next={next}
                    handleCaptchaCode={handleCaptchaCode}
                  />
                )}
                {currentPage === 2 && (
                  <Step2
                    prevPage={prevPage}
                    nextPage={nextPage}
                    userPersonalInfo={userPersonalInfo}
                    data={userData}
                    setUserData={setUserData}
                    next={next}
                    uploadFile={uploadFile}
                    countrylist={countrylist}
                    handleTimezoneData={handleTimezoneData}
                    handleAgeChange={handleAgeChange}
                    handlePostalCodeChange={handlePostalCodeChange}
                    genderList={genderList}
                    skillslist={skillslist}
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
                    handleSalaryExpectations={handleSalaryExpectations}
                    skillslist={skillslist}
                  />
                )}
              </div>
            )}
            {activeRole && activeRole === "Employer" && (
              <div className="studen-section">
                {currentPage === 1 && (
                  // <EmployerStep1 prevPage={prevPage} nextPage={nextPage} />
                  <EmployerStep1
                    prevPage={prevPage}
                    nextPage={nextPage}
                    next={next}
                    data={employer}
                    employerBasicInfo={employerBasicInfo}
                  />
                )}
                {currentPage === 2 && (
                  // <EmployerStep2 prevPage={prevPage} nextPage={nextPage} />
                  <EmployerStep2
                    prevPage={prevPage}
                    nextPage={nextPage}
                    userProfessionalInfo={userProfessionalInfo}
                    EmployerCompleteInfo={EmployerCompleteInfo}
                    uploadLogoFile={uploadLogoFile}
                    compPhoneChange={compPhoneChange}
                    employer={employer}
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
