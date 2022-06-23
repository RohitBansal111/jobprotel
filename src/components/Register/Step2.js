import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { RenderImageField } from "../file-input";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
} from "../renderField";
import titles from "./register.json";
import Step2Validator from "./validator/step2Validator";

const Step2 = ({
  userPersonalInfo,
  nextPage,
  prevPage,
  data,
  next,
  uploadFile,
}) => {
  let titleStrings = new LocalizedStrings(titles);
  const SaveStep2 = (values) => {
    console.log(values);
    userPersonalInfo(values);
    nextPage();
  };

  const handleImageChange = async (event) => {
    let files = event.target.files[0];
    uploadFile(files);
    // console.log(files)
  };
  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Personal Information</h4>
      <div className="form-main">
        <Form
          onSubmit={SaveStep2}
          validate={Step2Validator}
          keepDirtyOnReinitialize={true}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex50">
                  <label htmlFor="gender"> {titleStrings.genderTitle} </label>
                  <div className="radio-button-groupss">
                    <Field
                      label={titleStrings.maleTitle}
                      name="gender"
                      value="Male"
                      component={RenderRadioButtonField}
                      type="radio"
                      defaultValue={data ? data.gender : ""}
                    >
                      Male
                    </Field>
                    <Field
                      label={titleStrings.feMaleTitle}
                      name="gender"
                      value="Female"
                      component={RenderRadioButtonField}
                      type="radio"
                      defaultValue={data ? data.gender : ""}
                    >
                      Female
                    </Field>
                  </div>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="age"
                    label={titleStrings.ageTitle}
                    component={renderField}
                    placeholder="Enter age"
                    type="text"
                    defaultValue={next && data ? data.age : ""}
                  />
                </div>
                <div className="form-field flex100 mb-2">
                  <Field
                    name="address"
                    label={titleStrings.addressTitle}
                    component={renderField}
                    placeholder="Enter Address"
                    type="text"
                    defaultValue={next && data ? data.address : ""}
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="country"
                    label={titleStrings.countryTitle}
                    component={renderSelect}
                    defaultValue={next && data ? data.country : ""}
                  >
                    <option>Select Country</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>Canada</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="state"
                    label={titleStrings.stateTitle}
                    component={renderSelect}
                    defaultValue={next && data ? data.state : ""}
                  >
                    <option>Select State</option>
                    <option>Punjab</option>
                    <option>Haryana</option>
                    <option>Uttrakhand</option>
                  </Field>
                </div>
                <div className="form-field flex50">
                  <Field
                    name="city"
                    label={titleStrings.cityTitle}
                    component={renderField}
                    placeholder="Enter City"
                    type="text"
                    defaultValue={next && data ? data.city : ""}
                  />
                </div>
                <div className="form-field flex50">
                  <Field
                    name="zipcode"
                    label={titleStrings.zipcodeTitle}
                    component={renderField}
                    placeholder="Enter Zip Code"
                    type="text"
                    defaultValue={next && data ? data.zipcode : ""}
                  />
                </div>
                <div className="form-field flex100">
                  <Field
                    name="qualification"
                    label={titleStrings.qualificationTitle}
                    component={renderSelect}
                    defaultValue={next && data ? data.qualification : ""}
                  >
                    <option>B.Tech Computer science</option>
                    <option>Bachelors in Computer Application</option>
                    <option>Masters in Computer Application</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="interestedArea"
                    label={titleStrings.interestedAreaTitle}
                    component={renderSelect}
                    defaultValue={next && data ? data.interestedArea : ""}
                  >
                    <option>Writing</option>
                    <option>Photography</option>
                    <option>Action</option>
                  </Field>
                </div>
                <div className="form-field flex100">
                  <input
                    name="uploadPhoto"
                    label={titleStrings.uploadPhotoTitle}
                    // component={RenderImageField}
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="form-action">
                <button
                  type="button"
                  onClick={() => prevPage()}
                  className="btn btn-secondary prev-btn text-white text-center"
                >
                  {titleStrings.prevTitle}{" "}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary next-btn text-white text-center"
                >
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

export default Step2;
