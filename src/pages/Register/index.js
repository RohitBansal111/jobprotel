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
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    captcha: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    roles: "",
  });
  const [next, setNext] = useState(false);

  const userBasicInfo = (data) => {
    setUserData({ ...userData, ...data });
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
  
  const handleSubmit = async (data) => {
    if (activeRole == "Employer") {
      data.roles = 2;
    } else {
      data.roles = 1;
    }

    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("userRoleType", data.roles);

    const resp = await authServices.registerUser(formData);
    // console.log(resp, ":::");

    if (resp.status == 200) {
      toast.success(
        resp?.data?.message ? resp.data.message : "Something went wrong"
      );
      setTimeout(() => {
        navigate("/");
        toast.success("verification mail has been sent to your email");
      }, 5000);
    } else {
      toast.error(
        resp?.data?.message ? resp.data.message : "Something went wrong"
      );
    }

    // if (resp && resp.status == 200) {
    //   setLoading(false);
    //   toast.success(
    //     resp.data.message ? resp.data.message : "Something went wrong"
    //   );
    //   navigate("/");
    // } else {
    //   setLoading(false);
    //   if (resp.errors && typeof resp.errors === "object") {
    //     let errors = "";
    //     let keys = Object.keys(resp.errors);
    //     keys.forEach((key) => {
    //       errors = key + "," + errors;
    //     });

    //     errors = errors.replace(/,\s*$/, "");
    //     toast.error(errors + "is Required");
    //   } else if (resp.error) {
    //     toast.error(resp.error ? resp.error : "Something went wrong");
    //   }
    // }
  };

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
                      <h5>Account Verification</h5>
                      <p>Please verify your account via mail</p>
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
              />
            )}

            <div className="studen-section">
              {currentPage === 1 && (
                <Step1
                  prevPage={prevPage}
                  handleSubmit={handleSubmit}
                  userBasicInfo={userBasicInfo}
                  data={userData}
                  role={activeRole}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
