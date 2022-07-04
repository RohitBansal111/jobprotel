import { Field, Form } from "react-final-form";
import validate from "./kycValidation";
import { renderField, RenderFileUploadField } from "./../renderField";

const CompleteKycModal = () => {
  const handleKycForm = () => {};
  return (
    <div
      className="modal fade"
      id="kycpopup"
      tabIndex="-1"
      aria-labelledby="kycLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="kycLabel">
              KYC Detail
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="kyc-detail-form">
              <Form onSubmit={handleKycForm} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex50">
                        <Field
                          name="firstname"
                          label="First Name"
                          placeholder="Enter first name"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="email"
                          label="Email Addresss"
                          placeholder="Enter email address"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="frontId"
                          label="Front Id Proof"
                          uploadLabel="Browse Photo"
                          component={RenderFileUploadField}
                          type="text"
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="backId"
                          label="Back Id Proof"
                          uploadLabel="Browse Photo"
                          component={RenderFileUploadField}
                          type="text"
                        />
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          Submit
                        </button>
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
  );
};

export default CompleteKycModal;
