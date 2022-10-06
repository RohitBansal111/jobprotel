import { Link } from "react-router-dom";
import PostedJobCard from "../../components/PostedJobCard";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/demo.png";
import ConnectIcon from "./../../assets/icons/connect.png";
import Filtericon from "./../../assets/icons/filter-ico.png";
import CompleteKycModal from "../../components/Common/CompleteKycModal";
import { useState, useEffect } from "react";
import * as studentServices from "../../services/studentServices";
import * as jobServices from "../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";
import toast from "toastr";

const FindWork = () => {
  const [role, setRole] = useState("EMPLOYER");
  const [showFilter, setshowFilter] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentProfilePic, setStudentProfilePic] = useState("");
  const [id, setId] = useState("");
  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const authData = useSelector((state) => state.auth.user);

  const [kycStatus, setKycStatus] = useState(true);
  useEffect(async () => {
    if (authData) {
      setId(authData.id);
      getStudentDetails(authData.id);
      getJobList(activePage);
      setRole(authData?.userRoles[0]);
    }
  }, [authData]);

  useEffect(() => {
    setTimeout(() => {
      setKycStatus(false);
    }, 1000);
  }, []);

  const getStudentDetails = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      const response = resp.data.data;
      setStudentData(response);
      setStudentProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.pictureUrl}`
      );
    }
  };

  const getJobList = async (activePage = activePage, search = "") => {
    let data = {
      serachItem: search,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    const response = await jobServices.getJobListByStudent(data);
    if (response.status == 200) {
      setLoading(false);
      // console.log(response.data.data);
      setJobList(response.data.data);
      setTotalRecords(response.data.totalCount);
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setActivePage(pageNumber);
    getJobList(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    getJobList(activePage, search);
  };

  const handleFilter = () => setshowFilter(!showFilter);
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="complete-kyc">
          <div className="container">
            {authData?.studentDetails?.kycStatus === "false" && (
              <div className="kyc-update">
                <p>
                  <i className="fa fa-info-circle" aria-hidden="true"></i> KYC
                  is pending, please click on button and complete your KYC{" "}
                </p>
                {authData?.studentDetails?.isProfileCompleted ? (
                  <>
                    <button
                      type="button"
                      className="btn submit-kyc"
                      data-bs-toggle="modal"
                      data-bs-target="#kycpopup"
                    >
                      Complete KYC
                    </button>
                    <CompleteKycModal />
                  </>
                ) : (
                  <button type="button" className="btn submit-kyc" onClick={()=>{
                    toast.error("Profile is not Completed");
                  }}>
                    Complete KYC
                  </button>
                )}
              </div>
            )}
            {authData?.studentDetails?.kycStatus === "true" && kycStatus ? (
              <div className="kyc-update">
                <h2>KYC Completed</h2>
              </div>
            ) : null}
          </div>
        </section>
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
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
                          src={
                            studentProfilePic ? studentProfilePic : UserAvtar
                          }
                          alt="user profile"
                        />
                      </span>
                    </div>
                    <h3>{studentData?.fullName} </h3>
                    <p>
                      {studentData?.studentDetails?.address}
                      {studentData?.studentDetails?.addressLine1 && ", "}
                      {studentData?.studentDetails?.addressLine1}
                      {studentData?.studentDetails?.addressLine2 && ", "}
                      {studentData?.studentDetails?.addressLine2 !=
                        "undefined" &&
                      studentData?.studentDetails?.addressLine2 != "null"
                        ? studentData?.studentDetails?.addressLine2
                        : ""}
                    </p>
                    <p>{studentData?.studentDetails?.cityName}</p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {authData?.studentDetails?.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Skills{" "}
                        <span className="result">
                          {studentData?.studentDetails?.skills}
                        </span>
                      </li>
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData?.studentDetails?.experienceInYears}
                          {studentData?.studentDetails?.experienceInYears &&
                            " Year"}
                          {studentData?.studentDetails?.experienceInMonths &&
                            ", "}
                          {studentData?.studentDetails?.experienceInMonths}
                          {studentData?.studentDetails?.experienceInMonths &&
                            " Month"}
                        </span>
                      </li>
                      <li>
                        College / University{" "}
                        <span className="result">
                          {
                            studentData?.studentDetails?.collegeResponse
                              ?.collegeName
                          }
                        </span>
                      </li>
                      <li>
                        Education{" "}
                        <span className="result">
                          {
                            studentData?.studentDetails?.qualificationResponse
                              ?.qualificationName
                          }
                        </span>
                      </li>
                      <li>
                        Hour / week{" "}
                        <span className="result">
                          {studentData?.studentDetails?.workHoursPerWeek}
                          {studentData?.studentDetails?.workHoursPerWeek && " hour"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <ul className="profile-jobs">
                      <li>
                        <Link to="#">
                          <span className="update-name">
                            Job Applied &nbsp;
                          </span>
                          {authData?.studentDetails?.appliedJobCount}
                        </Link>
                      </li>
                    </ul>
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
                <div className="feeds-search-bar">
                  <div className="search-bar">
                    <form className="form-inline" onSubmit={handleSearch}>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Find Jobs"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button className="btn btn-outline-success" type="submit">
                        Search
                      </button>
                    </form>
                  </div>
                  <div className="feed-filter">
                    <button
                      onClick={handleFilter}
                      type="button"
                      className="btn filter-btn"
                    >
                      <img src={Filtericon} alt="Filter icon" />
                    </button>
                  </div>
                </div>
                {showFilter && (
                  <div className="filter-container-wrapper">
                    <div className="form-field-group">
                      <div className="form-field">
                        <label>Hour's/Day</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter hour"
                        />
                      </div>
                      <div className="form-field">
                        <label>Skills</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter skills"
                        />
                      </div>
                      <div className="form-field">
                        <label>Experience</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter experience"
                        />
                      </div>
                      <div className="form-field">
                        <button type="button" className="btn btn-primary">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="search-feeds-section">
                  <div className="feed-title">
                    <h2>Top results you might like</h2>
                    {jobList?.length > 0 && (
                      <p>
                        Showing{" "}
                        {activePage == 1
                          ? activePage
                          : 1 + (activePage - 1) * pageSize}
                        -
                        {jobList?.length
                          ? (activePage - 1) * pageSize + jobList.length
                          : 0}{" "}
                        of {totalRecords} results
                      </p>
                    )}
                  </div>
                  <div
                      className="nav nav-tabs"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-all-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-all"
                        type="button"
                        role="tab"
                        aria-controls="nav-all"
                        aria-selected="true"
                      >
                        All
                      </button>
                      <button
                        className="nav-link"
                        id="nav-recommended-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-recommended"
                        type="button"
                        role="tab"
                        aria-controls="nav-recommended"
                        aria-selected="false"
                      >
                        Recommended
                      </button>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-all"
                        role="tabpanel"
                        aria-labelledby="nav-all-tab"
                      >
                        <div className="default-feeds-search">
                          {loading ? (
                            <div className="search-data-loader mb-4">
                              <Loader />
                            </div>
                          ) : jobList?.length === 0 ? (
                            <h4>No jobs found</h4>
                          ) : (
                            jobList?.length > 0 &&
                            jobList.map((jobs, index) => (
                              <PostedJobCard
                                jobs={jobs}
                                key={index}
                                getJobList={getJobList}
                                activePage={activePage}
                                type="find"
                              />
                            ))
                          )}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-recommended"
                        role="tabpanel"
                        aria-labelledby="nav-recommended-tab"
                      >
                        <div className="default-feeds-search">
                          {loading ? (
                            <div className="search-data-loader mb-4">
                              <Loader />
                            </div>
                          ) : jobList?.length === 0 ? (
                            <h4>No jobs found</h4>
                          ) : (
                            jobList?.length > 0 &&
                            jobList.map((jobs, index) => (
                              <PostedJobCard
                                jobs={jobs}
                                key={index}
                                getJobList={getJobList}
                                activePage={activePage}
                                type="find"
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
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
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FindWork;
