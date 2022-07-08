import { Field, Form } from "react-final-form";
import { RenderTagField } from "../renderTagField";
import {
  renderField,
  renderSelect,
  renderTextareaField,
} from "./../renderField";
import validate from "./validators/postedJobValidator";
import * as dropdownServices from "../../services/dropDownServices";
import { useState, useEffect } from "react";

const skillsSugguestion = [
  { id: "1", text: "react-redux" },
  { id: "2", text: "flutter" },
  { id: "3", text: "react-native" },
  { id: "4", text: "mongoDB" },
  { id: "5", text: "AWS-admin" },
];

const PostedJobModal = () => {
  const handleJobPost = () => {};
  const [qualificationList, setQualificationList] = useState(null);

  useEffect(async () => {
     const resp = await dropdownServices.qualificationList();
     setQualificationList(resp.data);
   }, []);
  return (
    <div
      className="modal fade"
      id="postedJob"
      tabIndex="-1"
      aria-labelledby="postedJob"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-large">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="postedJob">
              Post New Job
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <p className="px-4 py-2 connect-warn text-right">2 connects will be deducted for this job</p>
            <div className="kyc-detail-form p-4">
              <Form onSubmit={handleJobPost} validate={validate}>
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex50">
                        <Field
                          name="jobTitle"
                          label="Job Title"
                          placeholder="Enter Job Title"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="designation"
                          label="Designation"
                          placeholder="Enter Designation"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <label>Experience</label>
                        <div className="inner-multi-field">
                          <div className="form-field flex50">
                            <Field
                              name="month"
                              label=""
                              component={renderSelect}
                            >
                              <option value="january">January</option>
                              <option value="february">February</option>
                            </Field>
                          </div>
                          <div className="form-field flex50">
                            <Field
                              name="year"
                              label=""
                              component={renderSelect}
                            >
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="education"
                          label="Education"
                          placeholder="Enter education"
                          component={renderSelect}
                        >
                          <option>B.Tech</option>
                          <option>Other</option>
                        </Field>
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="skills"
                          label="Skills"
                          suggestions={skillsSugguestion}
                          placeholder="Enter skills"
                          component={RenderTagField}
                        />
                      </div>
                      {/* <div className="form-field flex50">
                        <Field
                          name="software"
                          label="Software"
                          placeholder="Enter software"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="onsite"
                          label="Onsite"
                          placeholder="Enter onsite"
                          component={renderField}
                        />
                      </div> */}
                      <div className="form-field flex50">
                        <Field
                          name="jobLocation"
                          label="Job location (if applicable)"
                          placeholder="Enter jobLocation"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="hoursDays"
                          label="Hours / Days"
                          component={renderSelect}
                        >
                          <option selected="">Select hours</option>
                          {[...Array.from(Array(16).keys())]
                            .slice(1)
                            .map((num, i) => (
                              <option key={i} value={num}>{num ? num + " hour's" : ""}</option>
                            ))}
                        </Field>
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
                          name="jobTimingDays"
                          label="Job Timings/days"
                          placeholder="Enter jobTiming/days"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="timeZone"
                          label="Time Zone"
                          component={renderSelect}
                        >
                          <option>Doesn't matter</option>
                          <option>IST</option>
                        </Field>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="category"
                          label="Category"
                          component={renderSelect}
                        >
                          <option selected="">Select job category</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Web Designer">Web Designer</option>
                          <option value="QA &amp; Testing">QA &amp; Testing</option>
                          <option value="4">Art &amp; Illustration</option>
                        </Field>
                      </div>
                      <div className="form-field rangeField-wrapper flex50">
                        <Field
                          name="salary"
                          label="Salary"
                          type="range"
                          placeholder="Enter salary"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="tags"
                          label="Tags"
                          placeholder="Enter tags"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex100">
                        <Field
                          name="description"
                          label="Job Description"
                          placeholder="Enter job description"
                          component={renderTextareaField}
                          type="text"
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

export default PostedJobModal;
