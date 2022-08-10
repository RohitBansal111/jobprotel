import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/profile-img.jpg";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import * as notificationServices from "../../services/notificationServices";
import ReactTimeAgo from "react-time-ago";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";

const Notification = () => {
  const authData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getNotifications = async (id, activePage) => {
    let data = {
      loggedInUserId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };

    const resp = await notificationServices.getNotifications(data);
    if (resp.status === 200) {
      setLoading(false);
      setTotalCount(resp.data.totalCount);
      let response = resp.data.data;
      console.log(response, "resp");
      setNotifications(response);
    } else {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getNotifications(authData.id, pageNumber);
  };

  useEffect(() => {
    if (authData) {
      getNotifications(authData.id, activePage);
    }
  }, [authData]);
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
          </div>
        </section>
        {loading ? (
          <div className="button-submit-loader">
            <Loader />
          </div>
        ) : (
          <section className="job-feeds-wrapper">
            <div className="container">
              <h4 className="text-white mb-3">Notification</h4>
              <div className="Notification-list text-white default-feeds-search">
                <div className="feeds-search-coll">
                  <div className="feeds-search-head">
                    <div className="feeds-head-left">
                      {/* <div className="feeds-s-logo">
                      <Link to="/public">
                        <img
                          src={UserAvtar}
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                          }}
                          alt="profile"
                        />{" "}
                      </Link>
                    </div> */}
                      {notifications &&
                        notifications.length > 0 &&
                        notifications.map((notification, i) =>
                          notification.employerResponseDto !== null ? (
                            <div className="feeds-s-name pe-4">
                              <h2>
                                <Link to="/public"> Rahul Singh</Link>{" "}
                              </h2>
                              <ul className="feeds-s-ul mb-2">
                                <li>
                                  <img src={LocationIcon} alt="Location" />
                                  New Delhi
                                </li>
                              </ul>
                              <p>
                                Lorem ipsum is a placeholder text commonly used
                                to demonstrate the visual form of a document or
                                a typeface without relying on meaningful
                                content.
                              </p>
                            </div>
                          ) : (
                            <li key={i}>
                              <div className="feeds-s-name pe-4">
                                <h2>
                                  <Link to="/public">
                                    {
                                      notification?.studentResponseDto
                                        ?.firstName
                                    }{" "}
                                    {notification?.studentResponseDto?.lastName}
                                  </Link>{" "}
                                </h2>
                                <ul className="feeds-s-ul mb-2">
                                  <li>
                                    <img src={LocationIcon} alt="Location" />
                                    {notification?.studentResponseDto?.address}
                                  </li>
                                </ul>
                                <p>
                                  Lorem ipsum is a placeholder text commonly
                                  used to demonstrate the visual form of a
                                  document or a typeface without relying on
                                  meaningful content.
                                </p>
                              </div>
                              <p>
                                {notification?.createdOn ? (
                                  <ReactTimeAgo
                                    date={notification?.createdOn}
                                    locale="en-US"
                                  />
                                ) : null}
                              </p>
                            </li>
                          )
                        )}
                    </div>
                    <div className="review-listing-action">
                      {/* <button type="button" className="btn btn-primary me-2">
                      Accepted
                    </button>
                    <button type="button" className="btn btn-reject">
                      Rejected
                    </button> */}
                    </div>
                  </div>

                  <div>
                    {/* <div className="feeds-search-head">
                  <div className="feeds-head-left">
                    <div className="feeds-s-logo">
                      <Link to="/public">
                        <img
                          src={UserAvtar}
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                          }}
                          alt="profile"
                        />{" "}
                      </Link>
                    </div>
                    <div className="feeds-s-name pe-4">
                      <h2>
                        <Link to="/public"> Rahul Singh</Link>{" "}
                      </h2>
                      <ul className="feeds-s-ul mb-2">
                        <li>
                          <img src={LocationIcon} alt="Location" />
                          New Delhi
                        </li>
                      </ul>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate the visual form of a document or a typeface
                        without relying on meaningful content.
                      </p>
                    </div>
                  </div>
                  <div className="review-listing-action">
                    <button type="button" className="btn btn-primary me-2">
                      Accepted
                    </button>
                    <button type="button" className="btn btn-reject">
                      Rejected
                    </button>
                  </div>
                </div>
                <div className="feeds-search-head">
                  <div className="feeds-head-left">
                    <div className="feeds-s-logo">
                      <Link to="/public">
                        <img
                          src={UserAvtar}
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                          }}
                          alt="profile"
                        />{" "}
                      </Link>
                    </div>
                    <div className="feeds-s-name pe-4">
                      <h2>
                        <Link to="/public"> Rahul Singh</Link>{" "}
                      </h2>
                      <ul className="feeds-s-ul mb-2">
                        <li>
                          <img src={LocationIcon} alt="Location" />
                          New Delhi
                        </li>
                      </ul>
                      <p>
                        Lorem ipsum is a placeholder text commonly used to
                        demonstrate the visual form of a document or a typeface
                        without relying on meaningful content.
                      </p>
                    </div>
                  </div>
                  <div className="review-listing-action">
                    <button type="button" className="btn btn-primary me-2">
                      Accepted
                    </button>
                    <button type="button" className="btn btn-reject">
                      Rejected
                    </button>
                  </div>
                </div> */}
                  </div>
                  <div>
                    {totalCount > 10 && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={totalCount}
                        pageRangeDisplayed={4}
                        onChange={handlePageChange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Notification;
