import Layout from "../../../components/Layout";
import ConnectIcon from "./../../../assets/icons/connect.png";
import EditIcon from "./../../../assets/icons/editicon.png";
import CompanyInfoModal from "../../../components/modals/companyInfoModal";
import UserAvtar from "./../../../assets/images/demo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as employerServices from "../../../services/employerServices";
import * as jobServices from "../../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../../types/auth";
import { Loader } from "../../../components/Loader/Loader";
import toast from "toastr";
import Pagination from "react-js-pagination";
import BuyConnectsModal from "../../../components/modals/buyConnectsModal";
import PostedJobCard from "../../../components/PostedJobCard";
import DefaultProfile from "./../../../assets/images/demo.png";

const EmployerProfile = () => {
  const [loading, setLoading] = useState(true);

  const [employerData, setEmployerData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [id, setId] = useState("");

  const [activePage, setActivePage] = useState(1);
  const [activePageArchive, setActivePageArchive] = useState(1);

  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRecordsArchive, setTotalRecordsArchive] = useState(0);

  const [activeJobs, setActiveJobs] = useState([]);
  const [archiveJobs, setArchiveJobs] = useState([]);

  const [showBuyConnectModal, setShowBuyConnectModal] = useState(false);
  const handleBuyConnect = () => setShowBuyConnectModal(true);
  const [connects, setConnects] = useState();

  const authData = useSelector((state) => state.auth.user);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getActiveJobs(id, pageNumber);
  };

  const handlePageChangeArchive = (pageNumber) => {
    setActivePageArchive(pageNumber);
    setLoading(true);
    getArchiveJobs(id, pageNumber);
  };

  useEffect(async () => {
    if (authData) {
      console.log(authData, ":::::");
      if (
        authData.comapanyDetail !== null &&
        authData.comapanyDetail.logoPath !== null
      ) {
        setCompanyLogo(
          `${process.env.REACT_APP_IMAGE_API_URL}${authData?.comapanyDetail?.logoPath}`
        );
      }
      if (
        authData?.comapanyDetail !== null &&
        authData?.comapanyDetail?.availableConnects
      ) {
        setConnects(authData?.comapanyDetail?.availableConnects);
      }else{
        setConnects(0);
      }

      setId(authData?.id);
      getEmployerDetails(authData?.id);
      getArchiveJobs(authData?.id, activePage);
      getActiveJobs(authData?.id, activePage);
    }
  }, [authData]);

  const getEmployerDetails = async (id = authData.id) => {
    const resp = await employerServices.getEmployerDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      setEmployerData(response);
      if (
        response.comapanyDetail !== null &&
        response.comapanyDetail.logoPath !== null
      ) {
        setCompanyLogo(
          `${process.env.REACT_APP_IMAGE_API_URL}${response?.comapanyDetail?.logoPath}`
        );
      }
    } else if (resp.status !== 200) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getActiveJobs = async (id, activePage = activePage) => {
    let data = {
      serachItem: "",
      pageNumber: activePage,
      pageSize: pageSize,
    };
    if (data) {
      const resp = await jobServices.getActiveJobByEmployer(data);
      let response = resp.data.data;
      if (resp.status == 200) {
        setLoading(false);
        setTotalRecords(resp.data.totalCount);
        setActiveJobs(response);
      } else if (resp.status !== 200) {
        setLoading(false);
      }
    }
  };

  const getArchiveJobs = async (id, activePage = activePage) => {
    let data = {
      serachItem: "",
      pageNumber: activePage,
      pageSize: pageSize,
    };
    if (data) {
      const resp = await jobServices.getArchiveJobByEmployer(data);
      let response = resp.data.data;
      if (resp.status === 200) {
        setLoading(false);
        // setTotalRecordsArchive(resp.data.totalCount);
        setArchiveJobs(response);
      } else if (resp.status !== 200) {
        setLoading(false);
      }
    }
  };
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit">
                <Link to="/employer/edit-profile" className="btn edit-btn">
                  Edit Profile
                </Link>
              </div>
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
                          src={companyLogo ? companyLogo : DefaultProfile}
                          alt="Company profile"
                        />
                        <button type="button" className="update-profile">
                          <i className="fa fa-edit"></i> 
                          <input
                            name="profileImage"
                            id="profileImage"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                          />
                        </button>
                      </span>
                    </div>
                    <h3>{authData?.comapanyDetail?.companyName}</h3>
                    <div>
                      {authData?.comapanyDetail?.address}
                      {authData?.comapanyDetail?.cityName && ", "}
                      {authData?.comapanyDetail?.cityName}{" "}
                      <p>
                        {authData?.comapanyDetail?.stateResponse?.stateName}
                      </p>
                    </div>
                  </div>
                  <div className="profile-connect">
                    {authData?.comapanyDetail && (
                      <>
                        <div className="profile-con">
                          <img src={ConnectIcon} alt="Connect" />
                          <span className="conn-count">
                            {authData?.comapanyDetail?.availableConnects}
                          </span>
                        </div>
                        <h4>Available Connects</h4>
                      </>
                    )}
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Contact Details{" "}
                        <span className="result">{authData?.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleBuyConnect}
                >
                  {" "}
                  Buy Connects{" "}
                </button>
                <BuyConnectsModal
                  showBuyConnectModal={showBuyConnectModal}
                  setShowBuyConnectModal={setShowBuyConnectModal}
                  connects={connects}
                />
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      {employerData?.email}
                    </p>
                  </div>
                  {/* <div className="profile-strength">
                    <div className="profile-strength-inner">
                      <h3>
                        Profile strength:{" "}
                        <span className="profile-completed">60% Completed</span>
                      </h3>
                      <div className="profile-strength-bar">
                        <p
                          className="profile-progress"
                          style={{ width: "60%" }}
                        ></p>
                        <div className="profile-complete-bar">
                          <span
                            className="complete-bar completed"
                            style={{ left: "25%" }}
                          ></span>
                          <span
                            className="complete-bar completed"
                            style={{ left: "50%" }}
                          ></span>
                          <span
                            className="complete-bar"
                            style={{ left: "75%" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                                {authData?.fullName}{" "}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Email ID </span>
                              <span className="result">{authData?.email}</span>
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
                            >
                              <img src={EditIcon} alt="icon" />
                            </button>
                          </div>
                        </div>
                        <div className="profile-info-list">
                          <CompanyInfoModal
                            employerData={employerData}
                            getEmployerDetails={getEmployerDetails}
                          />
                          <ul className="info-list-li">
                            <li>
                              <span className="plabel">Company Name</span>{" "}
                              <span className="result">
                                Eminence Technology
                              </span>
                            </li> 
                            <li>
                              <span className="plabel">Company Contact Number</span>{" "}
                              <span className="result">
                                {authData?.comapanyDetail?.companyPhone}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Company Address</span>{" "}
                              <span className="result">
                                {authData?.comapanyDetail?.address}{" "}
                                {authData?.comapanyDetail?.stateResponse
                                  ?.stateName && ", "}
                                {
                                  authData?.comapanyDetail?.stateResponse
                                    ?.stateName
                                }{" "}
                                {authData?.comapanyDetail?.countryResponse
                                  ?.countryName && ", "}
                                {
                                  authData?.comapanyDetail?.countryResponse
                                    ?.countryName
                                }
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className="profile-information-view">
                      <div className="Project-information-coll">
                        <div className="profile-card-head">
                          <h3>Jobs history</h3>
                        </div>
                        <div className="Project-info-list">
                          <div
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-completed-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-completed"
                              type="button"
                              role="tab"
                              aria-controls="nav-completed"
                              aria-selected="true"
                            >
                              Active Jobs
                            </button>
                            <button
                              className="nav-link"
                              id="nav-inprogress-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-inprogress"
                              type="button"
                              role="tab"
                              aria-controls="nav-inprogress"
                              aria-selected="false"
                            >
                              Archive Jobs
                            </button>
                          </div>
                          <div className="tab-content" id="nav-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="nav-completed"
                              role="tabpanel"
                              aria-labelledby="nav-completed-tab"
                            >
                              <div className="project-detail-list">
                              <div className="project-dbox">
                                {activeJobs?.length > 0
                                  ? activeJobs.map((active, i) => (
                                      <>
                                        <PostedJobCard
                                          jobs={active}
                                          key={i}
                                          type="post"
                                          activePage={activePage}
                                          pageSize={pageSize}
                                        />

                                        {/*                         
                        <div className="project-dbox" key={i}>
                                        {
                                          console.log(active)
                                        }
                                        <h2 className="prname">
                                          {active.title}
                                        </h2>
                                        <ul className="feeds-s-ul">
                                          <li>
                                            <img
                                              src={LocationIcon}
                                              alt="Location"
                                            />
                                            {active?.location}
                                          </li>
                                        </ul>
                                        <div className="prd-buget-column mt-2">
                                          <div className="prdate-budgetprice">
                                            <span className="prdate">
                                              <b>Skills: </b>
                                              {active?.skills
                                                ?.split(",")
                                                .map((sk, i) => (
                                                  <Link to="#" key={i}>
                                                    {sk}
                                                    {" ,"}
                                                  </Link>
                                                ))}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="feeds-budget employer-salary">
                                          <p>Salary Range: </p>
                                          <span className="project-budget">
                                            $ {active?.salary}
                                          </span>
                                        </div>
                                        <div className="feeds-search-detail">
                                          <p> <b>Descriprion: </b>
                                            {active?.description}
                                          </p>
                                          <div className="feeds-tags">
                                            <ul className="feeds-ul">
                                              {tags &&
                                                tags.length > 0 &&
                                                tags.map((tag, index) => (
                                                  <li key={index}>
                                                    <Link to="#">{tag}</Link>
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                        </div>
                                      </div> */}
                                      </>
                                    ))
                                  : "No Active Jobs"}
                                </div>
                                <div className="project-pagination">
                                  {totalRecords > 5 && (
                                    <Pagination
                                      activePage={activePage}
                                      itemsCountPerPage={pageSize}
                                      totalItemsCount={totalRecords}
                                      pageRangeDisplayed={4}
                                      onChange={handlePageChange}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-inprogress"
                              role="tabpanel"
                              aria-labelledby="nav-inprogress-tab"
                            >
                              <div className="project-detail-list">
                                <div className="project-dbox">
                                  {archiveJobs?.length > 0
                                    ? archiveJobs.map((archive, i) => (
                                        <div className="project-dbox" key={i}>
                                          <h2 className="prname mb-2">
                                            {archive.title}
                                          </h2>
                                          <div className="prd-buget-column mt-2">
                                            <div className="prdate-budgetprice">
                                              <span className="prdate">
                                                <b>Skills: </b>
                                                {archive?.skills
                                                  ?.split(",")
                                                  .map((arc, i) => (
                                                    <Link to="#" key={i}>
                                                      {arc}
                                                      {" ,"}
                                                    </Link>
                                                  ))}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    : "No Archive Jobs"}
                                </div>
                                {totalRecordsArchive > 0 && (
                                  <div className="project-pagination">
                                    <Pagination
                                      activePage={activePageArchive}
                                      itemsCountPerPage={pageSize}
                                      totalItemsCount={totalRecordsArchive}
                                      pageRangeDisplayed={4}
                                      onChange={handlePageChangeArchive}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
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

export default EmployerProfile;
