import { Link } from "react-router-dom";
import UserAvatar from "./../../assets/images/demo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import * as jobSevices from "../../services/jobServices";
import { useEffect, useState } from "react";
import toast from "toastr";

const SuggestionCard = ({ userData, jobId, userIdd }) => {
  const [userId, setUserId] = useState("");
  const [jobid, setJobId] = useState("");
  const [invitation, setInvitation] = useState(false);

  const jobInvite = async () => {
    const resp = await jobSevices.sendStudentJobInvitations(jobid, userIdd);
    console.log(resp,'::::')
    if (resp.status === 200) {
      toast.success(
        resp.data.data.message ? resp.data.data.message : "Something went wrong"
      );
      setInvitation(!invitation);
    }else if (resp.status === 400) {
      toast.error(
        resp?.error?.message ? resp.error.message : "Something went wrong"
      );
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
            <Link to={`/public/${userIdd}`}>
              <img
                src={
                  userData?.pictureUrl && userData?.pictureUrl !== null
                    ? process.env.REACT_APP_IMAGE_API_URL + userData?.pictureUrl
                    : UserAvatar
                }
                alt="User profile"
                width="100px"
                height="100px"
              />
            </Link>
          </div>
          <div className="feeds-s-name">
            <h2>
              <Link to={`/public/${userIdd}`}>
                {" "}
                {userData?.user?.firstName} {userData?.user?.lastName}
              </Link>{" "}
              {/* <span className="desgination">
                ({userData?.designation?.title})
              </span>{" "} */}
            </h2>
            <ul className="feeds-s-ul">
              {userData?.state && (
                <li>
                  <img src={LocationIcon} alt="Location" />
                  {userData?.state?.stateName}
                </li>
              )}
              {/* <li>
                <img src={VerifiedIcon} alt="Company Verified" />
                Verified post
              </li> */}
            </ul>
          </div>
        </div>
        <div className="review-listing-action">
          {invitation ? (
            <button
              type="button"
              className={
                invitation ? "btn btn-info mr-2" : "btn btn-primary mr-2"
              }
            >
              Invited
            </button>
          ) : (
            <button
              type="button"
              className={
                invitation ? "btn btn-info mr-2" : "btn btn-primary mr-2"
              }
              onClick={jobInvite}
            >
              Invite
            </button>
          )}
        </div>
      </div>
      <div className="feeds-search-detail">
        <p>{userData?.skills}</p>
      </div>
    </div>
  );
};

export default SuggestionCard;
