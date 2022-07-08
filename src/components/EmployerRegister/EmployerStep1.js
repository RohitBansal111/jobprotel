import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../renderField";
import titles from "./register.json";
import Step1Validator from "./validator/step1Validator";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const EmployerStep1 = ({ prevPage, nextPage, employerBasicInfo, data }) => {
  const [err, setErr] = useState([]);
  const [captcha, setCaptcha] = useState({ captchaCode: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(true);
  const [showLoginPassword2, setShowLoginPassword2] = useState(true);

  let titleStrings = new LocalizedStrings(titles);
  const SaveStep1 = (values) => {
    if (validation()) {
      employerBasicInfo(values);
      nextPage();
    }
  };

  const handlePassword = () => setShowLoginPassword(!showLoginPassword);
  const handleConfirmPassword = () =>
    setShowLoginPassword2(!showLoginPassword2);

  const validation = () => {
    let isValid = true;
    let error = {};
    if (!captcha || captcha.captchaCode.length == 0) {
      error.captcha = "Please verify captcha";
      isValid = false;
    }
    setErr(error);
    return isValid;
  };

  const handleCaptcha = (value) => {
    setCaptcha({ captchaCode: value });
  };

  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Basic Information</h4>
      <div className="form-main">
        <Form
          onSubmit={SaveStep1}
          validate={Step1Validator}
          initialValues={data}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex50">
                  <Field
                    name="firstName"
                    label={titleStrings.firstNameTitle}
                    component={renderField}
                    placeholder="Enter first name"
                    type="text"
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="lastName"
                    label={titleStrings.lastNameTitle}
                    component={renderField}
                    placeholder="Enter last name"
                    type="text"
                  />
                </div>
                <div className="form-field flex100">
                  <Field
                    name="email"
                    label={titleStrings.emailAddressTitle}
                    component={renderField}
                    placeholder="Enter email address"
                    type="text"
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="password"
                    label={titleStrings.passwordTitle}
                    component={renderField}
                    placeholder="Enter password"
                    type={showLoginPassword ? "password" : "text"}
                  >
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
                  </Field>
                </div>
                <div className="form-field flex100 withoutLabel">
                  <Field
                    name="confirmPassword"
                    label={titleStrings.confirmPasswordTitle}
                    component={renderField}
                    placeholder="Enter confirm password"
                    type={showLoginPassword2 ? "password" : "text"}
                  >
                    <span className="eye-btn">
                      {showLoginPassword2 ? (
                        <i
                          className="fa fa-eye-slash"
                          aria-hidden="true"
                          onClick={handleConfirmPassword}
                        />
                      ) : (
                        <i
                          className="fa fa-eye"
                          aria-hidden="true"
                          onClick={handleConfirmPassword}
                        />
                      )}
                    </span>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <label htmlFor=""> {titleStrings.recaptchaLabel} </label>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleCaptcha}
                    value={captcha}
                  />
                  <p style={{ color: "red" }}>{err && err.captcha}</p>
                </div>
              </div>
              <div className="form-action">
                <button
                  type="button"
                  onClick={() => prevPage()}
                  className="btn btn-secondary prev-btn text-white text-center"
                >
                  {" "}
                  {titleStrings.prevTitle}{" "}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary next-btn text-white text-center"
                >
                  {" "}
                  {titleStrings.nextTitle}{" "}
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EmployerStep1;
