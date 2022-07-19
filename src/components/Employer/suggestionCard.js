import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import * as jobSevices from "../../services/jobServices";
import { useEffect, useState } from "react";

const SuggestionCard = ({ userData, jobId, userId }) => {
  const [userid, setUserId] = useState("");
  const [jobid, setJobId] = useState("");
  const [invitation, setInvitation] = useState(false);

  const jobInvite = async () => {
    const resp = await jobSevices.sendStudentJobInvitations(jobid, userid);
    console.log(resp);
    if (resp.status === 200) {
      setInvitation(!invitation);
    }
  };

  useEffect(() => {
    setJobId(jobId);
    setUserId(userId);
  }, [userData]);

  return (
    <div className="feeds-search-coll">
      <div className="feeds-search-head">
        <div className="feeds-head-left">
          <div className="feeds-s-logo">
            <Link to="/public">
              <img
                src={process.env.REACT_APP_IMAGE_API_URL + userData.pictureUrl}
                alt="Company Logo"
                width="100px"
                height="100px"
              />
            </Link>
          </div>
          <div className="feeds-s-name">
            <h2>
              <Link to="/public">
                {" "}
                {userData?.user?.firstName} {userData?.user?.lastName}
              </Link>{" "}
              <span className="desgination">(FrontEnd Developer)</span>{" "}
            </h2>
            <ul className="feeds-s-ul">
              <li>
                <img src={LocationIcon} alt="Location" />
                United States
              </li>
              <li>
                <img src={VerifiedIcon} alt="Company Verified" />
                Verified post
              </li>
            </ul>
          </div>
        </div>
        <div className="review-listing-action">
          <button
            type="button"
            className={
              invitation ? "btn btn-info mr-2" : "btn btn-primary mr-2"
            }
            onClick={jobInvite}
          >
            {invitation ? "Invited" : "Invite"}
          </button>
        </div>
      </div>
      <div className="feeds-search-detail">
        <p>{userData?.skills}</p>
      </div>
    </div>
  );
};

export default SuggestionCard;
