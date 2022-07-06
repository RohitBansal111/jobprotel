import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import titles from "./login.json";
import Logo from "./../../assets/images/logo.png";
import validate from "./loginValidator";
import { renderField } from "../../components/renderField";
import { Link } from "react-router-dom";
import toast from "toastr";
import { useNavigate } from "react-router-dom";
import * as authServices from "../../services/authServices";
import { useState, useEffect } from "react";

const Login = () => {
  let titleStrings = new LocalizedStrings(titles);
  const navigate = useNavigate();
  toast.options = { preventDuplicates: true };
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    termsPrivacy: false,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(true);

  const { userName, password ,termsPrivacy} = login;
  const handlePassword = () => setShowLoginPassword(!showLoginPassword);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userName !== "" && password !== "") {
      // const resp = await authServices.loginUser(login);
      // console.log(resp, "response");
      // const response = resp.data.data;
      // if (resp.status == 200 && response.roles == "STUDENT") {
      //   navigate("/find-work");
      // } else if (resp.status == 200 && response.roles == "EMPLOYER") {
      //   navigate("/posted-jobs");
      // } else {
      //   // show error message..
      // }
    }
    if(!termsPrivacy)
    { 
      toast.error("Please accept terms policy first.");
    }
    
    if (userName && userName == "raj12@gmail.com" && password == "Admin@12" && termsPrivacy) {
      toast.success("Login Successfully");
      navigate("/find-work");
    } else if (
      userName &&
      userName == "sam1@gmail.com" &&
      password == "Admin@12" && 
      termsPrivacy
    ) {
      toast.success("Login Successfully");
      navigate("/posted-jobs");
    }
  };

  const handleInputChange=(event)=> {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setLogin({
      ...login,
      [name]: value,
    });
  }

  return (
    <div className="page-wrapper">
      <div className="register-page-main">
        <div className="register-sidebar">
          <div className="register-info-steps justify-content-start">
            <div className="brand-media">
              <img src={Logo} alt="Real Job" />
            </div>
            <div className="register-content">
              <h1 className="text-white mb-4">Welcome to Jobs Portal</h1>
              <h3 className="text-white">
                #1 Intelligent time tracking application for jobs
              </h3>
              <h5 className="text-white mt-5 d-flex">
                <i className="fa fa-user mr-2"></i>Enter your email id and
                password to get into your account.
              </h5>
            </div>
          </div>
        </div>
        <div className="register-form-area">
          <div className="register-form-boxen login-form-box">
            <div className="register-form">
              <h4 className="text-primary text-left">
                {titleStrings.pageTitle}
              </h4>
              <div className="form-main">
                <Form onSubmit={handleLogin} validate={validate}>
                  {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleLogin} autoComplete="off">
                      <div className="form-field-group">
                        <div className="form-field flex100">
                          <Field
                            name="userName"
                            label={titleStrings.emailTitle}
                            component={renderField}
                            placeholder="Enter email address"
                            type="text"
                            value={userName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field flex100">
                          <Field
                            name="password"
                            label={titleStrings.passwordTitle}
                            component={renderField}
                            placeholder="Enter password"
                            type={showLoginPassword ? "password" : "text"}
                            value={password}
                            onChange={handleChange}
                          >
                            {password !== "" && (
                              <span className="eye-btn">
                                {showLoginPassword ? (
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                    onClick={handlePassword}
                                  />
                                ) : (
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                    onClick={handlePassword}
                                  />
                                )}
                              </span>
                            )}
                          </Field>
                        </div>
                        <div className="form-field flex100">
                          {/* <label
                            id="termsPrivacy"
                            className="checkbox-wrap checkbox-primary mb-0"
                           > */}
                          <input type="checkbox" 
                          name="termsPrivacy"
                          checked={termsPrivacy && termsPrivacy}
                          onChange={handleInputChange} /> I have
                          read and agree to the{" "}
                          <Link to="/policy">
                            <b>Privacy Policy</b>
                          </Link>{" "}
                          and Tracking Policy. Our{" "}
                          <Link to="/terms">
                            <b> Terms &amp Conditions</b>
                          </Link>{" "}
                          apply.
                          <span className="checkmarks"></span>
                          {/* </label> */}
                        </div>
                        <div className="form-action w-100">
                          <button
                            type="submit"
                            className="btn btn-primary next-btn text-white text-center"
                          >
                            {" "}
                            {titleStrings.signInTitle}{" "}
                          </button>
                        </div>
                        <div className="form-field flex100 mt-2">
                          <div className="form-field-child">
                            <p className="content-link w-100 text-right">
                              <Link to="/forgot-password">Forgot Password</Link>
                            </p>
                          </div>
                        </div>
                        <div className="form-field flex100 mb-0">
                          <p className="content-link">
                            Don't have an account!{" "}
                            <Link to="/register"> Sign Up</Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
