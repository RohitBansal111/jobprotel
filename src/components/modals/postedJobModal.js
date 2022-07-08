import { Field, Form } from "react-final-form";
import { RenderTagField } from "../renderTagField";
import {
  renderField,
  renderSelect,
  renderTextareaField,
  renderNumberField,
} from "./../renderField";
import validate from "./validators/postedJobValidator";
import * as dropdownServices from "../../services/dropDownServices";
import { useState, useEffect } from "react";
import * as employerServices from "../../services/employerServices";
import LocalizedStrings from "react-localization";
import titles from "../Register/register.json";

const PostedJobModal = () => {
  let titleStrings = new LocalizedStrings(titles);

  const [qualificationList, setQualificationList] = useState(null);
  const [inputField, setInputField] = useState(false);
  const [skillslist, setSkillslist] = useState([]);
  const [tagslist, setTagslist] = useState([]);

  const handleQualification = (e) => {
    let value = e.target.value;
    if (value == "Other") {
      setInputField(true);
    } else {
      setInputField(false);
    }
  };

  const handleJobPost = (values) => {
    let value = [];
    value = values;
    console.log("jobs ok", value);
    let tagsArr = [];
    value.tags.map((tag) => tagsArr.push(tag.text));

    let skillsArr = [];
    value.skills.map((skill) => skillsArr.push(skill.text));

    let formData = new FormData();

    formData.append("designation", value.designation);
    formData.append("experience", value.experience);

    // for (var i = 0; i < value.qualification.length; i++) {
    // formData.append(`qualification[${i}]`, value.qualification[i]);
    // }

    for (var i = 0; i < skillsArr.length; i++) {
      formData.append(`skills[${i}]`, skillsArr[i]);
    }

    formData.append("qualification", value.qualification);
    formData.append("software", value.software);
    formData.append("onsite", value.onsite);
    formData.append("location", value.location);
    formData.append("hoursDays", value.hoursDays);
    formData.append("timing", value.timing);
    formData.append("salary", value.salary);

    for (var i = 0; i < tagsArr.length; i++) {
      formData.append(`tags[${i}]`, tagsArr[i]);
    }

    formData.append("description", value.description);

    console.log("Yes FormData", formData);

    postJob(formData);
  };

  const postJob = async (data) => {
    const resp = await employerServices.jobPost(data);
    console.log(resp);
  };

  useEffect(async () => {
    const resp = await dropdownServices.qualificationList();
    setQualificationList(resp.data);

    const skillList = await dropdownServices.skillsList();
    const tagsList = await dropdownServices.tagsList();

    let tagListData = [];
    tagsList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      tagListData.push(obj);
    });
    setTagslist(tagListData);

    let skillListData = [];
    skillList.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      skillListData.push(obj);
    });
    setSkillslist(skillListData);
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
            />
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
                          name="qualification"
                          label="Education"
                          placeholder="Enter education"
                          component={renderSelect}
                          onChange={handleQualification}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {qualificationList &&
                            qualificationList.map((qualification) => (
                              <option
                                value={qualification.id}
                                key={qualification.id}
                              >
                                {qualification.name}
                              </option>
                            ))}
                          <option value="Other">Other</option>
                        </Field>
                      </div>
                      {inputField && (
                        <div className="form-field flex100">
                          <Field
                            name="qualification"
                            label={titleStrings.qualificationTitle}
                            component={renderField}
                          />
                        </div>
                      )}
                      <div className="form-field flex100">
                        <Field
                          name="skills"
                          label="Skills"
                          suggestions={skillslist}
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
                          type="text"
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
                          <option value="0">0 hour</option>
                          {[...Array.from(Array(16).keys())]
                            .slice(1)
                            .map((num, i) => (
                              <option key={i} value={num}>
                                {num ? num + " hour's" : ""}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="timing"
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
                          component={renderNumberField}
                          pattern="[0-9]*"
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="tags"
                          label="Tags"
                          placeholder="Enter tags"
                          suggestions={tagslist}
                          component={RenderTagField}
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
                          onClick={() => handleJobPost(values)}
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
