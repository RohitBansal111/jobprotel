import { Field, Form } from "react-final-form";
import { RenderTagField } from "../renderTagField";
import {
  renderField,
  RenderFileUploadField,
  renderTextareaField,
} from "./../renderField";
import validate from "./validators/addProjectValidator";

const projectSkills = [
  { id: "1", text: "react-redux" },
  { id: "2", text: "flutter" },
  { id: "3", text: "react-native" },
  { id: "4", text: "mongoDB" },
  { id: "5", text: "AWS-admin" },
];
const AddProjectModal = () => {
  const handleJobPost = () => {};
  return (
    <div
      className="modal fade"
      id="addProjectModal"
      tabIndex="-1"
      aria-labelledby="addProjectModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModal">
              Add Project
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
              <Form onSubmit={handleJobPost} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
                        <Field
                          name="title"
                          label="Title"
                          placeholder="Enter title"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="enddate"
                          label="Start Date"
                          placeholder="Enter start date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="endDate"
                          label="End Date"
                          placeholder="Enter end date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="uploadfile"
                          label="Upload File"
                          component={RenderFileUploadField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="skills"
                          label="Skills"
                          suggestions={projectSkills}
                          placeholder="Enter skills"
                          component={RenderTagField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="reflink"
                          label="Referral Link (optional)"
                          placeholder="Enter referral link"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="description"
                          label="Description"
                          placeholder="Enter description"
                          component={renderTextareaField}
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

export default AddProjectModal;
