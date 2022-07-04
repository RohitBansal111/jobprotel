import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../renderField";
import titles from "./register.json";
import Step1Validator from "./validator/step1Validator";
import ReCAPTCHA from "react-google-recaptcha";

const EmployerStep1 = ({ prevPage, nextPage, employerInfo }) => {
  let titleStrings = new LocalizedStrings(titles);
  const SaveStep1 = (values) => {
    console.log(values);
    employerInfo(values);
    nextPage();
  };
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Basic Information</h4>
      <div className="form-main">
        <Form onSubmit={SaveStep1} validate={Step1Validator}>
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
                    type="password"
                  />
                </div>
                <div className="form-field flex100 withoutLabel">
                  <Field
                    name="confirmPassword"
                    label={titleStrings.confirmPasswordTitle}
                    component={renderField}
                    placeholder="Enter confirm password"
                    type="password"
                  />
                </div>
                <div className="form-field flex100">
                  <label htmlFor=""> {titleStrings.recaptchaLabel} </label>
                  <ReCAPTCHA
                    sitekey="Your client site key"
                    onChange={onChange}
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

export default EmployerStep1;
