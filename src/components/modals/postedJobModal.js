import { Field, Form } from "react-final-form";
import {
  RenderTagField,
  RenderTagFieldOnlySuggestions,
} from "../renderTagField";
import {
  renderField,
  renderSelect,
  renderTextareaField,
  renderNumberField,
  RenderRadioButtonField,
  renderRangeField,
} from "./../renderField";
import validate from "./validators/postedJobValidator";
import * as dropdownServices from "../../services/dropDownServices";
import { useState, useEffect, useMemo } from "react";
import * as employerServices from "../../services/employerServices";
import LocalizedStrings from "react-localization";
import titles from "../Register/register.json";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useNavigate } from "react-router";
import toast from "toastr";

const PostedJobModal = ({ id }) => {
  let titleStrings = new LocalizedStrings(titles);

  const [qualificationList, setQualificationList] = useState([]);
  const [skillslist, setSkillslist] = useState([]);
  const [tagslist, setTagslist] = useState([]);
  const [designationlist, setDesignationlist] = useState([]);
  const [sal, setSal] = useState("10,000");
  const [datetime, setDatetime] = useState(spacetime.now());
  const [timezone2, setTimezone2] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  // const [postJobData, setPostJobData] = useState({
  //   employerId: "",
  //   title: "",
  //   description: "",
  //   designationId: "",
  //   experienceInYears: "",
  //   experienceInMonth: "",
  //   hoursPerDay: "",
  //   daysPerWeek: "",
  //   salary: sal,
  //   location: "",
  //   timing: "",
  //   qualification: "",
  //   skills: "",
  //   timeZone: "",
  //   tags: "",
  // });

  const navigate = useNavigate();
  const handleTimeZone = (data) => {
    console.log("data", data);
    setTimezone(data.value);
  };

  const [showTimeZone, setShowTimeZone] = useState(false);
  useMemo(() => {
    const timezoneValue = timezone.value ?? timezone;
    setDatetime(datetime.goto(timezoneValue));
  }, [timezone]);

  const handleSal = (e) => {
    let value = e.target.value;
    let sal = "";
    if (value > 0) {
      sal = value + "," + "000";
    } else {
      sal = 0;
    }
    setSal(sal);
  };

  const handleJobPost = (values) => {
    console.log(values.tags);
    let tagsArr = [];
    values &&
      values.tags.length > 0 &&
      values.tags.map((tag) => tagsArr.push(tag.text));

    let skillsArr = [];
    values &&
      values.skills.length > 0 &&
      values.skills.map((skill) => skillsArr.push(skill.text));

    let qualifictionsArr = [];
    values &&
      values.qualification.length > 0 &&
      values.qualification.map((qual) => qualifictionsArr.push(qual.id));

    // setPostJobData({
    //   ...values,
    //   hoursPerDay: values.hoursDays,
    //   daysPerWeek: values.days,
    //   skills: skillsArr,
    //   tags: tagsArr,
    //   qualification: qualifictionsArr,
    //   timeZone: showTimeZone ? timezone : timezone2,
    //   employerId: id,
    // });

    postJob({
      ...values,
      hoursPerDay: values.hoursDays,
      daysPerWeek: values.days,
      skills: skillsArr,
      tags: tagsArr,
      qualification: qualifictionsArr,
      timeZone: showTimeZone ? timezone : timezone2,
      employerId: id,
      salary: sal,
      experienceInYears: values.experienceInYears ? values.experienceInYears : 0,
      experienceInMonth: values.experienceInMonth ? values.experienceInMonth : 0,
      hoursDays: values.hoursDays ? values.hoursDays : 1,
      days: values.days ? values.days : 1,

    });
  };

  const postJob = async (data) => {
    const resp = await employerServices.jobPost(data);
    console.log(resp);
    // redirect on success
    if (resp.status == 200) {
      navigate("/sugguestion");
      toast.success(resp.data.message);
    } else if (resp.status == 400) {
      toast.error("Something went wrong");
    }
  };

  useEffect(async () => {
    const resp = await dropdownServices.qualificationList();

    let qualificationListData = [];
    resp.data.map((data) => {
      let obj = { id: data.id, text: data.name };
      qualificationListData.push(obj);
    });
    setQualificationList(qualificationListData);

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

  const handleTimeZonePick = (e) => {
    let value = e.target.value;
    if (value == "Yes") {
      setShowTimeZone(true);
    } else {
      setShowTimeZone(false);
      setTimezone2(value);
    }
  };

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
                          name="title"
                          label="Job Title"
                          placeholder="Enter Job Title"
                          component={renderField}
                        />
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="designationId"
                          label="Designation"
                          placeholder="Enter Designation"
                          component={renderSelect}
                        >
                          <option value="" disabled>
                            Select
                          </option>
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
                              name="experienceInMonth"
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
                          component={RenderTagFieldOnlySuggestions}
                          suggestions={qualificationList}
                        />
                      </div>
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
                          type="text"
                        />
                      </div>
                      <div className="form-field flex50">
                        <label htmlFor="working">Select Time Zone</label>
                        <div className="radio-button-groupss">
                          <Field
                            name="timeZonePick"
                            value="Yes"
                            component={RenderRadioButtonField}
                            type="radio"
                            onChange={handleTimeZonePick}
                            currentIndex="0"
                          >
                            Yes
                          </Field>
                          <Field
                            name="timeZonePick"
                            value="Doesn't Matter"
                            component={RenderRadioButtonField}
                            type="radio"
                            onChange={handleTimeZonePick}
                            currentIndex="1"
                          >
                            No
                          </Field>
                        </div>
                      </div>

                      {showTimeZone && (
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
                      )}
                      <div className="form-field flex50">
                        <Field
                          name="category"
                          label="Category"
                          component={renderSelect}
                        >
                          <option value="" disabled>
                            Select job category
                          </option>
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
                          component={renderRangeField}
                          onChange={handleSal}
                          min="10"
                          max="100"
                          step="10"
                          defaultValue="10"
                          value={sal}
                        />
                        <p>$ {sal && sal}</p>
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
