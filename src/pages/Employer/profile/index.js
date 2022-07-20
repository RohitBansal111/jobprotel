import Layout from "../../../components/Layout"
import ConnectIcon from './../../../assets/icons/connect.png'
import EditIcon from './../../../assets/icons/editicon.png'
import ClockIcon from './../../../assets/icons/clock-ico.png'
import CompanyProfile from './../../../assets/images/company-logo.png'
import CompanyInfoModal from "../../../components/modals/companyInfoModal"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import * as employerServices from "../../../services/employerServices";
import * as jobServices from "../../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";


const EmployerProfile = () => {

  const [employerData, setEmployerData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [archiveJobs, setArchiveJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [archivePageNumber, setArchivePageNumber] = useState(1);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [archiveTotal, setArchiveTotal] = useState(1);
  const [activeTotal, setActiveTotal] = useState(1);
  const [id, setId] = useState("");
  const authData = useSelector((state) => state.auth.user);
  useEffect(async () => {
    console.log(authData, "authData")
    if (authData) {
      setId(authData.id);
      getEmployerDetails(authData.id);
      getArchiveJobByEmployer('08da5f11-807a-49f6-8674-98f009c76fe3')
      getActiveJobByEmployer('08da5f11-807a-49f6-8674-98f009c76fe3')
    }

  }, [authData]);

  const getEmployerDetails = async (id = authData.id) => {
    const resp = await employerServices.getEmployerDetails(id);

    if (resp.status == 200) {
      const response = resp.data.data.result;
      setEmployerData(response);

      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.logoPath}`
      );
    }
  };

  const getArchiveJobByEmployer = async (id = authData.id, pageNumber = archivePageNumber) => {
    const payload = {
      serachItem: "",
      employerId: id,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    const resp = await jobServices.getArchiveJobByEmployer(payload)
    console.log(resp)
    if (resp.status == 200) {
      const response = resp.data.data;
      setArchiveJobs(response)
      setArchiveTotal(resp.data.totalCount)
    }
  }
  const getActiveJobByEmployer = async (id = authData.id, pageNumber = activePageNumber) => {
    const payload = {
      serachItem: "",
      employerId: id,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
    const resp = await jobServices.getActiveJobByEmployer(payload)
    console.log(resp)
    if (resp.status == 200) {
      const response = resp.data.data;
      setActiveJobs(response)
      setActiveTotal(resp.data.totalCount)
    }
  }

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setArchivePageNumber(pageNumber);
    getArchiveJobByEmployer(authData.id, pageNumber);
  };
  const handleActiveJobPageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePageNumber(pageNumber);
    getActiveJobByEmployer(authData.id, pageNumber);
  };

  console.log(employerData, "employerData")

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
              <div className="banner-edit">

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
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    {/* <p className="mailto:michael-taylor028@gmail.com">info@eminencetechnology.com</p> */}
                  </div>
                  <div className="profile-strength">
                    <div className="profile-strength-inner">
                      <h3>Profile strength: <span className="profile-completed">60% Completed</span></h3>
                      <div className="profile-strength-bar">
                        <p className="profile-progress" style={{ 'width': '60%' }}></p>
                        <div className="profile-complete-bar">
                          <span className="complete-bar completed" style={{ 'left': '25%' }}></span>
                          <span className="complete-bar completed" style={{ 'left': '50%' }}></span>
                          <span className="complete-bar" style={{ 'left': '75%' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Personal Information</h3>
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li">
                        <li><span className="plabel">Name</span> <span className="result">{employerData && employerData.firstName && employerData.firstName} {employerData && employerData.lastName && employerData.lastName}</span></li>
                        <li><span className="plabel">Email ID </span><span className="result">{employerData && employerData.companyEmail && employerData.companyEmail}</span></li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Company Information</h3>
                      <div className="pr-edit-icon">
                        <button type="button" className="btn-edit" data-bs-toggle="modal" data-bs-target="#companyInfo"><img src={EditIcon} alt="icon" /></button>
                      </div>
                    </div>
                    <div className="profile-info-list">

                      <CompanyInfoModal
                        employerData={employerData}
                        getEmployerDetails={getEmployerDetails}
                      />
                      <ul className="info-list-li">
                        <li><span className="plabel">Recruiting Manager</span><span className="result">{employerData && employerData.recruitingManagerName && employerData.recruitingManagerName}</span></li>
                        <li><span className="plabel">Contact Number</span> <span className="result">{employerData && employerData.companyPhone && employerData.companyPhone}</span></li>
                        <li><span className="plabel">Company Address</span> <span className="result">{employerData && employerData.address && employerData.address} , {employerData && employerData.stateResponse && employerData.stateResponse.stateName && employerData.stateResponse.stateName} , {employerData && employerData.countryResponse && employerData.countryResponse.countryName && employerData.countryResponse.countryName}</span></li>
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
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-completed-tab" data-bs-toggle="tab" data-bs-target="#nav-completed" type="button" role="tab" aria-controls="nav-completed" aria-selected="true">Active Jobs</button>
                        <button className="nav-link" id="nav-inprogress-tab" data-bs-toggle="tab" data-bs-target="#nav-inprogress" type="button" role="tab" aria-controls="nav-inprogress" aria-selected="false">Archive Jobs</button>
                      </div>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                          <div className="project-detail-list">
                            {activeJobs && activeJobs.length === 0 ?
                              <div className="project-dbox">
                                <h2 className="prname">No Jobs</h2>
                              </div>
                              :
                              activeJobs.map((data) =>
                                <div className="project-dbox">
                                  <h2 className="prname">{data?.title}</h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      {data?.description}
                                      {/* <span className="prdate">July 05, 2022 - Aug 15, 2022</span> */}
                                    </div>
                                  </div>
                                </div>

                              )}
                            <div className="project-pagination">
                              {activeJobs && activeJobs.length > 5
                                && <Pagination
                                  activePage={activePageNumber}
                                  itemsCountPerPage={pageSize}
                                  totalItemsCount={activeTotal}
                                  pageRangeDisplayed={activeTotal / pageSize}
                                  onChange={handleActiveJobPageChange}
                                />
                              }
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-inprogress" role="tabpanel" aria-labelledby="nav-inprogress-tab">
                          <div className="project-detail-list">
                            {archiveJobs && archiveJobs.length === 0 ?
                              <div className="project-dbox">
                                <h2 className="prname">No Jobs</h2>
                              </div>
                              :
                              archiveJobs.map((data) =>
                                <div className="project-dbox">
                                  <h2 className="prname">{data?.title}</h2>
                                  <div className="prd-buget-column">
                                    <div className="prdate-budgetprice">
                                      {data?.description}
                                      {/* <span className="prdate">July 05, 2022 - Aug 15, 2022</span> */}
                                    </div>
                                  </div>
                                </div>

                              )}


                            <div className="project-pagination">
                              {archiveJobs && archiveJobs.length > 5
                                && <Pagination
                                  activePage={archivePageNumber}
                                  itemsCountPerPage={pageSize}
                                  totalItemsCount={archiveTotal}
                                  pageRangeDisplayed={archiveTotal / pageSize}
                                  onChange={handlePageChange}
                                />
                              }
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EmployerProfile
