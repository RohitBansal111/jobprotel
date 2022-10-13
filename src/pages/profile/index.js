import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import UserAvtar from "./../../assets/images/demo.png";
import ConnectIcon from "./../../assets/icons/connect.png";
import EmploymentDetailsModal from "../../components/modals/employmentDetailsModal";
import AddProjectModal from "../../components/modals/add-project-modal";
import UpdateProjectModal from "../../components/modals/UpdateProjectModal";
import ModifyEmploymentModal from "../../components/modals/modifyEmploymentModal";
import * as studentServices from "../../services/studentServices";
import * as studentExtraCertificate from "../../services/studentExtraCertificates";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompleteKycModal from "../../components/Common/CompleteKycModal";
import * as projectServices from "../../services/projectHistorySevices";
import moment from "moment";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";
import BuyConnectsModal from "../../components/modals/buyConnectsModal";
import toast from "toastr";
import Swal from "sweetalert2";
import DefaultProfile from "./../../assets/images/demo.png";
import { viewUploadedFiles } from "../../services/viewUploadFileService";
import ImageCropperModal from "../../components/Image-cropper";
import { uploadPicture } from "../../services/uploadProfilePicService";
import * as types from "../../types/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);
  const [studentData, setStudentData] = useState([]);
  const [studentProfilePic, setStudentProfilePic] = useState("");
  const [studentResume, setStudentResume] = useState("");
  const [showBuyConnectModal, setShowBuyConnectModal] = useState(false);
  const [callCertificate, setCallCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState("");

  const [employmentDetails, setEmploymentDetails] = useState([]);
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState({});
  const [projectHistory, setProjectHistory] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [kycStatus, setKycStatus] = useState(true);
  const [editProjectData, setEditProjectData] = useState([]);
  const [extraCertificate, setExtraCertificateData] = useState([]);
  const [editCertificate, setEditCertificate] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [connects, setConnects] = useState();
  const [img, setImg] = useState({
    personalInfoImg: "",
  });
  const [modal, setModal] = useState(false);

  const handleBuyConnect = () => {
    if (authData?.studentDetails !== null) {
      setShowBuyConnectModal(true);
    } else {
      toast.error("Please Complete Your Profile to buy connects");
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getProjectHistory(id, pageNumber);
  };

  const getStudentData = async (id = authData.id) => {
    const resp = await studentServices.getStudentDetails(id);
    if (resp.status == 200) {
      setLoading(false);
      const response = resp.data.data;
      // console.log(response, "::::");
      setStudentData(response);
      setExtraCertificateData(
        response?.studentDetails?.studentExtraCertificate
      );
      if (
        response?.studentDetails !== null &&
        response?.studentDetails?.pictureUrl !== null
      ) {
        setStudentProfilePic(
          `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.pictureUrl}`
        );
      }
      setImg({
        ...img,
        personalInfoImg: `${process.env.REACT_APP_IMAGE_API_URL}${response?.studentDetails?.pictureUrl}`,
      });
      setStudentResume(
        `${process.env.REACT_APP_FILE_URL}${response.resumeFilePath}`
      );

      let interests = response?.interests;
      interests = response?.studentDetails?.interests.split(",");
      setInterests(interests);

      let skill = response?.skills;
      skill = response?.studentDetails?.skills.split(",");
      setSkills(skill);
    }
  };

  const getProjectHistory = async (id, activePage) => {
    let data = {
      userId: id,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    if (data) {
      const resp = await projectServices.getProjectHistoryData(data);
      let response = resp.data.data;
      if (resp.status === 200) {
        // getProjectHistory(authData.id, activePage);
        setLoading(false);
        setProjectHistory(response);
        setTotalRecords(resp.data.totalCount);
      }
    }
  };

  const handleDatarefresh = () => {
    if (authData) {
      getEmploymentDetails(authData);
      return true;
    }
  };

  useEffect(async () => {
    if (authData) {
      getStudentData(authData.id);
      getEmploymentDetails(authData);
      getProjectHistory(authData.id, activePage);
      setId(authData.id);
      getExtraCertificate(authData.id);
    }
    if (
      authData?.studentDetails !== null &&
      authData?.studentDetails?.availableConnects
    ) {
      setConnects(authData?.studentDetails?.availableConnects);
    } else {
      setConnects(0);
    }
  }, [authData]);

  const getEmploymentDetails = async (authData) => {
    let id = authData.id;
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

  const handleDeleteData = async (d) => {
    const resp = await projectServices.removeProjectHistoryData(d);
    if (resp.status === 200) {
      window.location.reload();
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
    }
  };

  const handleDeleteEmploymentData = async (d) => {
    const resp = await studentServices.deleteStudentEmploymentData(d);
    if (resp.status === 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      if (authData) {
        getEmploymentDetails(authData);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setKycStatus(false);
    }, 1000);
  }, []);

  const getTimeZone = (timezone) => {
    if (timezone) {
      const zone = JSON.parse(timezone);
      if (zone?.value == undefined) {
        return zone.altName;
      } else {
        return zone.value;
      }
    } else {
      return "N/A";
    }
  };

  const viewTextChange = (id) => {
    const btn = document.getElementById(id);
    btn.innerHTML = btn.textContent == "View More" ? "View Less" : "View More";
  };

  const handleEditProjectHistory = (data) => {
    setEditProjectData(data);
  };

  const handlePopUp = (id, text) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed && text == "project") {
        handleDeleteData(id);
      } else if (result.isConfirmed && text == "employment") {
        handleDeleteEmploymentData(id);
      }
    });
  };

  const handleExtraCertificateDelete = async (id) => {
    const resp = await studentExtraCertificate.deleteExtraCertificates(id);
    if (resp.status === 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      if (authData) {
        getStudentData(authData.id);
      }
    }
  };

  const editCertificates = async (id, title, i) => {
    if ((id, title)) {
      let formData = new FormData();
      formData.append("Title", title);
      formData.append("CertId", id);

      const resp = await studentExtraCertificate.updateExtraCertificatesTitle(
        formData
      );
      if (resp.status === 200) {
        toast.success(
          resp.data.message ? resp.data.message : "Something went wrong"
        );
        getStudentData(authData.id);
        let arr = [...editCertificate];
        arr.splice(i, 1);
        setEditCertificate(arr);
      }
    }
  };

  const handleFormTitleChange = (index, event) => {
    let data = [...extraCertificate];
    data[index][event.target.name] = event.target.value;
    setExtraCertificateData(data);
    setPreviewImg(data);
  };

  const extraCertificateHandler = async (event) => {
    let files = event.target.files[0];

    // if (files?.length > 0) {
    let obj = {
      title: files.name.split(".").slice(0, -1).join("."),
      certificates: files,
    };
    setCertificateName(obj.title);
    let formData = new FormData();
    formData.append("studentId", authData.id);
    formData.append(`title`, obj.title);
    formData.append(`file`, obj.certificates);

    if (authData) {
      const resp = await studentExtraCertificate.postExtraCertificates(
        formData
      );
      if (resp.status == 200) {
        setCallCertificate(true);
        toast.success(resp.data.message && resp.data.message);
      }
    }
    // }
    // let arr = [];
    // if (files?.length > 0) {
    //   for (let i = 0; i < files.length; i++) {
    //     let obj = {
    //       title: files[i].name.split(".").slice(0, -1).join("."),
    //       certificates: files[i],
    //     };

    //     arr.push(obj);
    //   }
    // }

    // if (arr?.length > 0) {
    //   let formData = new FormData();
    //   formData.append("studentId", authData.id);
    //   for (let i = 0; i < arr.length; i++) {
    //     formData.append(`title [${i}]`, arr[i].title);
    //     formData.append(`file [${i}]`, arr[i].certificates);
    //   }
    //   if (authData) {
    //     const resp = await studentExtraCertificate.postExtraCertificates(
    //       formData
    //     );
    //     if (resp.status == 200) {
    //       setCallCertificate(true);
    //     }
    //   }
    // }
  };

  const getExtraCertificate = async (id) => {
    const resp = await studentExtraCertificate.getExtraCertificates(id);
    let response = resp.data?.data?.result;
    if (resp.status === 200 && response.length > 0) {
      let arr = [];
      response.map((resp) => {
        let obj = {
          title: resp.title.split(".").slice(0, 1).join("."),
          certificates: resp.filePath,
          id: resp.id,
        };
        arr.push(obj);
      });
      setPreviewImg(arr);
    }
  };

  const handleViewFiles = async (filePath) => {
    const resp = await viewUploadedFiles(filePath);
  };

  const handleImageChange = (event) => {
    setModal(true);
    if (event.target.files?.length > 0) {
      setImg({ personalInfoImg: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const postPicture = async () => {
    let image = img.personalInfoImg;
    let imageData = {
      userId: authData.id,
      image,
    };
    const resp = await uploadPicture(imageData);
    if (resp.status == 200) {
      const resp2 = await studentServices.getStudentDetails(id);
      localStorage.setItem("jobPortalUser", JSON.stringify(resp2.data.data));
      if (resp2.status == 200) {
        dispatch({
          type: types.LOGIN_USER_SUCCESS,
          payload: resp2.data.data,
          token: localStorage.getItem("jobPortalUserToken"),
        });
      }
    }
  };

  useEffect(() => {
    if (img?.personalInfoImg?.includes("base64")) {
      postPicture();
    }
  }, [img]);

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
                  <button
                    type="button"
                    className="btn submit-kyc"
                    onClick={() => {
                      toast.error("Profile is not Completed");
                    }}
                  >
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
            <div className="innerbg-banner">
              <div className="banner-edit">
                <Link to="/student/edit-profile" className="btn edit-btn">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </section>
        <ImageCropperModal
          closeModal={closeModal}
          showImageCropModal={modal}
          imageSrc={img.personalInfoImg}
          setImg={setImg}
        />
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
                      <div className="profile-img">
                        <img
                          src={
                            studentProfilePic
                              ? studentProfilePic
                              : DefaultProfile
                          }
                          alt="user profile"
                        />
                        <button type="button" className="update-profile">
                          <i className="fa fa-edit"></i>
                          <input
                            name="profileImage"
                            id="profileImage"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            onChange={handleImageChange}
                          />
                        </button>
                      </div>
                    </div>
                    <h3>
                      {studentData?.firstName} {studentData?.lastName}{" "}
                    </h3>
                    <p>
                      {studentData?.studentDetails?.address}
                      {studentData?.studentDetails?.addressLine1 && ", "}
                      {studentData?.studentDetails?.addressLine1}
                      {studentData?.studentDetails?.addressLine2 && ", "}
                      {studentData?.studentDetails?.addressLine2}
                    </p>
                    <p>{studentData?.studentDetails?.cityName}</p>
                  </div>
                  <div className="profile-connect">
                    {studentData?.studentDetails?.availableConnects && (
                      <>
                        <div className="profile-con">
                          <img src={ConnectIcon} alt="Connect" />
                          <span className="conn-count">
                            {studentData?.studentDetails?.availableConnects}
                          </span>
                        </div>
                        <h4>Available Connects</h4>
                      </>
                    )}
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Experience{" "}
                        <span className="result">
                          {studentData?.studentDetails?.experienceInYears}
                          {studentData?.studentDetails?.experienceInYears >=
                            0 && " Year"}
                          {studentData?.studentDetails?.experienceInMonths >=
                            0 && ", "}
                          {studentData?.studentDetails?.experienceInMonths}
                          {studentData?.studentDetails?.experienceInMonths >=
                            0 && " Month"}
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
                        hour / week{" "}
                        <span className="result">
                          {studentData?.studentDetails?.workHoursPerWeek}
                          {studentData?.studentDetails?.workHoursPerWeek &&
                            " hour"}
                        </span>
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
                      {studentData?.email}
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
                          <h3>Personal information</h3>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
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
                              <span className="plabel">Address </span>
                              <span className="result">
                                {studentData?.studentDetails?.address}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Address Line 1 </span>
                              <span className="result">
                                {studentData?.studentDetails?.addressLine1}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Address Line 2 </span>
                              <span className="result">
                                {studentData?.studentDetails?.addressLine2}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Age</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.age}{" "}
                                {studentData?.studentDetails?.age &&
                                  "Years old"}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Country</span>{" "}
                              <span className="result">
                                {
                                  studentData?.studentDetails?.countryResponse
                                    ?.countryName
                                }
                              </span>
                            </li>
                            <li>
                              <span className="plabel">State</span>{" "}
                              <span className="result">
                                {
                                  studentData?.studentDetails?.stateResponse
                                    ?.stateName
                                }
                              </span>
                            </li>
                            <li>
                              <span className="plabel">City</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.cityName}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Phone Number</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.phoneNumber}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Zipcode</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.postalCode}
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
                              <span className="plabel">Qualification</span>{" "}
                              <span className="result">
                                {
                                  studentData?.studentDetails
                                    ?.qualificationResponse?.qualificationName
                                }
                                {studentData?.studentDetails
                                  ?.qualificationResponse?.qualificationName ==
                                  "Other" &&
                                  ` ( ${studentData?.studentDetails?.qualificationName} ) `}
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
                              <span className="plabel">College</span>{" "}
                              <span className="result">
                                {
                                  studentData?.studentDetails?.collegeResponse
                                    ?.collegeName
                                }
                              </span>
                            </li>
                            <li>
                              <span className="plabel">
                                {" "}
                                Experience In Year
                              </span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.experienceInYears}{" "}
                                year{" "}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">
                                {" "}
                                Experience In Month
                              </span>{" "}
                              <span className="result">
                                {
                                  studentData?.studentDetails
                                    ?.experienceInMonths
                                }{" "}
                                month
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Expected Salary</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.expectedSalary}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">
                                Hour / Week (Available)
                              </span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.workHoursPerWeek}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Catagory of Job</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.categoryOfJob}
                              </span>
                            </li>
                            <li>
                              <span className="plabel">Skills</span>{" "}
                              <ul className="result d-flex">
                                {skills?.length > 0 &&
                                  skills.map((skill, index) => (
                                    <li key={index} className="mb-0">
                                      <Link to="#">
                                        {(index ? ", " : "") + skill}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                            <li>
                              <span className="plabel">Working Type</span>{" "}
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
                              <span className="plabel">Job Location</span>{" "}
                              <span className="result">
                                {studentData?.studentDetails?.location
                                  ? studentData?.studentDetails?.location
                                  : "N / A"}
                              </span>
                            </li>
                            {studentData?.studentDetails && (
                              <>
                                {" "}
                                <li>
                                  <span className="plabel">Time zone </span>
                                  <span className="result">
                                    {getTimeZone(
                                      studentData?.studentDetails?.timezone
                                    )}
                                  </span>
                                </li>
                              </>
                            )}
                            <li>
                              <span className="plabel">Resume </span>
                              <span className="result">
                                <ul className="tags">
                                  <li
                                    className="me-0"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleViewFiles(
                                        studentData?.studentDetails
                                          ?.resumeFilePath
                                      )
                                    }
                                  >
                                    <a
                                      target="_blank"
                                      href={`${process.env.REACT_APP_FILE_URL}${studentData?.studentDetails?.resumeFilePath}`}
                                      rel="noreferrer"
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
                              <span className="plabel">Cover Letter</span>{" "}
                              <span className="result">
                                <ul className="tags">
                                  <li>
                                    <a
                                      href={`${process.env.REACT_APP_FILE_URL}${studentData?.studentDetails?.coverLetter}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {" "}
                                      {/* {certificate.title} */}
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
                          <div className="pr-edit-icon">
                            <button
                              type="button"
                              className="icon_button"
                              data-bs-toggle="modal"
                              data-bs-target="#employmentModal"
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                            <EmploymentDetailsModal
                              getEmploymentDetails={getEmploymentDetails}
                            />
                          </div>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li additional-box">
                            {employmentDetails?.map((data, i) => (
                              <li key={i}>
                                <div className="designation-list-item">
                                  <div className="employer-sort-info">
                                    <h6 className="mb-0">
                                      {data?.designation?.title}
                                    </h6>
                                    <p>{data.employerName}</p>
                                    <p className="dateP">
                                      {data.startDate}
                                      {!data?.isCurrentEmployer && " - "}

                                      {!data?.isCurrentEmployer && data.endDate}
                                    </p>
                                  </div>
                                </div>
                                <div className="employment-action">
                                  <button
                                    type="button"
                                    className="icon_button_text"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modifyEmploymentModal"
                                    onClick={() => handleEditingData(data)}
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="icon_button_text"
                                    data-bs-toggle="modal"
                                    onClick={() =>
                                      handlePopUp(data.id, "employment")
                                    }
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <ModifyEmploymentModal
                            empData={data}
                            handleEmp={handleDatarefresh}
                          />
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
                              activePage={activePage}
                            />
                          </div>
                        </div>
                        <div className="Project-info-list">
                          <div className="project-detail-list">
                            {projectHistory?.length > 0 &&
                              projectHistory.map((project, index) => (
                                <div className="project-dbox pb-0 pt-0" key={index}>
                                  <div className="project-history-title-action">
                                    <h2 className="prname mb-0">
                                      {project.title}
                                    </h2>
                                    <div className="d-flex">
                                      <button
                                        type="button"
                                        className="icon_button_text"
                                        data-bs-toggle="modal"
                                        data-bs-target="#UpdateProjectModal"
                                        onClick={() =>
                                          handleEditProjectHistory(project)
                                        }
                                      >
                                        <i className="fas fa-pen"></i>
                                      </button>
                                      <UpdateProjectModal
                                        editProjectData={editProjectData}
                                        getProjectHistory={getProjectHistory}
                                      />
                                      <button
                                        type="button"
                                        className="icon_button_text"
                                        data-bs-toggle="modal"
                                        onClick={() =>
                                          handlePopUp(project.id, "project")
                                        }
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                    </div>
                                  </div>

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
                                    </div>
                                  </div>

                                  <div
                                    className="full-project-details collapse"
                                    id={`collapseExample${index}`}
                                  >
                                    <p>
                                      <b className="d-block mt-1">
                                        Description: &nbsp;
                                      </b>
                                      {project.description}
                                    </p>
                                    <p>
                                      <b className="d-block mt-2">
                                        Roles & Responsibility: &nbsp;
                                      </b>
                                      {project.roleResponsiblity}
                                    </p>
                                    <p>
                                      <b>Team Size: &nbsp;</b>
                                      {project.totalTeamSize}
                                    </p>
                                    <p>
                                      <b>Link:</b> {project.projectUrl}
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
                            <div className="project-pagination"></div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="profile-information-view">
                      <div className="Project-information-coll">
                        {/* <div className="profile-card-head">
                          <div className="file-upload-placehlder">
                            <input
                              name="documents"
                              uploadlabel="Browse documents"
                              type="file"
                              accept=".jpg, .jpeg, .png, application/pdf, .doc"
                              onChange={extraCertificateHandler}
                              // multiple
                            />
                            <span>Add Extra Certificates</span>
                          </div>
                          <ul>
                            <li>{certificateName}</li>
                          </ul>
                        </div> */}
                        <div className="profile-card-head">
                          <h3>Extra Certificates</h3>
                          <div className="pr-edit-icon">
                            <div className="file-upload-placehlder edit-studentP">
                              <button
                                type="button"
                                className="icon_button"
                              >
                                <input
                                  name="documents"
                                  uploadlabel="Browse documents"
                                  type="file"
                                  accept=".jpg, .jpeg, .png, application/pdf, .doc"
                                  onChange={extraCertificateHandler}
                                  // multiple
                                />
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="profile-info-list">
                          <ul className="info-list-li">
                            <li>
                              <div className="result w-100">
                                {extraCertificate?.length > 0
                                  ? extraCertificate?.map((certificate, i) => (
                                      <>
                                        <div key={i} className="div_edit_btn">
                                          {editCertificate[i] !== undefined ? (
                                            <input
                                              name="title"
                                              className="form-control edit-profile-file"
                                              onChange={(e) =>
                                                handleFormTitleChange(i, e)
                                              }
                                              value={certificate.title}
                                            />
                                          ) : (
                                            <a
                                              href={`${process.env.REACT_APP_FILE_URL}${certificate.filePath}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              {" "}
                                              {certificate.title}
                                            </a>
                                          )}
                                          <div className="d-flex">
                                          {editCertificate[i] ? (
                                            <>
                                            <button 
                                                className="btn btn-info h-auto px-2 py-0 ms-3 text-white"
                                                onClick={() => {
                                                  let arr = [
                                                    ...editCertificate,
                                                  ];
                                                  arr[i] = false;
                                                  setEditCertificate(arr);
                                                }}
                                                >
                                                Cancel
                                              </button>
                                              <button 
                                                className="btn btn-primary h-auto px-2 py-0 ms-3"
                                                onClick={() => {
                                                  editCertificates(
                                                    certificate.certId,
                                                    certificate.title,
                                                    i
                                                  );
                                                }}
                                                >
                                                Update
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              {" "}
                                              <button
                                                type="button"
                                                className="icon_button_text"
                                                onClick={() => {
                                                  let arr = [
                                                    ...editCertificate,
                                                  ];
                                                  arr[i] = true;
                                                  setEditCertificate(arr);
                                                }}
                                              >
                                                <i className="fas fa-pen"></i>
                                              </button>
                                              <button
                                                type="button"
                                                className="icon_button_text"
                                                onClick={() => {
                                                  Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You won't be able to revert this!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor:
                                                      "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText:
                                                      "Yes, delete it!",
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      handleExtraCertificateDelete(
                                                        certificate.certId
                                                      );
                                                    }
                                                  });
                                                }}
                                              >
                                                <i className="fas fa-trash"></i>
                                              </button>
                                            </>
                                          )}
                                          </div>
                                        </div>
                                      </>
                                    ))
                                  : "N / A"}
                              </div>
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

export default Profile;
