import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/images/feed-logo.png";
import VerifiedIcon from "./../../assets/icons/verify.png";
import LocationIcon from "./../../assets/icons/loc-ico.png";
import ChatIcon from "./../../assets/icons/chat-icon.png";
import Pagination from "react-js-pagination";
import { Loader } from "../../components/Loader/Loader";

const ApplicationCards = ({
  handlePageChange,
  activePage,
  pageSize,
  totalRecords,
  jobsApplied,
}) => {
  return (
    <>
      {jobsApplied?.jobs?.map((applied, i) => (
        <div className="feeds-search-coll" key={i}>
          <div className="feeds-search-head">
            <div className="feeds-head-left">
              <div className="feeds-s-logo">
                {applied?.company?.logoUrl && (
                  <img
                    src={`${process.env.REACT_APP_IMAGE_API_URL}${applied.company.logoUrl}`}
                    alt="Company Logo"
                    height="50"
                    width="50"
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>
              <div className="feeds-s-name">
                <h2>
                  <Link to="#">{applied?.title} </Link>
                </h2>
                <ul className="feeds-s-ul">
                  <li>
                    <img src={LocationIcon} alt="Location" />
                    {applied?.location}
                  </li>
                </ul>
              </div>
            </div>
            <div className="feeds-budget">
              <p>Est. Budget</p>
              <span className="project-budget">
                {applied?.salary ? "$" : null}
                {applied?.salary}
              </span>
            </div>
          </div>
          <div className="feeds-search-detail">
            <p>
              {applied?.description}
              {/* <Link to="#">See more </Link> */}
            </p>
            <div className="application-tag-status">
              <div className="feeds-tags">
                <ul className="feeds-ul">
                  {applied?.skills?.split(",").map((sk, i) => (
                    <li key={i}>
                      <Link to="#">{sk} </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="application-status">
                <span className="status-pending">
                  {applied?.appiledJobStatus === 0
                    ? "Pending"
                    : applied?.appiledJobStatus === 1
                    ? "Accepted"
                    : "Rejected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
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
    </>
  );
};

export default ApplicationCards;
