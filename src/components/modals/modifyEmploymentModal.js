import { Field, Form } from "react-final-form";
import {
  renderField,
  RenderRadioButtonField,
  renderSelect,
  renderNumberField,
} from "./../renderField";
import validate from "./validators/employerDetailsCValidator";

const ModifyEmploymentModal = () => {
  const handleJobPost = () => {};
  return (
    <div
      className="modal fade"
      id="modifyEmploymentModal"
      tabIndex="-1"
      aria-labelledby="modifyEmploymentModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modifyEmploymentModal">
              Modify Employment Detail
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
                          name="designation"
                          label="Designation"
                          placeholder="Enter Designation"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="organisation"
                          label="Organisation"
                          placeholder="Enter organisation "
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Current Employer</label>
                        <div className="radio-button-groupss">
                          <Field
                            name="currentEmployer"
                            value="true"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="0"
                          >
                            Yes
                          </Field>
                          <Field
                            name="currentEmployer"
                            value="false"
                            component={RenderRadioButtonField}
                            type="radio"
                            currentIndex="1"
                          >
                            No
                          </Field>
                        </div>
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="startDate"
                          label="Start Date"
                          placeholder="Enter start date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="endDate"
                          label="End Date"
                          placeholder="Enter end date"
                          component={renderField}
                          type="date"
                        />
                      </div>
                      <div className="form-field flex100 mb-2 withoutLabel">
                        <label htmlFor="">Experience</label>
                        <div className="inner-multi-field">
                          <Field
                            name="experienceInYears"
                            component={renderSelect}
                            placeholder="Year's"
                            type="text"
                          >
                            <option value="0">0 year</option>
                            {[...Array.from(Array(51).keys())]
                              .slice(1)
                              .map((num, i) => (
                                <option key={i} value={num}>
                                  {num ? num + " year's" : ""}
                                </option>
                              ))}
                          </Field>
                          <Field
                            name="experienceInMonths"
                            component={renderSelect}
                            placeholder="Month's"
                            type="text"
                          >
                            <option value="0">0 month</option>
                            {[...Array.from(Array(13).keys())]
                              .slice(1)
                              .map((num, i) => (
                                <option key={i} value={num}>
                                  {num ? num + " month's" : ""}
                                </option>
                              ))}
                          </Field>
                        </div>
                      </div>
                      <div className="form-field flex100">
                        <label>Expected Salary</label>
                        <Field
                          name="salary"
                          component={renderNumberField}
                          placeholder="Enter salary expectations"
                          type="text"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex100">
                        <label>Notice Period</label>
                        <Field
                          name="noticePeriod"
                          component={renderNumberField}
                          placeholder="Enter notice period in days"
                          type="text"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex100 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary button-submit"
                        >
                          Post Now
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

export default ModifyEmploymentModal;
