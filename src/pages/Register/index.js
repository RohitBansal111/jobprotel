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
  const [userData, setUserData] = useState({
    PostalCode: "",
    address: "Chandigarh",
    addressLine1: "",
    addressLine2: "",
    age: "",
    captcha: "",
    // cityId: "9810c63c-d0e4-11ec-b3e2-8c8caafbad72",
    collegeId: "1d7a193b-d0e5-11ec-b3e2-8c8caafbad72",
    confirmPassword: "",
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
    // qualification:"",
    qualificationId: "",
    resumeFile: null,
    roles: "",
    timezone: "",
    workHoursPerDay: "",
    workingType: "",
    // gender:"Male",
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
    logoUrl: [],
    address: "",
    recruitingManagerName: "",
    companyPhone: "",
    roles: "",
    // phone: "",
    // companyEmail: "",
    // companyName: "",
  });

  const [completeEmpInfo, setCompleteEmpInfo] = useState(false);

  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const handleCaptchaCode = (captcha) => {
    setUserData({ ...userData, captcha: captcha });
  };

  const userPersonalInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const uploadFile = (profileImage) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(profileImage);
    reader.onload = () => {
      baseURL = reader.result;
      // console.log(baseURL, "baseUrl..");
      setUserData({ ...userData, profileImage: baseURL });
    };
  };

  const userProfessionalInfo = (data1) => {
    setUserData({ ...userData, ...data1 });
    finalSubmit();
  };

  const uploadExtraCertificateFile = (extraCertificate) => {
    console.log(extraCertificate)
    let result = [...extraCertificate];
    result &&
      result.map((img) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onloadend = async () => {
          let res = await fileReader.result;
          setArray([...array, res]);
        };
      });
    setUserData({ ...userData, extraCertificateFile : [...array] });
  };

  const uploadResumeFile = (data) => {
    // const resumeFile = new FormData();
    // resumeFile.append("resumeFile", data);

    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      baseURL = reader.result;
      // console.log(baseURL, "baseUrl..");
      setUserData({ ...userData, resumeFile: baseURL });
    };
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

  const handleTimezone = (data) => {
    setUserData({ ...userData, timezone: data });
  };

  const finalSubmit = async () => {
    console.log(userData);
    if (userData.workHoursPerDay !== "") {
      const resp = await authServices.registerUser(userData);
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

  const uploadExtraCertificateFiles = (data) => {
    console.log(data, "file");
    const logoUrl = new FormData();
    logoUrl.append("logoUrl", data);
    setEmployer({ ...employer, logoUrl });
  };

  const finalSubmitEmployer = async () => {
    console.log(employer, "employerData");
    alert("Data Submitted Successfully");
    const resp = await authServices.registerEmployer(employer);
    navigate("/");
  };

  useEffect(() => {
    if (completeEmpInfo) {
      finalSubmitEmployer();
    }
  }, [completeEmpInfo]);

  useEffect(async () => {
    const countryList = await dropdownData.countryList();
    setCountrylist(countryList.data);
  }, []);
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
                    setArray={setArray}
                    countrylist={countrylist}
                    handleTimezone={handleTimezone}
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
