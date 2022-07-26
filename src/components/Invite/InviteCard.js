import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import ClockIcon from "./../../assets/icons/clock-ico.png";
import Pagination from "react-js-pagination";
import ReactTimeAgo from "react-time-ago";
import * as updateInvitationService from "../../services/updateInvitationService";
import toast from "toastr";
import { useSelector } from "react-redux";

const InviteCard = ({
  handlePageChange,
  activePage,
  pageSize,
  totalRecords,
  jobInvitations,
  getInvitations,
}) => {
  const authData = useSelector((state) => state.auth.user);

  const handleInvitation = async (st, id) => {
    // console.log(st, id ,"asdf");
    let data = {
      id: id,
      invitationStatus: st,
    };
    const resp = await updateInvitationService.updateInvitationStatus(data);
    console.log(resp);
    if (resp.status === 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      if (authData) {
        getInvitations(authData.id, activePage);
      }
    }
  };
  return (
    <>
      {jobInvitations?.map((invites, i) => (
        <div className="feeds-search-coll" key={i}>
          <div className="feeds-search-head">
            <div className="feeds-head-left">
              <div className="feeds-s-logo">
                <img
                  src={`${process.env.REACT_APP_IMAGE_API_URL}${invites?.company?.logoUrl}`}
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
            <p>
              {invites?.description}
              {/* We have a new project we might consider outsourcing. We need to
              hear some full stacks experts regarding the difficulty of such
              project, cost esitmations, and required skills. This job will be
              fast - a conversation. ------------------ About the project in a
              nutshell. <Link to="#">See more </Link> */}
            </p>
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
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "900px" }}
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
                </>
              ) : invites?.jobInvitationStatus === 1 ? (
                <h3 style={{ color: "green" }}>Accepted</h3>
              ) : (
                <h3 style={{ color: "red" }}>Rejected</h3>
              )}
            </div>
          </div>
        </div>
      ))}
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalRecords}
          pageRangeDisplayed={totalRecords / pageSize + 1}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default InviteCard;
