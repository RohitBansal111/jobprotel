import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Pagination from "react-js-pagination";
import * as appliedJobServices from "../../services/appliedJobServices";
import toast from "toastr";

const EmployerReviewCard = ({
  user,
  activePage,
  handlePageChangeReview,
  pageSize,
  totalRecords,
  jobid,
  pageNumber,
  getUsers,
}) => {
  const navigate = useNavigate();
  const [showAcceptInvitation, setshowAcceptInvitation] = useState(true);
  const [showRejectedView, setshowRejectedView] = useState(true);
  const [userData, setUserData] = useState([]);

  const handleInvitation = async (status, id) => {
    setshowAcceptInvitation(false);
    let data = {
      applayJobId: id,
      appiledJobStatusByEmployer: status,
    };
    const resp = await appliedJobServices.updateAppliedJobs(data);
    console.log(resp);

    if (resp.status == 200) {
      toast.success(
        resp.data.message ? resp.data.message : "Something went wrong"
      );
      getUsers(jobid, pageNumber)
    }
  };

  const handleRejected = () => setshowRejectedView(false);
  const handleChatNow = () => navigate("/employer-inbox");

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  // console.log(id, "::::")
  return userData?.length > 0 ? (
    userData?.map((user, i) => (
      <div className="feeds-search-coll">
        <div className="feeds-search-head">
          <div className="feeds-head-left">
            <div className="feeds-s-logo">
              <Link to={`/public/${user?.id}`}>
                <img
                  src={`${process.env.REACT_APP_IMAGE_API_URL}${user?.studentDetails?.pictureUrl}`}
                  style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                  alt="profile image"
                />
              </Link>
            </div>
            <div className="feeds-s-name">
              <h2>
                <Link to={`/public/${user?.id}`}>{user?.fullName}</Link>{" "}
                {/* <span className="desgination">(FrontEnd Developer)</span>{" "} */}
              </h2>
              <ul className="feeds-s-ul">
                <li>
                  <img src={LocationIcon} alt="Location" />
                  {/* India */}
                  {user?.studentDetails?.cityName}
                </li>
                {/* <li>
                <img src={VerifiedIcon} alt="Company Verified" />
                Verified post
              </li> */}
              </ul>
              <li>
                {user?.studentDetails?.qualificationResponse?.qualificationName}
              </li>
            </div>
          </div>
          <div className="feeds-s-name"></div>
          <div className="review-listing-action">
            {user?.appliedJobStatus == 0 && (
              <>
                <button
                  type="button"
                  onClick={() => handleInvitation(1, user?.reviewApplicationId)}
                  className="btn btn-primary mr-2"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => handleInvitation(2, user?.reviewApplicationId)}
                  className="btn btn-reject"
                >
                  Reject
                </button>
              </>
            )}
            {user?.appliedJobStatus == 1 && (
              <button
                type="button"
                onClick={handleChatNow}
                className="btn btn-primary mr-2"
              >
                <i className="fa fa-comments mr-2"></i> Chat Now
              </button>
            )}
            {user?.appliedJobStatus == 2 && (
              <button type="button" className="btn btn-reject">
                Rejected
              </button>
            )}
          </div>
        </div>
        <div className="feeds-search-detail">
          <p>
            {/* {user?.postedJob?.description} */}
            {/* We have a new project we might consider outsourcing. We need to hear
          some full stacks experts regarding the difficulty of such project,
          cost esitmations, and required skills. This job will be fast - a
          conversation. ------------------ About the project in a nutshell.{" "}
          <Link to="#">See more </Link> */}
          </p>
        </div>
        <div>
          {totalRecords > 5 && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={pageSize}
              totalItemsCount={totalRecords}
              pageRangeDisplayed={4}
              onChange={handlePageChangeReview}
            />
          )}
        </div>
      </div>
    ))
  ) : (
    <h3>No record</h3>
  );
};

export default EmployerReviewCard;
