import { Field, Form } from "react-final-form";
import LocalizedStrings from "react-localization";
import { renderField } from "../renderField";
import titles from "./register.json";
import { RenderImageField } from "../file-input";
import validate from "./validator/EmployerStep2Validate";

const EmployerStep2 = (props) => {
  let titleStrings = new LocalizedStrings(titles);
  const SaveStep2 = (values) => {
    props.EmployerCompleteInfo(values);
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
                  <Field
                    name="logoUrl"
                    label={titleStrings.companyLogoTitle}
                    component={RenderImageField}
                    type="file"
                  />
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
                <div className="form-field flex100 mb-2">
                  <Field
                    name="companyPhone"
                    label={titleStrings.contactDetailsTitle}
                    component={renderField}
                    placeholder="Enter contact details"
                    type="text"
                  />
                </div>
              </div>
              <div className="form-action">
                <button
                  type="button"
                  onClick={() => props.prevPage()}
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
