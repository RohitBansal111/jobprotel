import { Link } from "react-router-dom";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import StudentProfile from "./../../assets/images/feed-logo.png";
import UserAvatar from "../../assets/images/demo.png";
const InvitationCard = ({ data }) => {
  return (
    <div className="feeds-search-coll">
      <div className="feeds-search-head">
        <div className="feeds-head-left">
          <div className="feeds-s-logo">
            <Link to={`/public/${data?.userId}`}>
              <img
                src={
                  data?.pictureUrl !== null
                    ? `${process.env.REACT_APP_IMAGE_API_URL}/${data.pictureUrl}`
                    : UserAvatar
                }
                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                alt="profile image2"
              />
            </Link>
          </div>
          <div className="feeds-s-name">
            <h2>
              <Link to={`/public/${data?.userId}`}>
                {data?.firstName} {data?.lastName}
              </Link>{" "}
            </h2>
            <ul className="feeds-s-ul mb-2">
              <li>
                <img src={LocationIcon} alt="Location" />
                {data?.cityName}
              </li>
            </ul>
            <p className="mb-1">
              <b>Role:</b>
              {data?.skills}
            </p>
            <p>{data?.description}</p>
          </div>
        </div>
        <div className="feeds-s-name"></div>
      </div>
    </div>
  );
};

export default InvitationCard;
