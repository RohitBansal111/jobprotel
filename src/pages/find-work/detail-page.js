import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import toast from "toastr";
import * as jobServices from "../../services/jobServices";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Loader } from "../../components/Loader/Loader";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.user);
  toast.options = { preventDuplicates: true };
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [experience, setExperience] = useState("");
  const [exp, setExp] = useState([]);
  const [skills, setSkills] = useState([]);
  const handleApplicationReceived = () => {
    navigate("/review-applications");
  };

  useEffect(() => {
    getJobDetails(id);
  }, [id]);

  const getJobDetails = async (id) => {
    const resp = await jobServices.getJobDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      setJobDetails(response);
      setQualifications(response.qualifications);

      let exp = response.experience.split(".");
      exp[0] = `${exp[0]} years`;
      exp[1] = `${exp[1]} month`;
      setExp(exp);

      let skills = response.skills;
      skills = response && response.skills && response.skills.split(",");
      setSkills(skills);
    }
  };

  const applyJob = async () => {
    const payload = {
      jobId: id,
      userId: authData.id,
      remarks: "test",
    };
    const resp = await jobServices.applyJob(payload);
    if (resp.status === 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
    } else {
      if (resp.errors && typeof resp.errors === "object") {
        let errors = "";
        let keys = Object.keys(resp.errors);
        keys.forEach((key) => {
          errors = key + "," + errors;
        });

        errors = errors.replace(/,\s*$/, "");
        toast.error(errors + "is Required");
      } else if (resp.error) {
        toast.error(resp.error ? resp.error : "Something went wrong");
      }
    }
  };

  const saveJob = async () => {
    const payload = {
      jobId: id,
      userId: authData.id,
    };
    const resp = await jobServices.saveJob(payload);
    if (resp.status == 200) {
      getJobDetails(id);
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
    } else {
      if (resp.errors && typeof resp.errors === "object") {
        let errors = "";
        let keys = Object.keys(resp.errors);
        keys.forEach((key) => {
          errors = key + "," + errors;
        });

        errors = errors.replace(/,\s*$/, "");
        toast.error(errors + "is Required");
      } else if (resp.error) {
        toast.error(resp.error ? resp.error : "Something went wrong");
      }
    }
  };

  const getTimeZone = (timezone) => {
    if (timezone && timezone == "Doesn't Matter") {
      return timezone;
    } else if (timezone) {
      const zone = JSON.parse(timezone);
      return zone.value;
    } else {
      return "N/A";
    }
  };
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <section className="job-details-wrapper">
          <div className="container">
            <h1>Job Details</h1>
            <div className="row">
              <div className="col-12 col-md-9">
                <div className="details-card">
                  <div className="head43">
                    <h2>
                      {/* React Js Developer */}
                      {jobDetails && jobDetails.title && jobDetails.title}
                      <span>
                        {jobDetails && jobDetails.created ? (
                          <ReactTimeAgo
                            date={jobDetails?.created}
                            locale="en-US"
                          />
                        ) : null}
                      </span>
                    </h2>
                    {jobDetails?.category?.name}
                    {/* <p>Mobile/Tablet Front-End Developer</p> */}
                  </div>
                  <div className="job-description">
                    <p>{jobDetails?.description}</p>
                    {/* <p>
                    I need help with the html and css for the attached image.
                  </p>
                  <p>
                    The coding must be responsive, so even on a mobile phone the
                    2 images overlap.
                  </p>
                  <p>Should be separate images.</p>
                  <p>
                    The button should be perfectly centered horizontally and
                    vertically.
                  </p>
                  <p>
                    If needed on screens under 450px, we can remove order and
                    text decorate underline.
                  </p>
                  <p>**I do not need coding for the top 3 lines of text:</p>
                  <p>
                    Beautiful woven collection of classic motifs: buffalo plaid,
                    paisley, ticking stripes & more.
                  </p> */}
                  </div>
                  <div className="education-info">
                    <p>
                      <b>Experience: </b>{" "}
                      {exp &&
                        exp.length > 0 &&
                        exp.map((exp, index) => (
                          <span key={index}>{exp} </span>
                        ))}
                    </p>
                    <p>
                      <b>Education:</b>{" "}
                      {qualifications &&
                        qualifications.map((qual) => qual.name)}
                    </p>
                    <p>
                      <b>SKills: </b> {jobDetails?.skills}
                    </p>
                    <p>
                      <b>Job Location: </b> {jobDetails?.hoursPerDay}
                    </p>
                    <p>
                      <b>Hour/day: </b> {jobDetails?.location}
                    </p>
                    <p>
                      <b>Days / Week: </b> {jobDetails?.daysPerWeek}
                    </p>
                    <p>
                      <b>Job Timings/days: </b>
                      {jobDetails?.timing}
                    </p>
                    <p>
                      <b>Time Zone: </b> {getTimeZone(jobDetails?.timeZone)}
                    </p>
                    {/* <p>
                    <b>Category: </b>{" "}
                    {jobDetails &&
                      jobDetails.category &&
                      jobDetails.category.name &&
                      jobDetails.category.name}
                  </p> */}
                    <p>
                      <b>Salary: </b> ${" "}
                      {jobDetails && jobDetails.salary && jobDetails.salary}
                    </p>
                    <p>
                      <b>Tags:</b>{" "}
                      {jobDetails && jobDetails.tags && jobDetails.tags}
                    </p>
                  </div>
                  <div className="inner-info-section">
                    <h3>Skills and Expertise</h3>
                    <ul className="feeds-ul">
                      {skills &&
                        skills.length > 0 &&
                        skills.map((skill, index) => (
                          <li key={index}>
                            <Link to="#">{skill}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="details-right-sidebar">
                  <div className="post-action">
                    {jobDetails?.isJobApplied ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled
                      >
                        Applied
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => applyJob()}
                      >
                        Apply Now
                      </button>
                    )}

                    {jobDetails?.isJobFavorite ? (
                      <button
                        type="button"
                        className="btn btn-primary-outline"
                        disabled
                      >
                        Saved
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary-outline"
                        onClick={() => saveJob()}
                      >
                        Save Job
                      </button>
                    )}
                  </div>
                  <div className="connects-info">
                    <p>Required Connects to submit a proposal: 2 </p>
                    <p>
                      Available Connects:{" "}
                      {authData?.studentDetails?.availableConnects}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default DetailsPage;
