import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "./../assets/images/feed-logo.png";
import VerifiedIcon from "./../assets/icons/verify.png";
import LocationIcon from "./../assets/icons/loc-ico.png";
import ClockIcon from "./../assets/icons/clock-ico.png";
import SendInvitationModal from "./Common/SendInvitationModal";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
// import ReactTimeAgo from 'react-time-ago'


const PostedJobCard = ({ jobs }) => {
  const [tags, setTags] = useState([]);
  const [jobId, setJobId] = useState("");

  const GetTags = () => {
    let job = jobs.tags;

    job = job && job.split && job.split(",");
    setTags(job);
  };

  useEffect(() => {
    const id = jobs.id;
    GetTags();
    setJobId(id);
  }, [jobs]);

  return (
    <>
      <div className="feeds-search-coll">
        <div className="feeds-search-head">
          <div className="feeds-head-left">
            <div className="feeds-s-logo">
              <Link to={`/job-details/${jobId}`}>
                <img src={CompanyLogo} alt="Company Logo" />
              </Link>
            </div>
            <div className="feeds-s-name">
              <h2>
                <Link to={`/job-details/${jobId}`}>
                  {/* Mobile/Tablet Front-End Developer{" "} */}
                  {jobs && jobs.title && jobs.title}
                </Link>
              </h2>
              <ul className="feeds-s-ul">
                <li>
                  <img src={LocationIcon} alt="Location" />
                  {/* United States */}
                  {jobs && jobs.location && jobs.location}
                </li>
                <li>
                  <img src={VerifiedIcon} alt="Company Verified" />
                  Verified post
                </li>
              </ul>
            </div>
          </div>
          <div className="feeds-budget">
            <p>Salary Range</p>
            <span className="project-budget">
              $ {jobs && jobs.salary && jobs.salary}
            </span>
          </div>
        </div>
        <div className="feeds-search-detail">
          <p>
            {/* We have a new project we might consider outsourcing. We need to hear
            some full stacks experts regarding the difficulty of such project,
            cost esitmations, and required skills. This job will be fast - a
            conversation. ------------------ About the project in a nutshell.{" "} */}
            {jobs && jobs.description && jobs.description}
            {/* <Link to="#">See more </Link> */}
          </p>
          <div className="feeds-tags">
            <ul className="feeds-ul">
              {tags &&
                tags.length > 0 &&
                tags.map((tag, index) => (
                  <li key={index}>
                    <Link to="#">{tag}</Link>
                  </li>
                ))}

              {/* <li>
                <Link to="#">Web Application </Link>
              </li>
              <li>
                <Link to="#">Wearable Technology </Link>
              </li> */}
            </ul>
          </div>
          <div className="posted-submit">
            <p className="post-ago">
              <img src={ClockIcon} alt="clock" /> 
              <ReactTimeAgo date= {jobs && jobs.createdOn && jobs.createdOn} locale="en-US"/>
              {/* <ReactTimeAgo  locale="en-US" timeStyle="twitter"/> */}
            </p>
            <div className="d-flex">
              <button
                type="button"
                className="btn submit-btn mr-2"
                data-bs-toggle="modal"
                data-bs-target="#invitationPopup"
              >
                Invitation Accepted (13){" "}
              </button>
              <Link
                to="/review-applications"
                type="button"
                className="btn submit-btn"
              >
                Review Applications
              </Link>
              <SendInvitationModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobCard;
