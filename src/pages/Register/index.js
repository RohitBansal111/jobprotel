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

const Register = () => {
  const navigate = useNavigate();
  const [currentPage, setPage] = useState(0);
  const [activeRole, setActiveRole] = useState("Student");
  const [userData, setUserData] = useState({
    PostalCode: "",
    address: "Chandigarh",
    addressLine1: "",
    addressLine2: "",
    age: "",
    captcha: "",
    cityId: "9810c63c-d0e4-11ec-b3e2-8c8caafbad72",
    collegeId: "1d7a193b-d0e5-11ec-b3e2-8c8caafbad72",
    confirmPassword: "",
    email: "",
    expectedSalary: "",
    experienceInYears: "",
    experienceInMonths: "",
    firstName: "",
    genderId: "14ce6a75-7a2f-426e-a214-96a6a79a95fd",
    interests: [],
    lastName: "",
    password: "",
    profileImage: "",
    qualificationId: "006c89a2-d0e5-11ec-b3e2-8c8caafbad72",
    resumeFile: null,
    roles: activeRole,
    timezone: "",
    workHoursPerDay: "",
    workingType: "0",
    // gender:"Male",
    // qualification:"",
    // extraCertificateFile:null,
    skills: [],
    category: "",
  });
  const [next, setNext] = useState(false);

  // console.log(userData.interests[0].text.toString())
  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const handleCaptchaCode = (captcha) => {
    setUserData({ ...userData, captcha });
  };

  const userPersonalInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const uploadFile = (profileImage) => {
    // console.log(profileImage)

    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(profileImage);

    // on reader load something...
    reader.onload = () => {
      console.log("Called", reader);
      baseURL = reader.result;
      console.log(baseURL);
    };
    // const profileImage = new FormData();
    // profileImage.append("profileImage", data);
    setUserData({ ...userData, baseURL });
  };

  const userProfessionalInfo = (data1) => {
    setUserData({ ...userData, ...data1 });
    finalSubmit();
  };

  const uploadExtraCertificateFile = (data) => {
    const extraCertificateFile = new FormData();
    extraCertificateFile.append("extraCertificateFile", data);
    setUserData({ ...userData, extraCertificateFile });
  };

  const uploadResumeFile = (data) => {
    const resumeFile = new FormData();
    resumeFile.append("resumeFile", data);
    setUserData({ ...userData, resumeFile });
  };

  const nextPage = () => {
    setPage((prev) => ++prev);
  };

  const prevPage = () => {
    setNext(true);
    setPage((prev) => --prev);
  };

  const handleRole = (role) => {
    console.log(role);
    setActiveRole(role);
  };

  const finalSubmit = async () => {
    if (userData.workHoursPerDay !== "") {
      const resp = await authServices.registerUser(userData);
      console.log(resp);

      if (resp && resp.status == 200) {
        navigate("/");
        alert(resp.data.message);
      }
    }
  };

  // Employer Section starts here
  const [employer, setEmployer] = useState([])
  const employerInfo = (data) => {
    console.log(data, "datra");
    setEmployer({ ...employer, ...data });
  };

  const EmplyeCompleteInfo = (data) => {
    console.log(data, "data1");
    setEmployer({ ...employer, ...data });
    finalSubmits();
    // setPage(0);
    nextPage();
  };

  const uploadExtraCertificateFiles = (data1) => {
    console.log(data1, "file");
    const extraCertificateFile = new FormData();
    extraCertificateFile.append("extraCertificateFile", data1);
    setEmployer({ ...employer, extraCertificateFile });
  };
  const finalSubmitEmployer = async (signIn) => {
    console.log(employer, "cc");
    // const resp = await SignUpService.registerUser(userData);
    //   console.log(resp, "called");
    alert("Data Submitted Successfully");
    // navigate("/");
    // console.log(userData);
  };

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
                    next={next}
                    uploadFile={uploadFile}
                  />
                )}
                {currentPage === 3 && (
                  <Step3
                    prevPage={prevPage}
                    userProfessionalInfo={userProfessionalInfo}
                    uploadExtraCertificateFile={uploadExtraCertificateFile}
                    uploadResumeFile={uploadResumeFile}
                    data={userData}
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
                  employerInfo={employerInfo}
                />
                )}
                {currentPage === 2 && (
                  // <EmployerStep2 prevPage={prevPage} nextPage={nextPage} />
                  <EmployerStep2
                  prevPage={prevPage}
                  nextPage={nextPage}
                  userProfessionalInfo={userProfessionalInfo}
                  EmplyeCompleteInfo={EmplyeCompleteInfo}
                  uploadExtraCertificateFile={uploadExtraCertificateFiles}
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
