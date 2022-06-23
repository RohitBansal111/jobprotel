import React, { useState } from "react";
import { useNavigate } from "react-router";
import EmployerStep1 from "../../components/EmployerRegister/EmployerStep1";
import EmployerStep2 from "../../components/EmployerRegister/EmployerStep2";
import ChooseRole from "../../components/Register/chooseRole";
import Step1 from "../../components/Register/Step1";
import Step2 from "../../components/Register/Step2";
import Step3 from "../../components/Register/Step3";
import Logo from "./../../assets/images/logo.png";
import * as SignUpService from "../../services/userRegister.Service";

const Register = () => {
  const navigate = useNavigate();
  const [currentPage, setPage] = useState(0);
  const [activeRole, setactiveRole] = useState("student");
  const [userData, setUserData] = useState({
    profileImage: null,
    resumeFile: null,
    gender: "Female",
  });
  const [next, setNext] = useState(false);

  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const handleCaptchaCode = (captcha) => {
    setUserData({ ...userData, captcha });
  };

  const userPersonalInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const uploadFile = (data) => {
    const personalInfoFile = new FormData();
    personalInfoFile.append("personalInfoFile", data);
    setUserData({ ...userData, personalInfoFile });
  };

  const userProfessionalInfo = (data1) => {
    if (currentPage === 3 && data1) {
      setUserData({ ...userData, ...data1 });
      finalSubmit();
      // setPage(0);
    } else {
      nextPage();
    }
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
  const finalSubmit = async (signIn) => {
    //   const resp = await SignUpService.registerUser(userData);
    //   console.log(resp, "called");
    alert("Data Submitted Successfully")
    navigate("/");
    // console.log(userData);
  };
  console.log(userData);

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
              {activeRole === "student" && (
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

              {activeRole === "employer" && (
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
                selectRole={setactiveRole}
              />
            )}
            {activeRole && activeRole === "student" && (
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
                  />
                )}
              </div>
            )}
            {activeRole && activeRole === "employer" && (
              <div className="studen-section">
                {currentPage === 1 && (
                  <EmployerStep1 prevPage={prevPage} nextPage={nextPage} />
                )}
                {currentPage === 2 && (
                  <EmployerStep2
                    prevPage={prevPage}
                    nextPage={nextPage}
                    userProfessionalInfo={userProfessionalInfo}
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
