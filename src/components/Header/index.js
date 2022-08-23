import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./../../assets/images/inner-logo.png";
import Notification from "./../../assets/icons/notification-ico.png";
import userAvtar from "./../../assets/images/user-img.jpg";
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
import { Navigate, useParams } from "react-router";
import ReactTimeAgo from "react-time-ago";

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_IMAGE_API_URL}chatHub`)
  .withAutomaticReconnect()
  .build();

const Header = () => {
  const db = getDatabase(app);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);

  const [userData, setUserData] = useState([]);
  const [mobileMenu, setmobileMenu] = useState("");
  const [role, setRole] = useState("Employer");

  const [profilePic, setProfilePic] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0)

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
      setTotalCount(resp.data.totalCount)
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
    console.log("connection", connection);
    if (connection._connectionStarted) {
      try {
        const send = await connection.send(
          "AddConnection",
          authData?.email,
          connection.connection.connectionId
        );
        console.log(send, "send");
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
      console.log(resp.data.data, "jobdetails");
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
    if (authData && authData.studentDetails) {
      setProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData.studentDetails.pictureUrl}`
      );
    } else if (authData && authData.comapanyDetail) {
      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData.comapanyDetail.logoPath}`
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
      setRole(authData?.userRoles[0]);
    }
  }, [authData]);

  const handleLogout = () => {
    localStorage.removeItem("jobPortalUser");
    localStorage.removeItem("jobPortalUserToken");
  };
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
                  {/* <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                      }
                      to="/roles"
                    >
                      Roles
                    </NavLink>
                  </li> */}
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
                  <span className="notifi-badge">
                    {" "}
                    {totalCount}{" "}
                  </span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {notifications &&
                    notifications.length > 0 &&
                    notifications.map((notification, i) =>
                      notification.employerResponseDto !== null ? (
                        <li key={i}>
                          <div className="notification-heading">
                            <p>
                              {/* ({i + 1}){" "} */}
                              {/* <b>
                                {notification?.employerResponseDto?.companyName}
                              </b>
                              {", "}
                              is looking for {" - "} */}
                              <b>
                                {notification?.notificationJobResponse?.title}{" "}
                                {/* (designation) */}
                              </b>{" "}
                              {/* having{" "}
                              {
                                notification?.notificationJobResponse
                                  ?.experience
                              }{" "}
                              Years of minimum experience.
                              <br />
                              <b>Working:- </b>{" "}
                              {
                                notification?.notificationJobResponse
                                  ?.hoursPerDay
                              }{" "}
                              hours/day &{" "}
                              {
                                notification?.notificationJobResponse
                                  ?.daysPerWeek
                              }{" "}
                              days/week.
                              <br />
                              <b>Job-Location:-</b>{" "}
                              {notification?.notificationJobResponse?.location}.
                              <br />
                              <b>Salary:-</b> upto{" "}
                              {notification?.notificationJobResponse?.salary}
                              /month.
                              <br />
                              <b>Skills Required:-</b>{" "}
                              {notification?.notificationJobResponse?.skills}{" "} */}
                            </p>
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
                      ) : (
                        <li key={i}>
                          <div className="notification-heading">
                            <p>
                              ({i + 1}){" "}
                              <b>
                                {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName}
                              </b>
                              <br />
                              
                              has applied for designation{" "}
                              <b>
                                {
                                  notification?.studentResponseDto
                                    ?.designationResponse?.qualificationName
                                }
                              </b>
                              <br />
                              <b>Qualification:- </b>
                              {
                                notification?.studentResponseDto
                                  ?.qualificationResponse?.qualificationName
                              }
                              {
                                notification?.studentResponseDto
                                  ?.qualificationName
                              }
                              <br />
                              
                              <b>Working:- </b>{" "}
                              {
                                notification?.studentResponseDto
                                  ?.workHoursPerDay
                              }{" "}
                              hours/day &{" "}
                              {
                                notification?.studentResponseDto
                                  ?.workDaysPerWeek
                              }{" "}
                              days/week. <br />
                              <b>working-Type :-</b>{" "}
                              {notification?.studentResponseDto?.workingType ==
                              1
                                ? "Onsite"
                                : "Offsite"}
                              <br />
                              <b>Experience:- </b>
                              {
                                notification?.studentResponseDto
                                  ?.experienceInYears
                              }{" "}
                              {notification?.studentResponseDto
                                ?.experienceInYears
                                ? "Year"
                                : null}{" "}
                              {notification?.studentResponseDto
                                ?.experienceInMonths
                                ? "&"
                                : null}{" "}
                              {
                                notification?.studentResponseDto
                                  ?.experienceInMonths
                              }{" "}
                              {notification?.studentResponseDto
                                ?.experienceInMonths
                                ? "Month"
                                : null}
                              <br />
                              <b>Expected Salary:- </b>
                              {
                                notification?.studentResponseDto?.expectedSalary
                              }
                              {notification?.studentResponseDto?.expectedSalary 
                                ? "/Month"
                                : null}
                            </p>
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
                      )
                    )}
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
                  src={profilePic ? profilePic : companyLogo}
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
                {role === "Employer" ? null : (
                  <li>
                    <Link className="dropdown-item" to="/student/edit-profile">
                      <i className="fas fa-user-cog"></i> Edit Profile
                    </Link>
                  </li>
                )}
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
