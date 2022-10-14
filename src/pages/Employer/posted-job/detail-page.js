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
  const [exp, setExp] = useState();
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
      setConnects(selector?.comapanyDetail?.availableConnects);
    }
  }, [selector]);
  const getJobDetails = async (id) => {
    const resp = await jobServices.getJobDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      // console.log(response, "::::");
      setJobDetails(response);
      setQualifications(response.qualifications);

      let exp = response.experience.split(".");
      exp[0] = `${exp[0]} year`;
      exp[1] = `${exp[1]} month`;
      console.log(exp, "::::");

      setExp(exp);

      let skills = response.skills;
      skills = response?.skills.split(",");
      setSkills(skills);
    }
  };

  const getTimeZone = (timezone) => {
    if (timezone && timezone == "Doesn't Matter") {
      return timezone;
    } else if (timezone) {
      const zone = JSON.parse(timezone);
      return zone.value;
      // return timezone;
    } else {
      return "N/A";
    }
  };

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
                      <p>{jobDetails?.category?.name}</p>
                    </div>
                    <div className="job-description">
                    <b>Job Description: </b>
                      <span>{jobDetails?.description}</span>
                    </div>
                    <div className="education-info">
                      {exp && exp[0] == "0 year" && exp && exp[1] == "0 month" ? (
                        <p>
                          <b>Experience: </b>
                          <span>Fresher</span>
                        </p>
                      ) : (
                        <p>
                          <b>Experience: </b>{" "}
                          {exp?.length > 0 &&
                            exp?.map((exp, index) => (
                              <span key={index}>{exp} </span>
                            ))}
                        </p>
                      )}
                      <p>
                        <b>Education:</b>{" "}
                        {qualifications?.map((qual) => qual.name)}
                      </p>
                      <p>
                        <b>SKills: </b> {jobDetails?.skills}
                      </p>
                      {jobDetails?.location !== "false" ? (
                        <>
                          <p>
                            <b>Job Location: </b> {jobDetails?.location}
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            <b>Time Zone: </b>{" "}
                            {getTimeZone(jobDetails?.timeZone)}
                          </p>
                        </>
                      )}
                      <p>
                        <b>Hour/day: </b> {jobDetails?.hoursPerDay}
                      </p>
                      <p>
                        <b>Day/Week: </b> {jobDetails?.daysPerWeek}
                      </p>
                      {jobDetails?.timing !== null && (
                        <p>
                          <b>Job Timings/days: </b>
                          {jobDetails?.timing}
                        </p>
                      )}
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
                      {selector?.comapanyDetail && (
                        <p>
                          Available Connects: <b>{connects}</b>
                        </p>
                      )}
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
