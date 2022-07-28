import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "./../assets/images/feed-logo.png";
import VerifiedIcon from "./../assets/icons/verify.png";
import LocationIcon from "./../assets/icons/loc-ico.png";
import ClockIcon from "./../assets/icons/clock-ico.png";
import SendInvitationModal from "./Common/SendInvitationModal";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import * as jobServices from "../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import toast from "toastr";
import * as types from "../types/auth";
import * as studentServices from "../services/studentServices";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostedJobCard = ({ jobs, type, activePage, pageSize }) => {
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth.user);
  const [tags, setTags] = useState([]);
  const [jobId, setJobId] = useState("");
  const [logo, setLogo] = useState("");
  const GetTags = () => {
    let job = jobs.tags;

    job = job && job.split && job.split(",");
    setTags(job);
  };

  useEffect(() => {
    const id = jobs.id;
    GetTags();
    setJobId(id);

    if (jobs?.company?.logoUrl) {
      let logo = jobs.company.logoUrl;
      setLogo(logo);
    }
  }, [jobs]);

  const applyJob = async () => {
    const payload = {
      jobId: jobs.id,
      userId: authData.id,
      remarks: "test",
    };
    const resp = await jobServices.applyJob(payload);
    if (resp.status == 200) {
      const resp2 = await studentServices.getStudentDetails(authData.id);
      if (resp.status === 200) {
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp2.data.data,
          token: localStorage.getItem("jobPortalUserToken"),
        });
      }
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
  return (
    <>
      <div className="feeds-search-coll">
        <div className="feeds-search-head">
          <div className="feeds-head-left">
            <div className="feeds-s-logo">
              <Link to={`/job-details/${jobId}`}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_API_URL}${logo}`}
                  alt="Company Logo"
                  width="70"
                  height="70"
                  style={{ borderRadius: "50%" }}
                />
              </Link>
            </div>
            <div className="feeds-s-name">
              <h2>
                <Link
                  to={
                    type == "find"
                      ? `/find-work/details/${jobId}`
                      : `/job-details/${jobId}`
                  }
                >
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
                {/* <li>
                  <img src={VerifiedIcon} alt="Company Verified" />
                  Verified post
                </li> */}
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
              {jobs?.createdOn ? (
                <ReactTimeAgo date={jobs.createdOn} locale="en-US" />
              ) : null}
            </p>
            <div className="d-flex">
              {authData?.userRoles[0] === "EMPLOYER" ? (
                <>
                  <button
                    type="button"
                    className="btn submit-btn mr-2"
                    // data-bs-toggle="modal"
                    // data-bs-target="#invitationPopup"
                  >
                    Invitation Accepted ({jobs?.invitationAcceptedCount}){" "}
                  </button>
                  <Link
                    to={`/review-applications/${jobs?.id}`}
                    type="button"
                    className="btn submit-btn"
                  >
                    Review Applications
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => applyJob()}
                >
                  Apply Now
                </button>
              )}

              {/* <SendInvitationModal /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobCard;
