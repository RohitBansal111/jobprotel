import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/profile-img.jpg";
import ConnectIcon from "./../../assets/icons/connect.png";
import EditIcon from "./../../assets/icons/editicon.png";
import AddColeagueModal from "../../components/modals/addColleaguesModal";
import CompanyLogo from "../../assets/images/company-logo2.jpeg";
import EmploymentDetailsModal from "../../components/modals/employmentDetailsModal";
import AddProjectModal from "../../components/modals/add-project-modal";
import ModifyEmploymentModal from "../../components/modals/modifyEmploymentModal";
import * as studentServices from "../../services/studentServices";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompleteKycModal from "../../components/Common/CompleteKycModal";
import * as projectServices from "../../services/projectHistorySevices";
import Moment from "react-moment";
import moment from "moment";
import Pagination from "react-js-pagination";

const Profile = () => {
  const authData = useSelector((state) => state.auth.user);

  const [studentData, setStudentData] = useState([]);
  const [studentProfilePic, setStudentProfilePic] = useState("");
  const [studentResume, setStudentResume] = useState("");

  const [employmentDetails, setEmploymentDetails] = useState([]);
  const [interests, setInterests] = useState([]);

  const [empDetails, setEmpDetails] = useState([]);

  const [data, setData] = useState({});
  const [projectHistory, setProjectHistory] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    setLoading(true);
    // getJobList(authData.id, pageNumber);
  };

  const getStudentData = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      const response = resp.data.data;
      console.log(response);
      setStudentData(response);
      setStudentProfilePic(
        `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.pictureUrl}`
      );

      setStudentResume(
        `${process.env.REACT_APP_IMAGE_API_URL}${response.resumeFilePath}`
      );

      let interests = response.interests;
      interests = response && response?.studentDetails?.interests.split(",");
      setInterests(interests);
    }
  };
  const getProjectHistory = async (id) => {
    let data = {
      userId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };

    const resp = await projectServices.getProjectHistoryData(data);
    console.log(resp);
    let response = resp.data.data;
    if (resp.status === 200) {
      setProjectHistory(response);
    }
  };
  console.log(projectHistory);

  useEffect(async () => {
    if (authData) {
      getStudentData(authData.id);
      getEmploymentDetails(authData.id);
      getProjectHistory(authData.id);
    }
  }, [authData]);

  const getEmploymentDetails = async (id = authData.id) => {
    const resp = await studentServices.getStudentEmploymentData(id);
    // console.log(resp)
    if (resp.status === 200) {
      let response = resp.data.data.result;
      setEmploymentDetails(response);
    }
  };

  const handleEditingData = (data) => {
    setData(data);
  };

  const handleDeleteData = async (d) => {
    const resp = await studentServices.deleteStudentEmploymentData(d);
    console.log(resp);
    if (resp.status === 200) {
      employmentDetails
        .filter((data) => data.id !== d)
        .map((data) => setEmpDetails(data));
      getEmploymentDetails();
    }
  };
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
              <div className="banner-edit">
                <Link to="/student/edit-profile" className="btn edit-btn">
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
                        <img src={studentProfilePic} alt="user profile" />
                      </span>
                    </div>
                    <h3>
                      {studentData?.firstName} {studentData?.lastName}{" "}
                    </h3>
                    <p>
                      {studentData?.studentDetails?.address}
                      {", "}
                      {studentData?.studentDetails?.addressLine1}
                      {", "}
                      {studentData?.studentDetails?.addressLine2}
                    </p>
                    <p>{studentData?.studentDetails?.cityName}</p>
                  </div>
                  <div className="profile-connect">
                    <div className="profile-con">
                      <img src={ConnectIcon} alt="Connect" />
                      <span className="conn-count">
                        {studentData?.studentDetails?.availableConnects}
                      </span>
                    </div>
                    <h4>Available Connects</h4>
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData?.studentDetails?.experienceInYears}
                          Year{", "}
                          {studentData?.studentDetails?.experienceInMonths}{" "}
                          Month
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
                        Hours / day{" "}
                        <span className="result">
                          {studentData?.studentDetails?.workHoursPerDay}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <button type="button" className="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#addColleague"> Add colleague </button>
                          <AddColeagueModal /> */}
              </div>
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <p className="mailto:michael-taylor028@gmail.com">
                      {studentData?.email}
                    </p>
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
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Personal information</h3>
                      {/* <div className="pr-edit-icon">
                                  <button type="button" className="icon_button">
                                    <img src={EditIcon} alt="icon" />
                                  </button>
                                </div> */}
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li">
                        <li>
                          <span className="plabel">Age</span>{" "}
                          <span className="result">
                            {studentData?.studentDetails?.age}{" "}
                            {studentData?.studentDetails?.age && "Years old"}
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Gender </span>
                          <span className="result">
                            {
                              studentData?.studentDetails?.genderResponse
                                ?.genderName
                            }
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Qualification</span>{" "}
                          <span className="result">
                            {
                              studentData?.studentDetails?.qualificationResponse
                                ?.qualificationName
                            }
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Interested area </span>
                          <div className="result">
                            <ul className="tags">
                              {interests &&
                                interests.length > 0 &&
                                interests.map((interst, index) => (
                                  <li key={index}>
                                    <Link to="#">{interst}</Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </li>
                        <li>
                          <span className="plabel">Time zone </span>
                          <span className="result">
                            {studentData?.studentDetails?.timezone}
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Address </span>
                          <span className="result">
                            {studentData?.studentDetails?.address}
                            {", "}
                            {studentData?.studentDetails?.addressLine1}
                            {", "}
                            {studentData?.studentDetails?.addressLine2}
                            {studentData?.studentDetails?.cityName}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Professional information</h3>
                      {/* <div className="pr-edit-icon">
                                  <button type="button" className="icon_button">
                                    <img src={EditIcon} alt="icon" />
                                  </button>
                                </div>  */}
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li">
                        <li>
                          <span className="plabel">Hours / day</span>{" "}
                          <span className="result">
                            {studentData?.studentDetails?.workHoursPerDay}
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Expected salary </span>
                          <span className="result">
                            $ {studentData?.studentDetails?.expectedSalary}
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Total Experience</span>{" "}
                          <span className="result">
                            {studentData?.studentDetails?.experienceInYears}{" "}
                            Years{" "}
                            {studentData?.studentDetails?.experienceInMonths}{" "}
                            months
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Working</span>{" "}
                          <span className="result">
                            {studentData?.studentDetails?.workingType}
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Resume </span>
                          <span className="result">
                            <ul className="tags">
                              <li style={{ cursor: "pointer" }}>
                                <a
                                  target="_blank"
                                  href={studentResume && studentResume}
                                >
                                  {studentData?.studentDetails?.resumeFilePath}
                                </a>
                              </li>
                            </ul>
                          </span>
                        </li>
                        <li>
                          <span className="plabel">Extra certificates </span>
                          <span className="result">
                            <ul className="tags">
                              {studentData?.studentDetails?.studentExtraCertificate.map(
                                (certificate) => (
                                  <>
                                    <li>
                                      <a
                                        href={`${process.env.REACT_APP_IMAGE_API_URL}${certificate.filePath}`}
                                        target="_blank"
                                      >
                                        {certificate.title}
                                      </a>
                                    </li>
                                  </>
                                )
                              )}
                            </ul>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="profile-information-coll">
                    <div className="profile-card-head">
                      <h3>Employment Details</h3>
                      <div className="pr-edit-icon">
                        <button
                          type="button"
                          className="icon_button"
                          data-bs-toggle="modal"
                          data-bs-target="#employmentModal"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <EmploymentDetailsModal />
                      </div>
                    </div>
                    <div className="profile-info-list">
                      <ul className="info-list-li additional-box">
                        {employmentDetails?.map((data) => (
                          <li>
                            <div className="designation-list-item">
                              <div className="employer-sort-info">
                                <h4>Front End - Team Lead </h4>
                                <p>{data.employerName}</p>
                                <p className="dateP">
                                  {data.startDate}
                                  {data.startDate && data.endDate
                                    ? " - "
                                    : null}
                                  {data.endDate}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="icon_button_text"
                              data-bs-toggle="modal"
                              data-bs-target="#modifyEmploymentModal"
                              onClick={() => handleEditingData(data)}
                            >
                              <i className="fas fa-pen"></i> Edit
                            </button>
                            <button
                              type="button"
                              className="icon_button_text"
                              data-bs-toggle="modal"
                              // data-bs-target="#modifyEmploymentModal"
                              onClick={() => handleDeleteData(data.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                      <ModifyEmploymentModal empData={data} />
                    </div>
                  </div>
                </section>
                <section className="profile-information-view">
                  <div className="Project-information-coll">
                    <div className="profile-card-head">
                      <h3>Project history</h3>
                      <div className="pr-edit-icon">
                        <button
                          type="button"
                          className="icon_button"
                          data-bs-toggle="modal"
                          data-bs-target="#addProjectModal"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <AddProjectModal
                          getProjectHistory={getProjectHistory}
                        />
                      </div>
                    </div>
                    <div className="Project-info-list">
                      <div className="project-detail-list">
                        {projectHistory &&
                          projectHistory.length > 0 &&
                          projectHistory.map((project, index) => (
                            <div className="project-dbox">
                              <h2 className="prname">
                                {/* Front-End Sketch to Tailwind */}
                                {project.title}
                              </h2>
                              <div className="prd-buget-column">
                                <div className="project-tenure-skills">
                                  <span className="prdate">
                                    {/* JAN 05, 2022 - JAN 15, 2022 */}
                                    {moment(project.startDate).format(
                                      "MMM Do YYYY"
                                    )}
                                    {" - "}
                                    {moment(project.endDate).format(
                                      "MMM Do YYYY"
                                    )}
                                  </span>
                                  <ul className="tech-links">
                                    {/* <li>react-redux</li>
                                    <li>flutter</li>
                                    <li>native</li> */}
                                    {project.roleResponsiblity}
                                  </ul>
                                </div>
                              </div>
                              <button
                                type="button"
                                data-bs-toggle="collapse"
                                href={`#collapseExample${index}`}
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                className="btn btn-view-more"
                              >
                                View More
                              </button>
                              <div
                                className="full-project-details collapse"
                                id={`collapseExample${index}`}
                              >
                                <p>{project.description}</p>
                                <p>
                                  <b>Link:</b>{" "}
                                  {/* <Link to="/">https://bit.ly/3HAAMCF</Link> */}
                                  {project.projectUrl}
                                </p>
                                {/* <p>
                                  <b>Attachment:</b>
                                </p>
                                <p className="attachment">
                                  <i className="fas fa-file"></i>
                                  <Link
                                    to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                    target="_blank"
                                    download
                                  >
                                    Home (5).jpg (1 KB)
                                  </Link>
                                </p> */}
                              </div>
                            </div>
                          ))}

                        {/* <div className="project-dbox">
                          <h2 className="prname">
                            Fullstack project assessment &amp; advice
                          </h2>
                          <div className="prd-buget-column">
                            <div className="project-tenure-skills">
                              <span className="prdate">
                                JAN 05, 2022 - JAN 15, 2022
                              </span>
                              <ul className="tech-links">
                                <li>react-redux</li>
                                <li>flutter</li>
                                <li>native</li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            href="#collapseExample1"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample1"
                            className="btn btn-view-more"
                          >
                            View More
                          </button>
                          <div
                            className="full-project-details collapse"
                            id="collapseExample1"
                          >
                            <p>
                              Skills And Qualifications I want the design
                              completed with Sketch to into tailwind if you
                              contact to me I show you all details psi: My
                              request from you is to show your projects that you
                              have done with tailwind before.
                            </p>
                            <p>
                              <b>Link:</b>{" "}
                              <Link to="/">https://bit.ly/3HAAMCF</Link>
                            </p>
                            <p>
                              <b>Attachment:</b>
                            </p>
                            <p className="attachment">
                              <i className="fas fa-file"></i>
                              <Link
                                to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                target="_blank"
                                download
                              >
                                Home (5).jpg (1 KB)
                              </Link>
                            </p>
                          </div>
                        </div>
                        <div className="project-dbox">
                          <h2 className="prname">
                            Fullstack project assessment &amp; advice
                          </h2>
                          <div className="prd-buget-column">
                            <div className="project-tenure-skills">
                              <span className="prdate">
                                JAN 05, 2022 - JAN 15, 2022
                              </span>
                              <ul className="tech-links">
                                <li>react-redux</li>
                                <li>flutter</li>
                                <li>native</li>
                              </ul>
                            </div>
                          </div>
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            href="#collapseExample2"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample2"
                            className="btn btn-view-more"
                          >
                            View More
                          </button>
                          <div
                            className="full-project-details collapse"
                            id="collapseExample2"
                          >
                            <p>
                              Skills And Qualifications I want the design
                              completed with Sketch to into tailwind if you
                              contact to me I show you all details psi: My
                              request from you is to show your projects that you
                              have done with tailwind before.
                            </p>
                            <p>
                              <b>Link:</b>{" "}
                              <Link to="/">https://bit.ly/3HAAMCF</Link>
                            </p>
                            <p>
                              <b>Attachment:</b>
                            </p>
                            <p className="attachment">
                              <i className="fas fa-file"></i>
                              <Link
                                to="https://blog.undraw.co/static/76e3dd339b3bcf646b0cb79ecec6a04c/tailwindcss_sketch_ui.png"
                                target="_blank"
                                download
                              >
                                Home (5).jpg (1 KB)
                              </Link>
                            </p>
                          </div>
                        </div> */}
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
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
