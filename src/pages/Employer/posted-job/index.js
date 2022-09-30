import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import ConnectIcon from "./../../../assets/icons/connect.png";
import PostedJobCard from "../../../components/PostedJobCard";
import PostedJobModal from "../../../components/modals/postedJobModal";
import { useState, useEffect } from "react";
import * as jobServices from "../../../services/jobServices";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { Loader } from "../../../components/Loader/Loader";
import toast from "toastr";
import UserAvtar from "./../../../assets/images/demo.png";

const PostedJob = () => {
  const [companyLogo, setCompanyLogo] = useState("");
  const [id, setId] = useState("");
  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const authData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (authData) {
      // console.log(authData, "::::");
      setId(authData.id);
      if (authData.comapanyDetail !== null) {
      setCompanyLogo(
        `${process.env.REACT_APP_IMAGE_API_URL}${authData?.comapanyDetail?.logoPath}`
      );
      }
      getJobList(authData.id, activePage);
    }
  }, [authData]);

  const getJobList = async (
    id = authData.id,
    activePage = activePage,
    search = ""
  ) => {
    let data = {
      serachItem: search,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    const response = await jobServices.getJobList(data);
    if (response.status == 200) {
      setLoading(false);
      setJobList(response.data.data);
      setTotalRecords(response.data.totalCount);
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getJobList(authData.id, pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    getJobList(authData.id, activePage, search);
  };

  return (
    <Layout companyLogo={companyLogo}>
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
                        <img src={companyLogo ? companyLogo : UserAvtar} alt="Company profile" />
                      </span>
                    </div>
                    <h3>{authData?.comapanyDetail?.companyName}</h3>
                    <div>
                      {authData?.comapanyDetail?.address}
                      {authData?.comapanyDetail?.cityName && ", "}
                      {authData?.comapanyDetail?.cityName}{" "}
                      <p>
                        {authData?.comapanyDetail?.stateResponse?.stateName}
                      </p>
                    </div>
                  </div>
                  <div className="profile-connect">
                    {authData?.comapanyDetail && (
                      <>
                        <div className="profile-con">
                          <img src={ConnectIcon} alt="Connect" />
                          <span className="conn-count">
                            {authData?.comapanyDetail?.availableConnects}
                          </span>
                        </div>
                        <h4>Available Connects</h4>
                      </>
                    )}
                  </div>
                  <div className="user-prof-info">
                    <ul className="prof-info-ul">
                      <li>
                        Contact Details{" "}
                        <span className="result">{authData?.email}</span>
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
                          {totalRecords && totalRecords}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-strength">
                    {/* <div className="profile-strength-inner">
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
                    </div> */}
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
                </div>
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
                          type="post"
                          activePage={activePage}
                          pageSize={pageSize}
                        />
                      ))
                    )}
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

export default PostedJob;
