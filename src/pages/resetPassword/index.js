import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, useParams, useHistory } from "react-router-dom";
import validate from "./resetPasswordValidator";
import Logo from "./../../assets/images/logo.png";
import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../../components/renderField";
import * as authServices from "../../services/authServices";
import toast from "toastr";

const ResetPassword = (props) => {
  // let titleStrings = new LocalizedStrings(titles);
  const [userToken, setUserToken] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(true);
  const [showLoginPassword2, setShowLoginPassword2] = useState(true);


  const handlePassword = () => setShowLoginPassword(!showLoginPassword);
  const handlePassword2 = () => setShowLoginPassword2(!showLoginPassword2);


  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    let token = query.get("token");

    setUserToken(token.split(" ").join("+"));
  }, [query]);

  const handleResetPassword = async (values) => {

    let data = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      token: userToken,
      email: values.email,
    };
    if (data.token) {
      const resp = await authServices.resetPassword(data);
      if (resp && resp.status == 200) {
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
        navigate("/");
      } else {
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
                <i className="fa fa-lock mr-2"></i>Share your registered email
                to get the magic link of reset password
              </h5>
            </div>
          </div>
        </div>
        <div className="register-form-area">
          <div className="register-form-boxen forgotP-form-box">
            <div className="register-form">
              <h4 className="text-primary text-left">
                <label>Reset Password</label>
                {/* {titleStrings.pageTitle} */}
              </h4>
              <div className="form-main">
                <Form onSubmit={handleResetPassword} validate={validate}>
                  {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-field-group">
                        <div className="form-field flex100">
                          <label>Email</label>
                          <Field
                            name="email"
                            component={renderField}
                            placeholder="Enter email address"
                            type="text"
                          />
                        </div>
                        <div className="form-field flex100">
                          <label>New Password</label>
                          <Field
                            name="password"
                            component={renderField}
                            placeholder="New Password"
                            type={showLoginPassword ? "password" : "text"}
                          >
                            {/* {password !== "" && ( */}
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
                            {/* )} */}
                          </Field>
                        </div>
                        <div className="form-field flex100">
                          <label>Confirm Password</label>
                          <Field
                            name="confirmPassword"
                            component={renderField}
                            placeholder="Confirm Password"
                            type={showLoginPassword2 ? "password" : "text"}
                          >
                            {/* {password !== "" && ( */}
                              <span className="eye-btn">
                                {showLoginPassword2 ? (
                                  <i
                                    className="fa fa-eye-slash"
                                    aria-hidden="true"
                                    onClick={handlePassword2}
                                  />
                                ) : (
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                    onClick={handlePassword2}
                                  />
                                )}
                              </span>
                            {/* )} */}
                          </Field>
                        </div>
                        <div className="form-action w-100">
                          <button
                            type="submit"
                            className="btn btn-primary next-btn text-white text-center"
                          >
                            {" "}
                            Click to Reset Password
                            {/* {titleStrings.ButtonTitle}{" "} */}
                          </button>
                        </div>
                        <div className="form-field flex100 mb-0 p-2">
                          <p className="content-link">
                            Already have an account! <Link to="/"> Login </Link>
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

export default ResetPassword;
