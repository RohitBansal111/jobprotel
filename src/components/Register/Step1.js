import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../renderField";
import titles from "./register.json";
import validate from "./validator/step1Validator";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const Step1 = ({
  nextPage,
  prevPage,
  userBasicInfo,
  data,
  next,
  handleCaptchaCode,
}) => {

  let titleStrings = new LocalizedStrings(titles);
  const [captcha, setCaptcha] = useState({ captchaCode: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(true);
  const [showLoginPassword2, setShowLoginPassword2] = useState(true);

  const handlePassword = () => setShowLoginPassword(!showLoginPassword);
  const handleConfirmPassword = () =>
    setShowLoginPassword2(!showLoginPassword2);

  const SaveStep1 = (values) => {
    if (captcha ) {
      userBasicInfo(values);
      nextPage();
    }
  };

  const handleCaptcha = (value) => {
    handleCaptchaCode(value);
    setCaptcha({ captchaCode: value });
  };

  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Basic Information</h4>
      <div className="form-main">
        <Form 
          initialValues={data}
          validate={validate} 
          onSubmit={SaveStep1} >
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-field-group">
                  <div className="form-field flex50">
                    <Field
                      name="firstName"
                      label={titleStrings.firstNameTitle}
                      component={renderField}
                      placeholder="Enter first name"
                      type="text"
                      // defaultValue={next && data ? data.firstName : ""}
                    />
                  </div>
                  <div className="form-field flex50">
                    <Field
                      name="lastName"
                      label={titleStrings.lastNameTitle}
                      component={renderField}
                      placeholder="Enter last name"
                      type="text"
                      defaultValue={next && data ? data.lastName : ""}
                    />
                  </div>
                  <div className="form-field flex100">
                    <Field
                      name="email"
                      label={titleStrings.emailAddressTitle}
                      component={renderField}
                      placeholder="Enter email address"
                      type="text"
                      // defaultValue={next && data ? data.email : ""}
                    />
                  </div>
                  <div className="form-field flex100 mb-2">
                    <Field
                      name="password"
                      label={titleStrings.passwordTitle}
                      component={renderField}
                      placeholder="Enter password"
                      type={showLoginPassword ? "password" : "text"}
                      // defaultValue={next && data ? data.password : ""}
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
                      // defaultValue={next && data ? data.confirmPassword : ""}
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
                      value={captcha}
                      onChange={handleCaptcha}
                    />
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

export default Step1;
