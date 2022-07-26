import Layout from "../../../components/Layout";
import ConnectIcon from "./../../../assets/icons/connect.png";
import EditIcon from "./../../../assets/icons/editicon.png";
import ClockIcon from "./../../../assets/icons/clock-ico.png";
import CompanyProfile from "./../../../assets/images/company-logo.png";
import CompanyInfoModal from "../../../components/modals/companyInfoModal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as employerServices from "../../../services/employerServices";
import * as jobServices from "../../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../../../types/auth";
import { Loader } from "../../../components/Loader/Loader";
import toast from "toastr";
import Pagination from "react-js-pagination";

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [employerData, setEmployerData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [id, setId] = useState("");

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeJobs, setActiveJobs] = useState([]);
  const [archiveJobs, setArchiveJobs] = useState([]);

  const authData = useSelector((state) => state.auth.user);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getArchiveJobs(id, pageNumber);
    getActiveJobs(id, pageNumber);
  };

  useEffect(async () => {
    if (authData) {
      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData.comapanyDetail.logoPath}`
      );
      setId(authData.id);
      getEmployerDetails(authData.id);
      getArchiveJobs(authData.id, activePage);
      getActiveJobs(authData.id, activePage);
    }
  }, [authData]);

  const getEmployerDetails = async (id = authData.id) => {
    const resp = await employerServices.getEmployerDetails(id);

    if (resp.status === 200) {
      setLoading(false);
      const response = resp.data.data;
      setEmployerData(response);

      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.comapanyDetail.logoPath}`
      );
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getActiveJobs = async (id, activePage = activePage) => {
    let data = {
      serachItem: "",
      // userId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    if (data) {
      const resp = await jobServices.getActiveJobByEmployer(data);
      console.log(resp)
      let response = resp.data.data;
      if (resp.status === 200) {
        setLoading(false);
        setTotalRecords(resp.data.totalCount);
        setActiveJobs(response);
      }
    }
  };

  const getArchiveJobs = async (id, activePage = activePage) => {
    let data = {
      serachItem: "",
      // userId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    console.log(data);
    if (data) {
      const resp = await jobServices.getArchiveJobByEmployer(data);
      let response = resp.data.data;
      console.log(response);
      if (resp.status === 200) {
        setLoading(false);
        // setTotalRecords(resp.data.totalCount);
        setArchiveJobs(response);
      }
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
                        <img src={companyLogo} alt="Company profile" />
                      </span>
                    </div>
                    <h3>
                      {authData?.comapanyDetail?.companyName &&
                        authData.comapanyDetail.companyName}
                    </h3>
                    <div>
                      {authData?.comapanyDetail?.address &&
                        authData.comapanyDetail.address}
                      {", "}
                      {authData?.comapanyDetail?.cityName &&
                        authData.comapanyDetail.cityName}{" "}
                      <p>
                        {authData?.comapanyDetail?.stateResponse?.stateName &&
                          authData.comapanyDetail.stateResponse.stateName}
                      </p>
                    </div>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {authData?.comapanyDetail?.availableConnects &&
                          authData.comapanyDetail.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Recruiting Manager{" "}
                        <span className="result">
                          {authData?.comapanyDetail?.recruitingManagerName &&
                            authData.comapanyDetail.recruitingManagerName}
                        </span>
                      </li>
                      <li>
                        Contact Details{" "}
                        <span className="result">
                          {authData?.comapanyDetail?.companyEmail &&
                            authData.comapanyDetail.companyEmail}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    {/* <p className="mailto:michael-taylor028@gmail.com">info@eminencetechnology.com</p> */}
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
                  <Loader />
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
                              <span className="result">
                                {authData?.comapanyDetail?.companyEmail}
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
                              <span className="plabel">Recruiting Manager</span>
                              <span className="result">
                                {
                                  authData?.comapanyDetail
                                    ?.recruitingManagerName
                                }
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Contact Number</span>{" "}
                              <span className="result">
                                {authData?.comapanyDetail?.companyPhone}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Company Address</span>{" "}
                              <span className="result">
                                {authData?.comapanyDetail?.address} ,{" "}
                                {
                                  authData?.comapanyDetail?.stateResponse
                                    ?.stateName
                                }{" "}
                                ,{" "}
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
                                {activeJobs?.length > 0 &&
                                  activeJobs.map((active, i) => (
                                    <div className="project-dbox" key={i}>
                                      <h2 className="prname">
                                        {/* Fullstack project assessment &amp; advice */}
                                        {active.title}
                                      </h2>
                                      <div className="prd-buget-column">
                                        <div className="prdate-budgetprice">
                                          <span className="prdate">
                                            {/* July 05, 2022 - Aug 15, 2022 */}
                                            {active?.skills
                                              ?.split(",")
                                              .map((sk, i) => (
                                                <Link to="#" key={i}>
                                                  {sk}
                                                  {" ,"}
                                                </Link>
                                              ))}
                                          </span>
                                          {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <Pagination
                                activePage={activePage}
                                itemsCountPerPage={pageSize}
                                totalItemsCount={totalRecords}
                                pageRangeDisplayed={totalRecords / pageSize + 1}
                                onChange={handlePageChange}
                              />
                            </div>

                            <div
                              className="tab-pane fade"
                              id="nav-inprogress"
                              role="tabpanel"
                              aria-labelledby="nav-inprogress-tab"
                            >
                              <div className="project-detail-list">
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-pagination">
                                  <ul className="pagination">
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        Prev
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        1
                                      </Link>
                                    </li>
                                    <li className="page-item active">
                                      <Link className="page-link" to="/">
                                        2
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        3
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        4
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        5
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        Next
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-applied"
                              role="tabpanel"
                              aria-labelledby="nav-applied-tab"
                            >
                              <div className="project-detail-list">
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-dbox">
                                  <h2 className="prname">
                                    Fullstack project assessment &amp; advice
                                  </h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      <span className="prdate">
                                        July 05, 2022 - Aug 15, 2022
                                      </span>
                                      {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="project-pagination">
                                  <ul className="pagination">
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        Prev
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        1
                                      </Link>
                                    </li>
                                    <li className="page-item active">
                                      <Link className="page-link" to="/">
                                        2
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        3
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        4
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        5
                                      </Link>
                                    </li>
                                    <li className="page-item">
                                      <Link className="page-link" to="/">
                                        Next
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
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
