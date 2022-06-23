import { useState } from "react";
import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
} from "../renderField";
import titles from "./register.json";
import Step3Validator from "./validator/step3Validator";
import { RenderTagField } from "../renderTagField";

const skillsSugguestion = [
  {id: '1',text: 'react-redux'},
  {id: '2',text: 'flutter'},
  {id: '3',text: 'react-native'},
  {id: '4',text: 'mongoDB'},
  {id: '5',text: 'AWS-admin'},
]
const Step3 = ({
  userProfessionalInfo,
  prevPage,
  uploadExtraCertificateFile,
  uploadResumeFile,
}) => {
  let titleStrings = new LocalizedStrings(titles);
  const [extraCert, setExtraCert] = useState(false);
  const [userResume, setUserResume] = useState(false);

  const SaveStep3 = (values) => {
    if (values.certificate === "Yes") {
      if (extraCert && userResume) {
        console.log("ffff");
        userProfessionalInfo(values);
      }
    } else if (values.certificate === "No" && userResume) {
      console.log("dddd");
      userProfessionalInfo(values);
    } else {
      alert("Wrong..");
    }
  };

  const handleChange = (event) => {
    console.log("!!!", event.target.value);
  };

  const handleExtraCertificates = (event) => {
    let isValidCert = true;
    let files = event.target.files[0];
    uploadExtraCertificateFile(files);
    setExtraCert(true);
    console.log(files);
    return isValidCert;
  };

  const handleResume = (event) => {
    let isResume = true;
    let files = event.target.files[0];
    uploadResumeFile(files);
    setUserResume(true);
    console.log(files);
    return isResume;
  };
  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Professional Information</h4>
      <div className="form-main">
        <Form
          onSubmit={SaveStep3}
          validate={Step3Validator}
          keepDirtyOnReinitialize
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex100">
                  <Field
                    name="collegeName"
                    label={titleStrings.collegeTitle}
                    component={renderField}
                    placeholder="Enter college / university name"
                    type="text"
                    // defaultValue={next && data ? data.collegeName : ""}
                  />
                </div>
                <div className="form-field flex50 mb-2 withoutLabel">
                  <label htmlFor="">Experience</label>
                  <div className="inner-multi-field">
                    <Field
                      name="years"
                      label="Experience"
                      component={renderField}
                      placeholder="Year's"
                      type="text"
                      // defaultValue={next && data ? data.years : ""}
                    />
                    <Field
                      name="months"
                      label="Experience"
                      component={renderField}
                      placeholder="Month's"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="salary"
                    label="Expected Salary"
                    component={renderField}
                    placeholder="Enter salary expectations"
                    type="text"
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="days"
                    label="Days / Week"
                    component={renderSelect}
                    type="text"
                  >
                    <option selected="">Select days</option>
                    <option value="1">2 days</option>
                    <option value="2">3 days</option>
                    <option value="3">4 days</option>
                    <option value="4">5 days</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="hours"
                    label="Hours / day"
                    component={renderSelect}
                    type="text"
                  >
                    <option selected="" disabled>Select hours</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="category"
                    label="Category"
                    component={renderSelect}
                    type="text"
                  >
                    <option selected="">Select job category</option>
                    <option value="1">Web Development</option>
                    <option value="2">Web Designer</option>
                    <option value="3">QA & Testing</option>
                    <option value="4">Art & Illustration</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <Field name="skills" label="Skills" suggestions={skillsSugguestion} placeholder="Enter Intrested Area" component={RenderTagField} />
                </div>
                <div className="form-field flex50">
                  <label htmlFor="working"> {titleStrings.workingTitle} </label>
                  <div className="radio-button-groupss">
                    <Field
                      label={titleStrings.onSiteTitle}
                      name="working"
                      value="OnSite"
                      checked="checked"
                      component={RenderRadioButtonField}
                      type="radio"
                    >
                      OnSite
                    </Field>
                    <Field
                      label={titleStrings.offSiteTitle}
                      name="working"
                      value="OffSite"
                      component={RenderRadioButtonField}
                      type="radio"
                    >
                      OffSite
                    </Field>
                  </div>
                </div>

                <div className="form-field flex100 noLabel">
                  <div className="resume-upload">
                    <button
                      type="button"
                      className="btn themesecondarybackground fileUpload"
                    >
                      <i className="fa fa-upload me-3"></i> {"Upload Resume"}
                    </button>
                    <input
                      label={titleStrings.resumeTitle}
                      name="document"
                      onChange={handleResume}
                      accept=".jpg, .jpeg, .png"
                      type="file"
                    />
                  </div>
                </div>
                <div className="form-field flex50">
                  <label htmlFor="certificate"> Extra certificates </label>
                  <div className="radio-button-groupss">
                    <Field
                      label={titleStrings.noTitle}
                      // inputOnChange={handleChange}
                      name="certificate"
                      value="No"
                      component={RenderRadioButtonField}
                      type="radio"
                    >
                      No
                    </Field>
                    <Field
                      label={titleStrings.yesTitle}
                      // inputOnChange={handleChange}
                      name="certificate"
                      value="Yes"
                      component={RenderRadioButtonField}
                      type="radio"
                    >
                      Yes
                    </Field>
                  </div>
                </div>
                <div className="form-field flex100 noLabel">
                  {/* <Field
                    name="document"
                    label="Extra Documents"
                    uploadLabel="Browse Documents"
                    component={RenderFileUploadField}
                    type="text"
                  /> */}
                </div>

                <div className="form-field flex100 noLabel">
                  <div className="resume-upload">
                    <button
                      type="button"
                      className="btn themesecondarybackground fileUpload"
                    >
                      <i className="fa fa-upload me-3"></i>{" "}
                      {"Upload Certificates"}
                    </button>
                    <input
                      label={titleStrings.extraCertificateTitle}
                      name="document"
                      onChange={handleExtraCertificates}
                      accept=".jpg, .jpeg, .png"
                      type="file"
                    />
                  </div>
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
                  onClick={() => SaveStep3(values)}
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

export default Step3;
