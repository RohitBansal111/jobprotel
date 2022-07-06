import { useState, useEffect } from "react";
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
  { id: "1", text: "react-redux" },
  { id: "2", text: "flutter" },
  { id: "3", text: "react-native" },
  { id: "4", text: "mongoDB" },
  { id: "5", text: "AWS-admin" },
];

const Step3 = ({
  userProfessionalInfo,
  prevPage,
  uploadExtraCertificateFile,
  uploadResumeFile,
  data,
}) => {
  let titleStrings = new LocalizedStrings(titles);

  const SaveStep3 = (values) => {
    userProfessionalInfo(values);
  };

  const [previewImg, setPreviewImg] = useState([]);
  const handleExtraCertificates = (event) => {
    let image = [...event.target.files];
    console.log(image);
    uploadExtraCertificateFile(image);
    setPreviewImg(image);
  };

  const handleResume = (event) => {
    let files = event.target.files[0];
    uploadResumeFile(files);
  };

  const manageCertificates = (img) => {
    let arr = [];
    previewImg
      .filter((image) => image.name !== img)
      .map((image) => arr.push(image));
    setPreviewImg(arr);
  };
  let file = "";

  // useEffect(() => {
  //   uploadExtraCertificateFile(previewImg);
  // }, [previewImg]);

  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Professional Information</h4>
      <div className="form-main">
        <Form
          onSubmit={SaveStep3}
          validate={Step3Validator}
          keepDirtyOnReinitialize
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex100">
                  <Field
                    name="collegeName"
                    label={titleStrings.collegeTitle}
                    component={renderField}
                    placeholder="Enter college / university name"
                    type="text"
                  />
                </div>
                <div className="form-field flex50 mb-2 withoutLabel">
                  <label htmlFor="">Experience</label>
                  <div className="inner-multi-field">
                    <Field
                      name="experienceInYears"
                      label="Experience"
                      component={renderSelect}
                      placeholder="Year's"
                      type="text"
                    >
                    <option value="0">0 year</option>
                      {[...Array.from(Array(51).keys())]
                        .slice(1)
                        .map((num, i) => (
                          <option key={i}>{num ? num + " year's" : ""}</option>
                        ))}
                    </Field>
                    <Field
                      name="experienceInMonths"
                      label="Experience"
                      component={renderSelect}
                      placeholder="Month's"
                      type="text"
                    >
                    <option value="0">0 month</option>
                      {[...Array.from(Array(13).keys())]
                        .slice(1)
                        .map((num, i) => (
                          <option key={i}>{num ? num + " month's" : ""}</option>
                        ))}
                    </Field>
                  </div>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="expectedSalary"
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
                    <option value="1 day">1 day</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                    <option value="4 days">4 days</option>
                    <option value="5 days">5 days</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="workHoursPerDay"
                    label="Hours / day"
                    component={renderSelect}
                    type="text"
                  >
                    <option selected="" disabled>
                      Select hours
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
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
                    <option value="Web Development">Web Development</option>
                    <option value="Web Designer">Web Designer</option>
                    <option value="QA &amp; Testing">QA &amp; Testing</option>
                    <option value="4">Art &amp; Illustration</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="skills"
                    label="Skills"
                    suggestions={skillsSugguestion}
                    placeholder="Enter Intrested Area"
                    component={RenderTagField}
                  />
                </div>
                <div className="form-field flex50">
                  <label htmlFor="working"> {titleStrings.workingTitle} </label>
                  <div className="radio-button-groupss">
                    <Field
                      label={titleStrings.onSiteTitle}
                      name="workingType"
                      value="0"
                      checked="checked"
                      component={RenderRadioButtonField}
                      type="radio"
                      defaultValue={data ? data.workingType : ""}
                    >
                      OnSite
                    </Field>
                    <Field
                      label={titleStrings.offSiteTitle}
                      name="workingType"
                      value="1"
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
                      name="resumeFile"
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
                      ref={(input) => {
                        file = input;
                      }}
                      multiple
                    />
                  </div>
                  {previewImg &&
                    previewImg.length > 0 &&
                    previewImg.map((img) => (
                      <>
                        <li>{img.name}</li>
                        <i
                          className="fa fa-times-circle"
                          aria-hidden="true"
                          style={{ cursor: "pointer" }}
                          onClick={() => manageCertificates(img.name)}
                        />
                      </>
                    ))}
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
                  {titleStrings.submitTitle}{" "}
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
