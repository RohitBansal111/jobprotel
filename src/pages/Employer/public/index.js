import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import * as studentServices from "../../../services/studentServices";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CompleteKycModal from "../../../components/Common/CompleteKycModal";
import * as projectServices from "../../../services/projectHistorySevices";
import moment from "moment";
import Pagination from "react-js-pagination";
import { Loader } from "../../../components/Loader/Loader";
import UserAvatar from "./../../../assets/images/demo.png";

const Profile = () => {
  const { userId } = useParams();
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
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [kycStatus, setKycStatus] = useState(true);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getProjectHistory(id, pageNumber);
  };

  const getStudentData = async (id = userId) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      // console.log(response, "::::");
      setStudentData(response);
      if (
        response?.studentDetails !== null &&
        response?.studentDetails?.pictureUrl !== null
      ) {
        setStudentProfilePic(
          `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.pictureUrl}`
        );
      }

      setStudentResume(
        `${process.env.REACT_APP_FILE_URL}${response?.resumeFilePath}`
      );

      let interests = response?.interests;
      interests = response?.studentDetails?.interests.split(",");
      setInterests(interests);
    }
  };

  const getProjectHistory = async (id, activePage = activePage) => {
    let data = {
      userId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    if (data) {
      const resp = await projectServices.getProjectHistoryData(data);
      let response = resp.data.data;
      if (resp.status === 200) {
        setLoading(false);
        setProjectHistory(response);
        setTotalRecords(resp.data.totalCount);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getStudentData(userId);
      getEmploymentDetails(userId);
      getProjectHistory(userId, activePage);
      setId(userId);
    }
  }, [userId]);

  const getEmploymentDetails = async (userId) => {
    let id = userId;
    const resp = await studentServices.getStudentEmploymentData(id);
    if (resp.status === 200) {
      setLoading(false);
      let response = resp.data.data.result;
      setEmploymentDetails(response);
    }
  };

  const handleEditingData = (data) => {
    setData(data);
  };

  useEffect(() => {
    setTimeout(() => {
      setKycStatus(false);
    }, 1000);
  }, []);

  const getTimeZone = (timezone) => {
    if (timezone) {
      const zone = JSON.parse(timezone);
      return zone.value;
    } else {
      return "N/A";
    }
  };

  const viewTextChange = (id) => {
    const btn = document.getElementById(id);
    btn.innerHTML = btn.textContent == "View More" ? "View Less" : "View More";
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
        {loading ? (
          <div className="fullpage-loader">
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <>
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
                                studentProfilePic
                                  ? studentProfilePic
                                  : UserAvatar
                              }
                              alt="user profile"
                            />
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
                      {console.log(
                        studentData?.studentDetails?.experienceInYears
                      )}
                      <div className="user-prof-info">
                        <ul className="prof-info-ul">
                          {studentData?.studentDetails?.experienceInYears ==
                            0 &&
                          studentData?.studentDetails?.experienceInMonths ==
                            0 ? (
                            <li>
                              Experience <span>Fresher</span>
                            </li>
                          ) : (
                            <li>
                              Experience{" "}
                              <span className="result">
                                {studentData?.studentDetails?.experienceInYears}
                                Year{", "}
                                {
                                  studentData?.studentDetails
                                    ?.experienceInMonths
                                }{" "}
                                Month
                              </span>
                            </li>
                          )}
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
                                studentData?.studentDetails
                                  ?.qualificationResponse?.qualificationName
                              }
                            </span>
                          </li>
                          <li>
                            Hour / week{" "}
                            <span className="result">
                              {studentData?.studentDetails?.workHoursPerWeek}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="jobs-feeds-sec">
                    <div className="jobs-com-profile">
                      <div className="profile-update">
                        <p className="mailto:michael-taylor028@gmail.com">
                          {studentData?.email}
                        </p>
                      </div>
                    </div>

                    <section className="profile-information-view">
                      <div className="profile-information-coll">
                        <div className="profile-card-head">
                          <h3>Personal information</h3>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
                            <li>
                              <span className="plabel">Age</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.age}{" "}
                                {studentData?.studentDetails?.age &&
                                  "Years old"}
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
                                  studentData?.studentDetails
                                    ?.qualificationResponse?.qualificationName
                                }
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Interested area </span>
                              <div className="result">
                                <ul className="tags">
                                  {interests?.length > 0 &&
                                    interests.map((interst, index) => (
                                      <li key={index}>
                                        <Link to="#">{interst}</Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
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

                            <li>
                              <span className="plabel">KYC Status</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.kycStatus ===
                                "true"
                                  ? "KYC Completed"
                                  : "Not Completed"}
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
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
                            <li>
                              <span className="plabel">Hour / week</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.workHoursPerWeek}
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
                                {
                                  studentData?.studentDetails
                                    ?.experienceInMonths
                                }{" "}
                                months
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Working</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.workingType == 1
                                  ? "Onsite"
                                  : studentData?.studentDetails?.workingType ==
                                    2
                                  ? "Offsite"
                                  : "N/A"}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Time zone </span>
                              <span className="result">
                                {getTimeZone(
                                  studentData?.studentDetails?.timezone
                                )}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Location </span>
                              <span className="result">
                                {studentData?.studentDetails?.location
                                  ? studentData?.studentDetails?.location
                                  : "N/A"}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Resume </span>
                              <span className="result">
                                <ul className="tags">
                                  <li style={{ cursor: "pointer" }}>
                                    <a
                                      target="_blank"
                                      href={`${process.env.REACT_APP_IMAGE_API_URL}${studentData?.studentDetails?.resumeFilePath}`}
                                    >
                                      {
                                        studentData?.studentDetails
                                          ?.resumeFilePath
                                      }
                                    </a>
                                  </li>
                                </ul>
                              </span>
                            </li>
                            <li>
                              <span className="plabel">
                                Extra certificates{" "}
                              </span>
                              <span className="result">
                                <ul className="tags">
                                  {studentData?.studentDetails?.studentExtraCertificate.map(
                                    (certificate, i) => (
                                      <>
                                        <li key={i}>
                                          <a
                                            href={`${process.env.REACT_APP_FILE_URL}${certificate.filePath}`}
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
                            <li>
                              <span className="plabel">Cover Letter </span>
                              <span className="result">
                                <ul className="tags">
                                  <li style={{ cursor: "pointer" }}>
                                    <a
                                      target="_blank"
                                      href={`${process.env.REACT_APP_IMAGE_API_URL}${studentData?.studentDetails?.coverLetter}`}
                                    >
                                      {studentData?.studentDetails?.coverLetter}
                                    </a>
                                  </li>
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
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li additional-box">
                            {employmentDetails?.map((data, i) => (
                              <li key={i}>
                                <div className="designation-list-item">
                                  <div className="employer-sort-info">
                                    <h4>{data?.designation?.title}</h4>
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
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className="profile-information-view">
                      <div className="Project-information-coll">
                        <div className="profile-card-head">
                          <h3>Project history</h3>
                        </div>
                        <div className="Project-info-list">
                          <div className="project-detail-list">
                            {projectHistory?.length > 0 &&
                              projectHistory.map((project, index) => (
                                <div className="project-dbox" key={index}>
                                  <h2 className="prname">{project.title}</h2>
                                  <div className="prd-buget-column">
                                    <div className="project-tenure-skills">
                                      <span className="prdate">
                                        {moment(project.startDate).format(
                                          "MMM Do YYYY"
                                        )}
                                        {" - "}
                                        {moment(project.endDate).format(
                                          "MMM Do YYYY"
                                        )}
                                      </span>
                                      <ul className="tech-links">
                                        <li>
                                          {" "}
                                          <span>
                                            <b>Roles/Responsiblity: </b>{" "}
                                            {project.roleResponsiblity}
                                          </span>
                                        </li>
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
                                    id={`#collapseEx${index}`}
                                    onClick={() =>
                                      viewTextChange(`#collapseEx${index}`)
                                    }
                                  >
                                    View More
                                  </button>
                                  <div
                                    className="full-project-details collapse"
                                    id={`collapseExample${index}`}
                                  >
                                    <p>
                                      <b>Description: </b>
                                      {project.description}
                                    </p>
                                    <p>
                                      <b>Team Size: &nbsp;</b>
                                      {project.totalTeamSize}
                                    </p>
                                    <p>
                                      <b>Link: </b>
                                      {project.projectUrl}
                                    </p>
                                  </div>
                                </div>
                              ))}
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
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
