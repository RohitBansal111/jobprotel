import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/profile-img.jpg";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import * as notificationServices from "../../services/notificationServices";
import ReactTimeAgo from "react-time-ago";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const UserNotification = () => {
  const params = useParams();
  const authData = useSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async (id) => {
    let data = {
      loggedInUserId: id,
      pageNumber: 1,
      pageSize: 5,
    };

    const resp = await notificationServices.getNotifications(data);
    if (resp.status === 200) {
      let response = resp.data.data;
      // console.log(response, ":::::");
      const res = response?.filter(
        (d) => d.notificationJobResponse.id == params.id
      );
      console.log(res);
      setNotifications(res);
    }
  };

  useEffect(() => {
    if (authData) {
      setLoading(true);
      getNotifications(authData.id);
      setLoading(false);
    }
  }, [authData, params]);
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
          </div>
        </section>
        {loading ? (
          <div className="fullpage-loader py-5">
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <section className="job-feeds-wrapper">
            <div className="container">
              <h4 className="text-white mb-3">Notification</h4>
              <div className="Notification-list text-white default-feeds-search">
                <div className="feeds-search-coll">
                  {notifications?.length > 0 &&
                    notifications.map((notification, i) =>
                      notification.employerResponseDto !== null ? (
                        <div className="feeds-search-head">
                          <div className="feeds-head-left w-100">
                            <div className="feeds-s-name pe-4 w-100">
                              <h2 className="d-flex align-items-center justify-content-between">
                                <Link
                                  to={`/publicEmployer/${notification?.employerResponseDto?.userId}`}
                                >
                                  {notification?.employerResponseDto?.firstName}{" "}
                                  {notification?.employerResponseDto?.lastName}
                                </Link>{" "}
                                <p className="font-weight-400">
                                  {notification?.createdOn ? (
                                    <ReactTimeAgo
                                      date={notification?.createdOn}
                                      locale="en-US"
                                    />
                                  ) : null}
                                </p>
                              </h2>
                              <ul className="feeds-s-ul mb-2">
                                <li>
                                  <img src={LocationIcon} alt="Location" />
                                  {notification?.employerResponseDto?.address}
                                </li>
                              </ul>
                              <p>{notification?.message}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li key={i}>
                          <div className="feeds-s-name pe-4 w-100">
                            <h2 className="d-flex align-items-center justify-content-between">
                              <Link
                                to={`/public/${notification?.studentResponseDto?.userId}`}
                              >
                                {notification?.studentResponseDto?.firstName}{" "}
                                {notification?.studentResponseDto?.lastName}
                              </Link>{" "}
                              <p className="fw-400">
                                {notification?.createdOn ? (
                                  <ReactTimeAgo
                                    date={notification?.createdOn}
                                    locale="en-US"
                                  />
                                ) : null}
                              </p>
                            </h2>
                            <ul className="feeds-s-ul mb-2">
                              <li>
                                <img src={LocationIcon} alt="Location" />
                                {notification?.studentResponseDto?.address}
                              </li>
                            </ul>
                            <p>{notification?.message}</p>
                          </div>
                        </li>
                      )
                    )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default UserNotification;
