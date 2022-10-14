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
  rendercheckbox,
} from "./../renderField";
import validate from "./validators/postedJobValidator";
import * as dropdownServices from "../../services/dropDownServices";
import { useState, useEffect, useMemo } from "react";
import * as jobServies from "../../services/jobServices";
import LocalizedStrings from "react-localization";
import titles from "../Register/register.json";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useNavigate } from "react-router";
import toast from "toastr";
import { Loader } from "../../components/Loader/Loader";

const PostedJobModal = ({ id }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [qualificationList, setQualificationList] = useState(null);
  const [skillslist, setSkillslist] = useState([]);
  const [tagslist, setTagslist] = useState([]);
  const [sal, setSal] = useState("10,000");
  const [datetime, setDatetime] = useState(spacetime.now());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [qualificationId, setQualificationId] = useState("");
  const [inputField, setInputField] = useState(false);
  const [working, setWorking] = useState("");
  const [timezoneCheck, setTimezoneCheck] = useState(false);
  const [locationCheck, setLocationCheck] = useState(false);
  const [checkinvites, setCheckInvites] = useState(false);

  const handleTimeZone = (data) => {
    // let d = JSON.stringify(data);
    setTimezone(data);
  };

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
    let tagsArr = [];
    values?.tags?.length > 0 &&
      values.tags.map((tag) => tagsArr.push(tag.text));

    let skillsArr = [];
    values?.skills?.length > 0 &&
      values.skills.map((skill) => skillsArr.push(skill.text));

    let qualifictionsArr = [];
    values?.qualification?.length > 0 &&
      values.qualification.map((qual) => qualifictionsArr.push(qual.id));

    let defaultTimezone = {
      value: "Asia/Kolkata",
      label: "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi",
      offset: 5.5,
      abbrev: "IST",
      altName: "India Standard Time",
    };

    let arr = [];
    arr.push(qualificationId);
    postJob({
      userId: id,
      title: values.title,
      description: values.description,
      designation: values.designation,
      experienceInYears: values.experienceInYears
        ? values.experienceInYears
        : 0,
      experienceInMonth: values.experienceInMonth
        ? values.experienceInMonth
        : 0,
      hoursPerDay: values.hoursDays,
      daysPerWeek: values.days,
      workingTypes: working,
      salary: sal,
      timezone:
        working == 2 && timezone == "Asia/Calcutta"
          ? JSON.stringify(defaultTimezone)
          : JSON.stringify(timezone),
      location: working == 1 && values.location,

      skills: skillsArr,
      tags: tagsArr,
      qualification: arr,
      isPrivate: checkinvites,
    });
  };

  const postJob = async (data) => {
    setLoading(true);
    const resp = await jobServies.jobPost(data);
    if (resp.status == 200) {
      setLoading(false);
      toast.success(resp.data.message);
      navigate(`/suggestion/${resp.data.data.jobId}`);
    } else if (resp.status == 400) {
      setLoading(false);
      toast.error(resp.error || "Something went wrong");
      document.getElementById("postedJob").click();
    }
  };

  useEffect(async () => {
    const qualification = await dropdownServices.qualificationList();
    setQualificationList(qualification.data);

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

  const handleCheckBoxInvites = (e) => {
    setCheckInvites(e.target.checked);
  };

  const handleQualification = (e) => {
    let value = e.target.value;
    setQualificationId(value);
    if (value == "879f9960-14ba-11ed-984a-068f5cec9f16") {
      setInputField(true);
    } else {
      setInputField(false);
    }
  };

  const handleWorkingChange = (e) => {
    let value = e.target.value;
    setWorking(value);
    if (value == 1) {
      setTimezoneCheck(false);
      setLocationCheck(true);
    } else if (value == 2) {
      setLocationCheck(false);
      setTimezoneCheck(true);
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
                              name="experienceInYears"
                              label="Experience"
                              component={renderSelect}
                              placeholder="Year"
                              type="text"
                            >
                              <option value="0">0 year</option>
                              {[...Array.from(Array(51).keys())]
                                .slice(1)
                                .map((num, i) => (
                                  <option key={i} value={num}>
                                    {num ? num + " year" : ""}
                                  </option>
                                ))}
                            </Field>
                          </div>
                          <div className="form-field flex50">
                            <Field
                              name="experienceInMonth"
                              label="Experience"
                              component={renderSelect}
                              placeholder="Month"
                              type="text"
                            >
                              <option value="0">0 month</option>
                              {[...Array.from(Array(12).keys())]
                                .slice(1)
                                .map((num, i) => (
                                  <option key={i} value={num}>
                                    {num ? num + " month" : ""}
                                  </option>
                                ))}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="qualificationId"
                          label="Education course"
                          component={renderSelect}
                          onChange={handleQualification}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {qualificationList &&
                            qualificationList.map((qualification, i) => (
                              <option value={qualification.id} key={i}>
                                {qualification.name}
                              </option>
                            ))}
                        </Field>
                      </div>
                      {inputField && (
                        <div className="form-field flex100">
                          <Field name="qualification" component={renderField} />
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
                          name="hoursDays"
                          label="Hour / Day"
                          component={renderSelect}
                        >
                          {[...Array.from(Array(16).keys())]
                            .slice(1)
                            .map((num, i) => (
                              <option key={i} value={num}>
                                {num ? num + " hour" : ""}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="form-field flex50">
                        <Field
                          name="days"
                          label="Day / Week"
                          component={renderSelect}
                          type="text"
                        >
                          <option value="1">1 day</option>
                          {[...Array.from(Array(8).keys())]
                            .slice(2)
                            .map((num, i) => (
                              <option key={i} value={num}>
                                {num ? num + " day" : ""}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="form-field flex50">
                        <label>Job Type</label>
                        <div className="radio-button-groupss absolute-error">
                          <Field
                            name="working"
                            value="1"
                            component={RenderRadioButtonField}
                            type="radio"
                            onChange={handleWorkingChange}
                            dvalue={working}
                            currentIndex="0"
                          >
                            Onsite
                          </Field>
                          <Field
                            name="working"
                            value="2"
                            component={RenderRadioButtonField}
                            type="radio"
                            onChange={handleWorkingChange}
                            dvalue={working}
                            currentIndex="1"
                          >
                            OffSite
                          </Field>
                        </div>
                      </div>
                      {locationCheck && (
                        <div className="form-field flex100">
                          <Field
                            name="location"
                            label="Location"
                            placeholder="Enter job location"
                            component={renderField}
                          />
                        </div>
                      )}
                      {timezoneCheck && (
                        <div className="form-field flex100">
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
                          </div>{" "}
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
                      <div className="form-field flex100">
                        <input
                          name="checkinvites"
                          type="checkbox"
                          onChange={handleCheckBoxInvites}
                          checked={checkinvites}
                        />
                        <label style={{ marginLeft: "10px" }}>
                          Make This Job Available for invites
                        </label>
                      </div>
                      <div className="form-field flex100">
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
                          disabled={loading}
                        >
                          {loading && (
                            <div className="button-submit-loader">
                              <Loader />
                            </div>
                          )}{" "}
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
