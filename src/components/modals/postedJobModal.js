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
          <div className="modal-body p-4">
            <div className="kyc-detail-form">
              <Form
                onSubmit={handleJobPost}
                validate={validate}
              >
                {({ handleSubmit, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-field-group mt-0">
                      <div className="form-field flex50">
                        <Field
                          name="designation"
                          label="Designation"
                          placeholder="Enter Designation"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="experience"
                          label="Experience"
                          placeholder="Enter Experience in Year's"
                          component={renderSelect}
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
                      </div>
                      <div className="form-field flex100">
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
                      <div className="form-field flex50">
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
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="location"
                          label="Job location"
                          placeholder="Enter Job Location"
                          component={renderField}
                          type="text"
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="hoursDays"
                          label="Hours/days"
                          placeholder="Enter hours/days"
                          component={renderSelect}
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
                          name="salary"
                          label="Salary"
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
