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
import { useState, useEffect, useMemo } from "react";
import * as employerServices from "../../services/employerServices";
import LocalizedStrings from "react-localization";
import titles from "../Register/register.json";
import { login } from "../../store/action/authActions";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

const PostedJobModal = () => {
  let titleStrings = new LocalizedStrings(titles);

  const [qualificationList, setQualificationList] = useState(null);
  const [inputField, setInputField] = useState(false);
  const [skillslist, setSkillslist] = useState([]);
  const [tagslist, setTagslist] = useState([]);
  const [designationlist, setDesignationlist] = useState([]);
  const [salary, setSalary] = useState("")
  const [datetime, setDatetime] = useState(spacetime.now());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleTimeZone = (data) => {
    setTimezone(data.value);
  };

  useMemo(() => {
    const timezoneValue = timezone.value ?? timezone;
    setDatetime(datetime.goto(timezoneValue));
  }, [timezone]);

  const handleQualification = (e) => {
    let value = e.target.value;
    if (value == "Other") {
      setInputField(true);
    } else {
      setInputField(false);
    }
  };

  const handleSal = (e) => {
    let value = e.target.value
    let sal = ""
    if(value > 0) {
     sal = value + "," + "000"
    }else {
      sal = 0;
    }
    setSalary(sal)
  };

  const handleJobPost = (values) => {
    let value = [];
    value = values;
    console.log("jobs ok", value);
    let tagsArr = [];
    value.tags.map((tag) => tagsArr.push(tag.text));

    let skillsArr = [];
    value.skills.map((skill) => skillsArr.push(skill.text));

    console.log(skillsArr)
    let formData = new FormData();

    formData.append("jobTitle", value.jobTitle);
    formData.append("designation", value.designation);
    formData.append("experienceInYears", value.experienceInYears);
    formData.append("experienceInMonths", value.experienceInMonths);
    formData.append("qualification", value.qualification);

    for (var i = 0; i < skillsArr.length; i++) {
      formData.append(`skills[${i}]`, skillsArr[i]);
    }

    formData.append("location", value.location);
    formData.append("hoursDays", value.hoursDays);
    formData.append("days", value.days);
    formData.append("timing", value.timing);
    formData.append("timezone", timezone);
    formData.append("category", value.category);
    formData.append("salary", salary);

    for (var i = 0; i < tagsArr.length; i++) {
      formData.append(`tags[${i}]`, tagsArr[i]);
    }

    formData.append("description", value.description);

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
    const designationList = await dropdownServices.designationList();

    setDesignationlist(designationList.data);

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
            <p className="px-4 py-2 connect-warn text-right">
              2 connects will be deducted for this job
            </p>
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
                          component={renderSelect}
                        >
                          {designationlist &&
                            designationlist.map((designation) => (
                              <option
                                value={designation.id}
                                key={designation.id}
                              >
                                {designation.title}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="form-field flex50">
                        <label>Experience</label>
                        <div className="inner-multi-field">
                          <div className="form-field flex50">
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
                                  <option key={i} value={num}>
                                    {num ? num + " year's" : ""}
                                  </option>
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
                                  <option key={i} value={num}>
                                    {num ? num + " month's" : ""}
                                  </option>
                                ))}
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
                          name="location"
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
                              <option key={i} value={num}>
                                {num ? num + " hour's" : ""}
                              </option>
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
                          <option value="1">1 day</option>
                          {[...Array.from(Array(8).keys())]
                            .slice(2)
                            .map((num, i) => (
                              <option key={i} value={num}>
                                {num ? num + " day's" : ""}
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
                        <div className="timezone--wrapper">
                          <label>Time Zone</label>
                          <TimezoneSelect
                            name="timezone"
                            value={timezone}
                            onChange={handleTimeZone}
                            labelStyle="Time Zone"
                            timezones={{
                              ...allTimezones,
                              "America/Lima": "Pittsburgh",
                              "Europe/Berlin": "Frankfurt",
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="category"
                          label="Category"
                          component={renderSelect}
                        >
                          <option selected="">Select job category</option>
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="Web Designer">Web Designer</option>
                          <option value="QA &amp; Testing">
                            QA &amp; Testing
                          </option>
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
                          onChange={handleSal}
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
