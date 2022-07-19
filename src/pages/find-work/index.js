import { Link } from "react-router-dom";
import PostedJobCard from "../../components/PostedJobCard";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/profile-img.jpg";
import ConnectIcon from "./../../assets/icons/connect.png";
import Filtericon from "./../../assets/icons/filter-ico.png";
import CompleteKycModal from "../../components/Common/CompleteKycModal";
import { useState, useEffect } from "react";
import * as studentServices from "../../services/studentServices";
import * as jobServices from "../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";

const FindWork = () => {
  const [role, setRole] = useState("EMPLOYER");
  const [showFilter, setshowFilter] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [studentProfilePic, setStudentProfilePic] = useState("");
  const [id, setId] = useState("");
  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState("")
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalRecords, setTotalRecords] = useState(20)
  const [loading, setLoading] = useState(true);
  
  const authData = useSelector((state)=> state.auth.user);

  useEffect(async () => {
    if(authData)
    {
    setId(authData.id);
    console.log(authData,"authData")
    getStudentDetails(authData.id)
    getJobList(activePage)
    setRole(authData.userRoles[0]);
    }
  }, [authData]);

  const getStudentDetails = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      const response = resp.data.data.result;
      setStudentData(response);
      setStudentProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.pictureUrl}`
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
      console.log(response);
      setLoading(false);
      setJobList(response.data.data);
    }else if(response.status == 400)
    {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setLoading(true);
    setActivePage(pageNumber)
    getJobList(pageNumber)
  }
  const handleSearch=(e)=>{
    e.preventDefault()
    setLoading(true);
    getJobList(activePage,search)
  }

  const handleFilter = () => setshowFilter(!showFilter);
  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="complete-kyc">
          <div className="container">
            <div className="kyc-update">
              <p>
                <i className="fa fa-info-circle" aria-hidden="true"></i> KYC is
                pending, please click on button and complete your KYC{" "}
              </p>
              <button
                type="button"
                className="btn submit-kyc"
                data-bs-toggle="modal"
                data-bs-target="#kycpopup"
              >
                Complete KYC
              </button>
              <CompleteKycModal />
            </div>
          </div>
        </section>
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              {/* <div className="banner-edit">
                <Link to="#" className="btn edit-btn">
                  Edit
                </Link>
              </div> */}
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
                        <img src={studentProfilePic} alt="user profile" />
                      </span>
                    </div>
                    <h3>
                      {studentData &&
                        studentData.firstName &&
                        studentData.firstName}{" "}
                      {studentData &&
                        studentData.lastName &&
                        studentData.lastName}{" "}
                    </h3>
                    <p>
                      {studentData &&
                        studentData.address &&
                        studentData.address}
                      {", "}
                      {studentData &&
                        studentData.addressLine1 &&
                        studentData.addressLine1}
                      {", "}
                      {studentData &&
                        studentData.addressLine2 !== "undefined" &&
                        studentData.addressLine2}
                    </p>
                    <p>
                      {studentData &&
                        studentData.cityName &&
                        studentData.cityName}
                    </p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {studentData &&
                          studentData.availableConnects &&
                          studentData.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Hour's per/day{" "}
                        <span className="result">
                          {studentData &&
                            studentData.workHoursPerDay &&
                            studentData.workHoursPerDay}
                        </span>
                      </li>
                      <li>
                        Timing <span className="result">10AM - 2PM</span>
                      </li>
                      <li>
                        Skills{" "}
                        {/* <span className="result">React-Redux, Flutter</span> */}
                        <span className="result">
                          {studentData &&
                            studentData.skills &&
                            studentData.skills}
                        </span>
                      </li>
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData &&
                            studentData.experienceInYears &&
                            studentData.experienceInYears}
                          Year{", "}
                          {studentData &&
                            studentData.experienceInMonths &&
                            studentData.experienceInMonths}{" "}
                          Month
                        </span>
                      </li>
                      <li>
                        College / University{" "}
                        <span className="result">
                          {studentData &&
                            studentData.collegeResponse &&
                            studentData.collegeResponse.collegeName &&
                            studentData.collegeResponse.collegeName}
                        </span>
                      </li>
                      <li>
                        Education{" "}
                        <span className="result">
                          {studentData &&
                            studentData.qualificationResponse &&
                            studentData.qualificationResponse
                              .qualificationName &&
                            studentData.qualificationResponse.qualificationName}
                        </span>
                      </li>
                      <li>
                        Hours / day{" "}
                        <span className="result">
                          {studentData &&
                            studentData.workHoursPerDay &&
                            studentData.workHoursPerDay}
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
                            Job Applied
                            &nbsp;
                          </span>
                          2
                        </Link>
                      </li>
                      {/* <li><Link to="#"><span className="update-name">In Progress</span>1</Link></li>
                      <li><Link to="#"><span className="update-name">Completed Jobs</span>170</Link></li> */}
                    </ul>
                  </div>
                  <div className="profile-strength">
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
                  </div>
                </div>
                <div className="feeds-search-bar">
                  <div className="search-bar">
                    <form className="form-inline" onSubmit={handleSearch}>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Find posted Jobs"
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
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="search-feeds-section">
                  <div className="feed-title">
                    <h2>Top results you might like</h2>
                    <p>Showing {activePage ==1?activePage:(1+(activePage-1)*pageSize)}-
                      {jobList && jobList.length?(activePage-1)*pageSize+jobList.length:0} of {totalRecords} results</p>
                  </div>
                  <div className="default-feeds-search">
                  {loading ? (
                      <Loader />
                    ) : jobList && jobList.length === 0 ? (
                      <h4>No jobs found</h4>
                    ) : (
                      jobList &&
                      jobList.length > 0 &&
                      jobList.map((jobs, index) => (
                        <PostedJobCard jobs={jobs} key={index} type="find"/>
                      ))
                    )}
                  </div>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={totalRecords / pageSize}
                    onChange={handlePageChange}
                  />
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
