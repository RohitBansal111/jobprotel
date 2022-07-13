import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import CompanyProfile from "./../../../assets/images/company-logo.png";
import ConnectIcon from "./../../../assets/icons/connect.png";
// import Filtericon from "./../../../assets/icons/filter-ico.png";
import PostedJobCard from "../../../components/PostedJobCard";
import PostedJobModal from "../../../components/modals/postedJobModal";
import { useState, useEffect } from "react";
import * as employerServices from "../../../services/employerServices";
import * as jobServices from "../../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";

const PostedJob = () => {
  const [employerData, setEmployerData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [id, setId] = useState("");
  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(20);

  const authData = useSelector((state) => state.auth.user);

  useEffect(async () => {
    setId(authData.id);
    console.log(authData, "authData");
    getEmployerDetails(authData.id);
    getJobList(authData.id, activePage);
  }, [authData]);

  const getEmployerDetails = async (id = authData.id) => {
    const resp = await employerServices.getEmployerDetails(id);
    console.log(resp, "resp");

    if (resp.status == 200) {
      const response = resp.data.data.result;
      console.log(response, "resp");
      setEmployerData(response);

      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.logoPath}`
      );
    }
  };
  const getJobList = async (
    id = authData.id,
    activePage = activePage,
    search = ""
  ) => {
    let data = {
      serachItem: search,
      employerId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    const response = await jobServices.getJobList(data);
    if (response.status == 200) {
      console.log(response, "resp");
      setJobList(response.data.data);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    getJobList(authData.id, pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getJobList(authData.id, activePage, search);
  };

  return (
    <Layout companyLogo={companyLogo}>
      <div className="inner-page-wrapper">
        {/* <section className="complete-kyc">
          <div className="container">
              <div className="kyc-update">
                    <p><i className="fa fa-info-circle" aria-hidden="true"></i> KYC is pending, please click on button and complete your KYC </p>
                    <button type="button" className="btn submit-kyc" data-bs-toggle="modal" data-bs-target="#kycpopup">Complete KYC</button>
                    <CompleteKycModal />
              </div>
          </div>
        </section> */}
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit">
                {/* <Link to="#" className="btn edit-btn">Edit</Link> */}
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
                        <img src={companyLogo} alt="Company profile" />
                      </span>
                    </div>
                    <h3>
                      {employerData &&
                        employerData.companyName &&
                        employerData.companyName}
                    </h3>
                    <div>
                      {employerData &&
                        employerData.address &&
                        employerData.address}
                      {", "}
                      {employerData && employerData.cityName}{" "}
                      <p>
                        {employerData &&
                          employerData.stateResponse &&
                          employerData.stateResponse.stateName &&
                          employerData.stateResponse.stateName}
                      </p>
                    </div>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {employerData &&
                          employerData.availableConnects &&
                          employerData.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Recruiting Manager{" "}
                        <span className="result">
                          {employerData &&
                            employerData.recruitingManagerName &&
                            employerData.recruitingManagerName}
                        </span>
                      </li>
                      <li>
                        Contact Details{" "}
                        <span className="result">
                          {employerData &&
                            employerData.companyEmail &&
                            employerData.companyEmail}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#postedJob"
                >
                  Post New Job
                </button>
                <PostedJobModal id={id} />
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <ul className="profile-jobs">
                      <li>
                        <Link to="#">
                          <span className="update-name">
                            Posted Job: &nbsp;
                          </span>
                          2
                        </Link>
                      </li>
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
                  {/* <div className="feed-filter">
                    <button type="button" className="btn filter-btn">
                      <img src={Filtericon} alt="Filter icon" />
                    </button>
                  </div> */}
                </div>
                <div className="search-feeds-section">
                  <div className="feed-title">
                    <h2>Top results you might like</h2>
                    <p>Showing 1-4 of 4 results</p>
                  </div>
                  <div className="default-feeds-search">
                    {jobList &&
                      jobList.length > 0 &&
                      jobList.map((jobs, index) => (
                        <PostedJobCard jobs={jobs} key={index} />
                      ))}
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

export default PostedJob;
