import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";

const SuggestionCard = (props) => {
  const { userData } =props
  return (
    <div className="feeds-search-coll">
      <div className="feeds-search-head">
        <div className="feeds-head-left">
          <div className="feeds-s-logo">
            <Link to="/public">
              <img src={process.env.REACT_APP_IMAGE_API_URL+userData.pictureUrl} alt="Company Logo" width="100px" height="100px"/>
            </Link>
          </div>
          <div className="feeds-s-name">
            <h2>
              <Link to="/public"> {userData?.user?.firstName} {userData?.user?.lastName}</Link>{" "}
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
          <button type="button" className="btn btn-primary mr-2">
            {" "}
            Invite{" "}
          </button>
        </div>
      </div>
      <div className="feeds-search-detail">
        <p>
          {userData?.skills}
        </p>
      </div>
    </div>
  );
};

export default SuggestionCard;
