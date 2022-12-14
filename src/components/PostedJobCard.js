import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "./../assets/images/feed-logo.png";
import VerifiedIcon from "./../assets/icons/verify.png";
import LocationIcon from "./../assets/icons/loc-ico.png";
import ClockIcon from "./../assets/icons/clock-ico.png";
import SendInvitationModal from "./Common/SendInvitationModal";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import * as jobServices from "../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import toast from "toastr";
import * as types from "../types/auth";
import * as studentServices from "../services/studentServices";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostedJobCard = ({ jobs, type, activePage, getJobList, userdata }) => {
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
      getJobList(activePage);
      const resp2 = await studentServices.getStudentDetails(authData.id);
      if (resp.status === 200) {
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp2.data.data,
          token: localStorage.getItem("jobPortalUserToken"),
        });
      }
      toast.success(
        resp.data.data.message ? resp.data.data.message : "Something went wrong"
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
            {/* <div className="feeds-s-logo">
              <Link to={`/job-details/${jobId}`}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_API_URL}${logo}`}
                  alt="Company Logo"
                />
              </Link>
            </div> */}
            <div className="feeds-s-name w-100">
              <h2 className="mb-2 d-flex align-items-center justify-content-between">
                <Link
                  to={
                    type == "find"
                      ? `/find-work/details/${jobId}`
                      : `/job-details/${jobId}`
                  }
                >
                  {jobs && jobs.title && jobs.title}
                </Link>
                <p className="post-ago mb-0">
                  <img
                    src={ClockIcon}
                    alt="clock"
                    className="me-2"
                    width={17}
                    height={17}
                  />
                  {jobs?.createdOn ? (
                    <ReactTimeAgo
                      date={new Date(jobs.createdOn)}
                      locale="en-US"
                    />
                  ) : null}
                </p>
              </h2>
              {jobs?.location !== "false" && (
                <div className="location21 mb-2">
                  <i className="fa fa-map-marker-alt"></i>{" "}
                  {jobs?.location !== "false" && jobs?.location}
                </div>
              )}
            </div>
          </div>
          <div className="feeds-budget mb-2">
            <p>
              <b>Salary Range : &nbsp;</b>
              <span className="project-budget text-grey">
                $ {jobs && jobs.salary && jobs.salary}
              </span>
            </p>
          </div>
        </div>
        <div className="feeds-search-detail">
        <b>Job Description:   </b>
          <span className="mb-2 text-grey">
            {"  " + jobs && jobs.description && jobs.description}
            {/* <Link to="#">See more </Link> */}
          </span>
          <div className="d-flex justify-content-between align-items-start">
            <div className="feeds-tags">
              <ul className="feeds-ul">
                {tags &&
                  tags.length > 0 &&
                  tags.map((tag, index) => (
                    <li key={index}>
                      <Link to="#">{tag}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="posted-submit">
              <div className="d-flex">
                {authData?.userRoles[0] === "Employer" ? (
                  <>
                    {/* <Link
                      to={
                        jobs?.id != undefined
                          ? `/review-applications/${jobs?.id}`
                          : "#"
                      }
                    > */} 
                    <Link
                      to={`/invitation-accepted/${jobs?.id}`}
                      type="button"
                      className="btn submit-btn me-2 p-0 px-3"
                    >
                      Invitation Accepted ({jobs?.invitationAcceptedCount}){" "}
                    </Link>
                    {/* </Link> */}

                    <Link
                      to={`/review-applications/${jobs?.id}`}
                      type="button"
                      className="btn submit-btn p-0 px-3"
                    >
                      Review Applications ({jobs?.applicationRecivedCount})
                    </Link>
                  </>
                ) : jobs?.isJobApplied ? (
                  <button type="button" className="btn btn-primary" disabled>
                    Job Applied
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if(userdata?.studentDetails?.isProfileCompleted){
                        applyJob()
                      }else{
                        toast.error("Profile is not Completed");
                      }
                    }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobCard;
