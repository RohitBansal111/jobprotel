import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./../../assets/images/inner-logo.png";
import Notification from "./../../assets/icons/notification-ico.png";
import userAvtar from "./../../assets/images/user-img.jpg";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../types/auth";
import CompanyProfile from "./../../assets/images/company-logo.png";

const Header = () => {
  const authData = useSelector((state) => state.auth.user);

  const [profilePic, setProfilePic] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

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
    console.log(authData,"authData")
  }, [authData]);

  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const [mobileMenu, setmobileMenu] = useState("");
  const [role, setRole] = useState("Employer");

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
                      to="/employer-inbox"
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
                  <span className="notifi-badge"> 4 </span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <div className="notification-heading">
                      <p>
                        Your proposal to the job "I need a Logo Designer" was
                        declined.
                      </p>
                    </div>
                    <span>5 min. ago</span>
                  </li>
                  <li>
                    <div className="notification-heading">
                      <p>
                        Your proposal to the job "I need a Logo Designer" was
                        declined.
                      </p>
                    </div>
                    <span>5 min. ago</span>
                  </li>
                  <li>
                    <div className="notification-heading">
                      <p>
                        Your proposal to the job "I need a Logo Designer" was
                        declined.
                      </p>
                    </div>
                    <span>5 min. ago</span>
                  </li>
                  <li>
                    <div className="notification-heading">
                      <p>
                        Your proposal to the job "I need a Logo Designer" was
                        declined.
                      </p>
                    </div>
                    <span>5 min. ago</span>
                  </li>
                  <li>
                    <Link to="/notifications" className="notification-link">
                      View All
                    </Link>
                  </li>
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
