import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import VerifiedIcon from "./../../../assets/icons/verify.png";
import LocationIcon from "./../../../assets/icons/loc-ico.png";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import * as jobServices from "../../../services/jobServices";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader/Loader";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const EmployerJobDetailsPage = () => {
  const selector = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [jobDetails, setJobDetails] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [experience, setExperience] = useState("");
  const [exp, setExp] = useState([]);
  const [skills, setSkills] = useState([]);
  const [connects, setConnects] = useState("");
  // const handleApplicationReceived = () => {
  //   navigate("/review-applications");
  // };

  useEffect(() => {
    getJobDetails(id);
  }, [id]);

  useEffect(() => {
    if (selector) {
      setLoading(false);
      setConnects(selector?.comapanyDetail?.availableConnects);
    }
  }, [selector]);
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
      skills = response?.skills.split(",");
      setSkills(skills);
    }
  };
  console.log(jobDetails.id, "::");

  return (
    <Layout>
      <section className="job-details-wrapper">
        <div className="container">
          <h1>Job Details</h1>
          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="col-12 col-md-9">
                  <div className="details-card">
                    <div className="head43">
                      <h2>
                        {/* React Js Developer */}
                        {jobDetails?.title}
                        <span>
                          {jobDetails?.created ? (
                            <ReactTimeAgo
                              date={jobDetails?.created}
                              locale="en-US"
                            />
                          ) : null}
                        </span>
                      </h2>
                      {/* <p>Mobile/Tablet Front-End Developer</p> */}
                      <p>{jobDetails?.category?.name}</p>
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
                        <b>Time Zone: </b> {jobDetails?.timeZone}
                      </p>
                      {/* <p>
                        <b>Category: </b>{" "}
                        {jobDetails &&
                          jobDetails.category &&
                          jobDetails.category.name &&
                          jobDetails.category.name}
                      </p> */}
                      <p>
                        <b>Salary: </b> $ {jobDetails?.salary}
                      </p>
                      <p>
                        <b>Tags:</b> {jobDetails?.tags}
                      </p>
                    </div>
                    <div className="inner-info-section">
                      <h3>Skills and Expertise</h3>
                      <ul className="feeds-ul">
                        {skills?.length > 0 &&
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
                      <button
                        type="button"
                        // onClick={handleApplicationReceived}
                        className="btn btn-primary"
                      >
                        <Link
                          to={
                            jobDetails?.id != undefined
                              ? `/review-applications/${jobDetails?.id}`
                              : "#"
                          }
                        >
                          {" "}
                          Applications received (
                          {jobDetails?.applicationRecivedCount})
                        </Link>
                      </button>
                      <button type="button" className="btn btn-primary-outline">
                        Invitation accepted (
                        {jobDetails?.invitationAcceptedCount})
                      </button>
                    </div>
                    <div className="connects-info">
                      <p>
                        Required Connects to submit a proposal: <b>2</b>{" "}
                      </p>
                      <p>
                        Available Connects: <b>{connects}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployerJobDetailsPage;
