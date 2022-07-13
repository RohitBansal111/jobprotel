import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import VerifiedIcon from "./../../../assets/icons/verify.png";
import LocationIcon from "./../../../assets/icons/loc-ico.png";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import * as jobServices from "../../../services/jobServices";

const EmployerJobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [experience, setExperience] = useState("");
  const [exp, setExp] = useState([]);
  const [skills, setSkills] = useState([])
  const handleApplicationReceived = () => {
    navigate("/review-applications");
  };

  useEffect(() => {
    getJobDetails(id);
  }, [id]);

  const getJobDetails = async (id) => {
    const resp = await jobServices.getJobDetails(id);
    console.log(resp);
    if (resp.status == 200) {
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

  return (
    <Layout>
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
                    <span>Posted 8 hours ago</span>
                  </h2>
                  <p>Mobile/Tablet Front-End Developer</p>
                </div>
                <div className="job-description">
                  <p>{jobDetails && jobDetails.description && jobDetails.description}</p>
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
                      exp.map((exp, index) => <span key={index}>{exp} </span>)}
                  </p>
                  <p>
                    <b>Education:</b>{" "}
                    {qualifications && qualifications.map((qual) => qual.name)}
                  </p>
                  <p>
                    <b>SKills: </b>{" "}
                    {jobDetails && jobDetails.skills && jobDetails.skills}
                  </p>
                  <p>
                    <b>Job Location: </b>{" "}
                    {jobDetails &&
                      jobDetails.hoursPerDay &&
                      jobDetails.hoursPerDay}
                  </p>
                  <p>
                    <b>Hour/day: </b>{" "}
                    {jobDetails && jobDetails.location && jobDetails.location}
                  </p>
                  <p>
                    <b>Days / Week: </b>{" "}
                    {jobDetails &&
                      jobDetails.daysPerWeek &&
                      jobDetails.daysPerWeek}
                  </p>
                  <p>
                    <b>Job Timings/days: </b>
                    {jobDetails && jobDetails.timing && jobDetails.timing}
                  </p>
                  <p>
                    <b>Time Zone: </b>{" "}
                    {jobDetails && jobDetails.timeZone && jobDetails.timeZone}
                  </p>
                  <p>
                    <b>Category: </b>{" "}
                    {jobDetails &&
                      jobDetails.category &&
                      jobDetails.category.name &&
                      jobDetails.category.name}
                  </p>
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

                    {/* <li>
                      <Link to="#">API </Link>
                    </li>
                    <li>
                      <Link to="#">Web Application </Link>
                    </li>
                    <li>
                      <Link to="#">Wearable Technology </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="details-right-sidebar">
                <div className="post-action">
                  <button
                    type="button"
                    onClick={handleApplicationReceived}
                    className="btn btn-primary"
                  >
                    Applications received (17)
                  </button>
                  <button type="button" className="btn btn-primary-outline">
                    Invitation accepted (12)
                  </button>
                </div>
                <div className="connects-info">
                  <p>
                    Required Connects to submit a proposal: <b>2</b>{" "}
                  </p>
                  <p>
                    Available Connects: <b>14</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployerJobDetailsPage;
