import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";
import UserAvatar from "./../../../assets/images/demo.png";
import * as employerServices from "../../../services/employerServices";
const EmployerDetails = () => {
  const { userId } = useParams();

  const [empDetails, setEmpDetails] = useState([]);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [profilePic, setProflePic] = useState("");
  useEffect(() => {
    if (userId) {
      getEmploymentDetails(userId);
      setId(userId);
    }
  }, [userId]);

  const getEmploymentDetails = async (userId) => {
    let id = userId;
    const resp = await employerServices.getEmployerDetails(id);
    if (resp.status === 200) {
      setLoading(false);

      let response = resp.data.data;
      console.log(response, "::::");
      setEmpDetails(response);
      setProflePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${response?.comapanyDetail?.logoPath}`
      );
    }
  };

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit"></div>
            </div>
          </div>
        </section>

        <section className="job-feeds-wrapper">
          <div className="container">
            <div className="profile-feed-inner">
              <div className="user-profile-left">
                <div className="user-profile-coll">
                  <div className="user-profile-detail">
                    <div
                      className="profile-pic-progress"
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="profile-img">
                        <img
                          src={profilePic ? profilePic : UserAvatar}
                          alt="user profile"
                        />
                      </span>
                    </div>
                    <h3>{empDetails?.fullName} </h3>
                    <p>{empDetails?.comapanyDetail?.address}</p>
                  </div>

                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Contact Details{" "}
                        <span className="result">{empDetails?.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      {empDetails?.email}
                    </p>
                  </div>
                </div>
                {loading ? (
                  <div className="fullpage-loader">
                    {" "}
                    <Loader />{" "}
                  </div>
                ) : (
                  <>
                    <section className="profile-information-view">
                      <div className="profile-information-coll">
                        <div className="profile-card-head">
                          <h3>Personal Information</h3>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
                            <li>
                              <span className="plabel">Name</span>{" "}
                              <span className="result">
                                {empDetails?.fullName}{" "}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Email ID </span>
                              <span className="result">
                                {empDetails?.email}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className="profile-information-view">
                      <div className="profile-information-coll">
                        <div className="profile-card-head">
                          <h3>Company Information</h3>
                          <div className="pr-edit-icon">
                            <button
                              type="button"
                              className="btn-edit"
                              data-bs-toggle="modal"
                              data-bs-target="#companyInfo"
                            ></button>
                          </div>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
                            <li>
                              <span className="plabel">Contact Number</span>{" "}
                              <span className="result">
                                {empDetails?.comapanyDetail?.companyPhone}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Company Address</span>{" "}
                              <span className="result">
                                {empDetails?.comapanyDetail?.address}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmployerDetails;
