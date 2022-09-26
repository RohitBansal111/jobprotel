import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import titles from "./login.json";
import Logo from "./../../assets/images/logo.png";
import validate from "./loginValidator";
import { renderField } from "../../components/renderField";
import toast from "toastr";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/action/authActions";

const Login = () => {
  let titleStrings = new LocalizedStrings(titles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  toast.options = { preventDuplicates: true };
  const [login, setLogin] = useState({
    termsPrivacy: false,
  });

  const [showPassword, setShowPassword] = useState(true);

  const { termsPrivacy } = login;
  const handlePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (values) => {
    if (!termsPrivacy) {
      toast.error("Please accept terms policy first.");
    }
    if (values.userName !== "" && values.password !== "" && termsPrivacy) {
      dispatch(authActions.login(values, navigate));
    }
  };

  const handleInputChange = (event) => {
      setLogin({termsPrivacy: event.target.checked})
    // const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;

    // setLogin({
    //   ...login,
    //   [name]: value,
    // });
  };

  return (
    <div className="page-wrapper">
      <div className="register-page-main">
        <div className="register-sidebar">
          <div className="register-info-steps justify-content-start">
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
              <h5 className="text-white mt-5 d-flex">
                <i className="fa fa-user me-2"></i>Enter your email id and
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
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="form-field-group">
                        <div className="form-field flex100">
                          <Field
                            name="userName"
                            label={titleStrings.emailTitle}
                            component={renderField}
                            placeholder="Enter email address"
                            type="text"
                          />
                        </div>
                        <div className="form-field flex100">
                          <Field
                            name="password"
                            label={titleStrings.passwordTitle}
                            component={renderField}
                            placeholder="Enter password"
                            type={showPassword ? "password" : "text"}
                          >
                            <span className="eye-btn">
                              {showPassword ? (
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
                          </Field>
                        </div>
                        <div className="form-field flex100">
                          <input
                            type="checkbox"
                            name="termsPrivacy"
                            checked={termsPrivacy && termsPrivacy}
                            onChange={handleInputChange}
                          />{" "}
                          I have read and agree to the{" "}
                          <Link to="/policy">
                            <b>Privacy Policy</b>
                          </Link>{" "}
                          and Tracking Policy. Our{" "}
                          <Link to="/terms">
                            <b> Terms & Conditions</b>
                          </Link>{" "}
                          apply.
                          <span className="checkmarks"></span>
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
