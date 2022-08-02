import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/svg-icons/search";
import ClientAvtar from "./../../assets/images/profile-img.jpg";

const channelList = [
  {
    name: "Jaroslav Plotnikov",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "hiring multiple position on MARN development",
    lastChat:
      "Could you please estimate the fixed amount which you would like to receive for this job - helping me to simplify the code for 3 pages named above?",
  },
  {
    name: "chris donlon",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "Simplify the existing HTML/CSS ",
    lastChat:
      "I might have some more work for you, are you happy to work with me? Just small things",
  },
  {
    name: "Eran Tenenboim",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "PSD to HTML UI task",
    lastChat: "OK, ill reach out with some changes",
  },
  {
    name: "James Ryan",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "Hiring UI developer",
    lastChat: "yes. we no need to change contact.php",
  },
  {
    name: "Rebecca",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "Add recaptcha to website issues",
    lastChat: "Im waiting your response",
  },
  {
    name: "Steve Katz",
    clientId: "room_1c45dbb9cb68109f507e2ee331594a4b",
    task: "Fixing some issue on Figma",
    lastChat: "sure, I will available in 1 hour",
  },
];
const ClientChannel = ({ users, handleUser, user, handleSearchSubmit, search, setSearch }) => {
  return (
    <div className="channel-list-wrapper">
      <div className="client-search-box">
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search" />
          <input type="submit" value="search"/>
        </form>
      </div>
      <ul>
        {users && users.length > 0 && users.map((item, index) => {
          return (
            <li key={index} onClick={() => handleUser(item)}>
              <div className="client-avtar">
                <img src={process.env.REACT_APP_IMAGE_API_URL + item.studentUserImage} alt="client" />
                <span style={{ backgroundColor: "grey" }}></span>
              </div>
              <div className="client-info">
                <h5>{user && user.userRoles[0] && user.userRoles[0] == 'Student' ? item.employerDisplayName : item.studentDisplayName}</h5>
                <p>{item.message}</p>
              </div>
              {/* <div className="channel-action">
                <button
                  type="button"
                  tabIndex="0"
                  data-toggle="dropdown"
                  className="btn btn-action"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 14 14"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.52 6.75c0 .966-.789 1.75-1.76 1.75A1.755 1.755 0 010 6.75C0 5.784.788 5 1.76 5c.971 0 1.76.784 1.76 1.75m10.48 0c0 .966-.788 1.75-1.76 1.75a1.755 1.755 0 01-1.759-1.75c0-.966.788-1.75 1.759-1.75.972 0 1.76.784 1.76 1.75m-5.24 0c0 .966-.788 1.75-1.76 1.75a1.755 1.755 0 01-1.76-1.75C5.24 5.784 6.03 5 7 5c.972 0 1.76.784 1.76 1.75"
                    ></path>
                  </svg>
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li>Block</li>
                  <li>Close</li>
                </ul>
              </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientChannel;
