import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../renderField";
import titles from "./register.json";
import { RenderImageField } from "../file-input";
import validate from "./validator/EmployerStep2Validate";
import { useState } from "react";

const EmployerStep2 = ({ prevPage, EmployerCompleteInfo, uploadLogoFile, compPhoneChange, employer }) => {
  let titleStrings = new LocalizedStrings(titles);

  const [err, setErr] = useState([]);

  const [img, setImg] = useState({
    LogoImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const validation = () => {
    let isValid = true;
    let error = {};
    if (!employer.companyPhone) {
      error.companyPhone = "Company Phone is Required";
      isValid = false;
    }
    setErr(error);
    return isValid;
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadLogoFile(event.target.files[0]);
      setImg({ LogoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const SaveStep2 = (values) => {
    if (validation()) {
      EmployerCompleteInfo(values);
    }
  };
  return (
    <div className="register-form">
      <h4 className="text-primary text-left">Complete Information</h4>
      <div className="form-main">
        <Form onSubmit={SaveStep2} validate={validate}>
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-field-group">
                <div className="form-field flex100">
                  <input
                    name="logoUrl"
                    // label={titleStrings.companyLogoTitle}
                    // component={RenderImageField}
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    type="file"
                  />
                  <div className="aws-placeholder image4">
                    <img
                      src={img.LogoImg}
                      className="img-aws"
                      alt="image"
                      width={100}
                      height={100}
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="form-field flex100">
                  <Field
                    name="address"
                    label={titleStrings.companyAddressTitle}
                    component={renderField}
                    placeholder="Enter company address"
                    type="text"
                  />
                </div>
                <div className="form-field flex100">
                  <Field
                    name="recruitingManagerName"
                    label={titleStrings.managerNameTitle}
                    component={renderField}
                    placeholder="Enter recuriting manager name"
                    type="text"
                  />
                </div>
                {/* <div className="form-field flex100 mb-2">
                  <Field
                    name="companyPhone"
                    label={titleStrings.contactDetailsTitle}
                    component={renderField}
                    placeholder="Enter contact details"
                    type="text"
                  />
                </div> */}
                <div className="form-field flex50">
                  <div>Company Phone</div>
                  <input
                    name="companyPhone"
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Enter contact details"
                    value={employer ? employer.companyPhone : ""}
                    onChange={compPhoneChange}
                  />
                  <div style={{ color: "red" }}>{err && err.companyPhone}</div>
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

export default EmployerStep2;
