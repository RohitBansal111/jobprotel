import { Link } from "react-router-dom";
import UserAvatar from "./../../assets/images/demo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import ClockIcon from "./../../assets/icons/clock-ico.png";
import Pagination from "react-js-pagination";
import ReactTimeAgo from "react-time-ago";
import * as updateInvitationService from "../../services/updateInvitationService";
import toast from "toastr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const InviteCard = ({
  handlePageChange,
  activePage,
  pageSize,
  totalRecords,
  jobInvitations,
  getInvitations,
}) => {
  const navigate = useNavigate();

  const authData = useSelector((state) => state.auth.user);

  const handleInvitation = async (st, id) => {
    let data = {
      id: id,
      invitationStatus: st,
    };
    const resp = await updateInvitationService.updateInvitationStatus(data);
    if (resp.status === 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      if (authData) {
        getInvitations(authData.id, activePage);
      }
    }
  };
  const handleChatNow = (id, jobId) => navigate(`/inbox/${id}/${jobId}`);
  return (
    <>
      {jobInvitations?.map((invites, i) => (
        <div className="feeds-search-coll" key={i}>
          <div className="feeds-search-head d-flex justify-content-between">
            <div className="feeds-head-left">
              <div className="feeds-s-logo">
                <img
                  src={
                    invites?.company !== null &&
                    invites?.company?.logoUrl !== null
                      ? `${process.env.REACT_APP_IMAGE_API_URL}${invites?.company?.logoUrl}`
                      : UserAvatar
                  }
                  alt="Company Logo"
                  height="50"
                  width="50"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="feeds-s-name">
                <h2>
                  <Link to="#">{invites?.title}</Link>
                </h2>
                <ul className="feeds-s-ul">
                  <li>
                    <img src={LocationIcon} alt="Location" />
                    {invites?.location}
                  </li>
                  {/* <li>
                    <img src={VerifiedIcon} alt="Company Verified" />
                    Verified post
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="feeds-budget">
              <p>Est. Budget</p>
              <span className="project-budget">
                {invites?.salary ? "$" : null}
                {invites?.salary}
              </span>
            </div>
          </div>
          <div className="feeds-search-detail">
            <p>{invites?.description}</p>
            <div className="feeds-tags">
              <ul className="feeds-ul">
                {invites?.skills?.split(",").map((sk, i) => (
                  <li key={i}>
                    <Link to="#">{sk} </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="posted-submit">
              <p className="post-ago">
                <img src={ClockIcon} alt="clock" />
                {invites?.created ? (
                  <ReactTimeAgo date={invites?.created} locale="en-US" />
                ) : null}
              </p>
              {invites?.jobInvitationStatus === 0 ? (
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => handleInvitation(1, invites.invitationId)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleInvitation(2, invites.invitationId)}
                  >
                    Reject
                  </button>
                </div>
              ) : invites?.jobInvitationStatus === 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleChatNow(invites.userId, invites.jobId)}
                    className="btn btn-primary me-2"
                  >
                    <i className="fa fa-comments me-2"></i> Chat Now
                  </button>
                </>
              ) : (
                <h3 style={{ color: "red" }}>Rejected</h3>
              )}
            </div>
          </div>
        </div>
      ))}
      {totalRecords > 5 && (
        <div>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalRecords}
            pageRangeDisplayed={4}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default InviteCard;
