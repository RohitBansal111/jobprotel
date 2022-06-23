import { Field, Form } from "react-final-form";
import { renderField } from "./../renderField";
import validate from "./validators/postedJobValidator";

const AddColeagueModal = () => {
  const handleAddColleague = () => {};
  return (
    <div
      className="modal fade"
      id="addColleague"
      tabIndex="-1"
      aria-labelledby="addColleague"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addColleague">
              Add New Colleague
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
              <Form onSubmit={handleAddColleague} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex100">
                        <Field
                          name="name"
                          label="Name"
                          placeholder="Enter name"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="email"
                          label="Email Address"
                          placeholder="Enter email"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="role"
                          label="Role"
                          placeholder="Enter role"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Access</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="profileSwitch"
                          />
                          <label className="form-check-label" for="profileSwitch">
                            Profile
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="buyConnectSwitch"
                          />
                          <label
                            className="form-check-label"
                            for="buyConnectSwitch"
                          >
                            Buy connect
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="postJobSwitch"
                          />
                          <label className="form-check-label" for="postJobSwitch">
                            Post Job
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="screeningProcessSwitch"
                          />
                          <label
                            className="form-check-label"
                            for="screeningProcessSwitch"
                          >
                            Screening process
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="chatSwitch"
                          />
                          <label className="form-check-label" for="chatSwitch">
                            Chat
                          </label>
                        </div>
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          Add Colleague
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

export default AddColeagueModal;
