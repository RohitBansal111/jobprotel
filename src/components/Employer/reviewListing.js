import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import { useState } from "react";
import { useNavigate } from "react-router";

const EmployerReviewCard = () => {
  const [showAcceptInvitation, setshowAcceptInvitation] = useState(true);
  const [showRejectedView, setshowRejectedView] = useState(true);
  const navigate = useNavigate();

  const handleAcceptInvitation = () => {
    setshowAcceptInvitation(false);
  };

  const handleRejected = () => setshowRejectedView(false);
  const handleChatNow = () => navigate("/employer-inbox");

  return (
    <div className="feeds-search-coll">
      <div className="feeds-search-head">
        <div className="feeds-head-left">
          <div className="feeds-s-logo">
            <Link to="/public">
              <img src={CompanyLogo} alt="Company Logo" />{" "}
            </Link>
          </div>
          <div className="feeds-s-name">
            <h2>
              <Link to="/public"> Rahul Singh</Link>{" "}
              <span className="desgination">(FrontEnd Developer)</span>{" "}
            </h2>
            <ul className="feeds-s-ul">
              <li>
                <img src={LocationIcon} alt="Location" />
                India
              </li>
              <li>
                <img src={VerifiedIcon} alt="Company Verified" />
                Verified post
              </li>
            </ul>
          </div>
        </div>
        <div className="review-listing-action">
          {showRejectedView ? (
            <>
              {showAcceptInvitation ? (
                <button
                  type="button"
                  onClick={handleAcceptInvitation}
                  className="btn btn-primary mr-2"
                >
                  Accept
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleChatNow}
                  className="btn btn-primary mr-2"
                >
                  <i className="fa fa-comments mr-2"></i> Chat Now
                </button>
              )}
              <button
                type="button"
                onClick={handleRejected}
                className="btn btn-reject"
              >
                Reject
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleRejected}
              className="btn btn-reject"
            >
              Rejected
            </button>
          )}
        </div>
      </div>
      <div className="feeds-search-detail">
        <p>
          We have a new project we might consider outsourcing. We need to hear
          some full stacks experts regarding the difficulty of such project,
          cost esitmations, and required skills. This job will be fast - a
          conversation. ------------------ About the project in a nutshell.{" "}
          <Link to="#">See more </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployerReviewCard;
