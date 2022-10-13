import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./../../assets/images/inner-logo.png";
import Notification from "./../../assets/icons/notification-ico.png";
import userAvtar from "./../../assets/images/demo.png";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../types/auth";
import CompanyProfile from "./../../assets/images/company-logo.png";
import * as notificationServices from "../../services/notificationServices";
import * as jobServices from "../../services/jobServices";
import { HubConnectionBuilder } from "@microsoft/signalr";
import app from "../../helpers/firebase";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  query,
  equalTo,
  orderByChild,
  get,
  update,
  remove,
} from "@firebase/database";
import { useNavigate } from "react-router";
import ReactTimeAgo from "react-time-ago";

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_IMAGE_API_URL}chatHub`)
  .withAutomaticReconnect()
  .build();

const Header = () => {
  const db = getDatabase(app);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [mobileMenu, setmobileMenu] = useState("");
  const [role, setRole] = useState("Employer");

  const [profilePic, setProfilePic] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.on("ReceiveMessage", (message) => {});
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, []);

  const getNotifications = async (id) => {
    let data = {
      loggedInUserId: id,
      pageNumber: 1,
      pageSize: 5,
    };

    const resp = await notificationServices.getNotifications(data);
    if (resp.status === 200) {
      setTotalCount(resp.data.totalCount);
      let response = resp.data.data;
      setNotifications(response);
    }
  };

  const sendMessage = async () => {
    const chatMessage = {
      user: "test",
      message: "test",
      connectionId: connection.connection.connectionId,
    };
    if (connection._connectionStarted) {
      try {
        const send = await connection.send(
          "AddConnection",
          authData?.email,
          connection.connection.connectionId
        );
        getJobDetails();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const getJobDetails = async () => {
    const resp = await jobServices.getJobByEmail(authData.email);
    if (resp.status == 200) {
      // console.log(resp.data.data, "::::");
    }
  };

  const pathName = window.location.pathname;
  useEffect(() => {
    if (pathName != "/inbox" && authData) {
      readUsers(authData.id);
    }
  }, [pathName, authData]);

  const readUsers = (userId) => {
    const starUserRef = ref(db, "User");
    onValue(starUserRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const convertedData = Object.keys(data).map((d) => {
          return data[d];
        });
        if (
          authData &&
          authData.userRoles[0] &&
          authData.userRoles[0] == "Student"
        ) {
          let finalData = convertedData.filter(
            (data) => data.studentId == userId
          );
          finalData.map((data) => {
            if (data.live) {
              const updates = {};
              updates["/studentLive/"] = false;
              update(ref(db, "User/" + data.chatRoomID), updates);
            }
          });
        } else {
          let finalData = convertedData.filter(
            (data) => data.employerId == userId
          );
          finalData.map((data) => {
            if (data.live) {
              const updates = {};
              updates["/employerLive/"] = false;
              update(ref(db, "User/" + data.chatRoomID), updates);
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    if (
      authData?.studentDetails &&
      authData?.studentDetails?.pictureUrl !== null
    ) {
      setProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData?.studentDetails?.pictureUrl}`
      );
    } else if (
      authData?.comapanyDetail &&
      authData?.comapanyDetail?.logoPath !== null
    ) {
      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData?.comapanyDetail?.logoPath}`
      );
    }
    if (authData) {
      getNotifications(authData.id);
    }
  }, [authData]);

  const menuToggle = () => {
    setmobileMenu("navbar-mobile");
    if (mobileMenu === "navbar-mobile") {
      setmobileMenu("");
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem("jobPortalUser");
    const userData = JSON.parse(localData);
    setUserData(userData);
    if (!authData && userData) {
      dispatch({
        type: types.LOGIN_USER_SUCCESS,
        payload: userData,
        token: localStorage.getItem("jobPortalUserToken"),
      });
    }
    if (authData) {
      // setRole(authData?.userRoles?.userRoles[0]?.userRoles[0]);
      setRole(authData?.userRoles[0]);
    }
  }, [authData]);

  const handleLogout = () => {
    localStorage.removeItem("jobPortalUser");
    localStorage.removeItem("jobPortalUserToken");
    dispatch({
      type: types.LOGOUT_USER,
    });
  };

  const checkNotification =() => {
   // let id = notification?.id
    navigate(`/notifications`)
  }

  return (
    <header id="header" className="header header-scrolled">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="inner-logo">
          <Link
            to={role === "Employer" ? "/posted-jobs" : "/find-work"}
            className="logo d-flex align-items-center"
          >
            <img src={Logo} alt="Real Job" />
          </Link>
        </div>
        {/* <span onClick={sendMessage}>Send Message</span> */}
        <div className="right-side-nav">
          <nav id="navbar" className={`navbar ${mobileMenu}`}>
            <ul>
              {role !== "Employer" ? (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/find-work"
                    >
                      Find Work
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/jobs-applied"
                    >
                      Jobs Applied
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/invites"
                    >
                      Invites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/inbox"
                    >
                      Inbox
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/posted-jobs"
                    >
                      Posted jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/applications"
                    >
                      Applications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/inbox"
                    >
                      Inbox
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <button
              type="button"
              onClick={menuToggle}
              className="btn mobile-nav-toggle"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </nav>
          <div className="head-notification">
            <span className="notification-ico">
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={Notification} alt="Notification" />
                  <span className="notifi-badge"> {totalCount} </span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {notifications &&
                    notifications.length > 0 &&
                    notifications.map((notification, i) => (
                      <li key={i}>
                        <div className="notification-heading">
                          {notification.notificationType == 7 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.employerResponseDto?.firstName}{" "}
                                {notification?.employerResponseDto?.lastName}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 3 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.studentResponseDto !== null
                                  ? notification?.studentResponseDto?.firstName
                                  : notification?.employerResponseDto !== null
                                  ? notification?.employerResponseDto?.firstName
                                  : null}{" "}
                                {notification?.studentResponseDto !== null
                                  ? notification?.studentResponseDto?.lastName
                                  : notification?.employerResponseDto !== null
                                  ? notification?.employerResponseDto?.lastName
                                  : null}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 4 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.studentResponseDto !== null
                                  ? notification?.studentResponseDto?.firstName
                                  : notification?.employerResponseDto !== null
                                  ? notification?.employerResponseDto?.firstName
                                  : null}{" "}
                                {notification?.studentResponseDto !== null
                                  ? notification?.studentResponseDto?.lastName
                                  : notification?.employerResponseDto !== null
                                  ? notification?.employerResponseDto?.lastName
                                  : null}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 1 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 2 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {/* {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName} */}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 5 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                          {notification.notificationType == 9 && (
                            <p onClick={()=> checkNotification()}>
                              <b>
                                {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName}
                                {":- "}
                                {notification?.message}
                              </b>
                            </p>
                          )}
                        </div>
                        <span>
                          {notification?.createdOn ? (
                            <ReactTimeAgo
                              date={notification?.createdOn}
                              locale="en-US"
                            />
                          ) : null}
                        </span>
                      </li>
                    ))}
                  {totalCount > 5 && (
                    <li>
                      <Link to="/notifications" className="notification-link">
                        View All
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </span>
          </div>
          <div className="signin-user">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userData && userData.fullName && userData.fullName}
                <img
                  src={
                    profilePic
                      ? profilePic
                      : companyLogo
                      ? companyLogo
                      : userAvtar
                  }
                  alt="User Profile"
                />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      role === "Employer"
                        ? "/employer/profile"
                        : "/student/profile"
                    }
                  >
                    {" "}
                    <i className="fas fa-user"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={role === "Employer" ? "/posted-jobs" : "/find-work"}
                  >
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      role === "Employer"
                        ? "/employer/edit-profile"
                        : "/student/edit-profile"
                    }
                  >
                    <i className="fas fa-user-cog"></i> Edit Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
