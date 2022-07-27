import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import ApplicationCards from "../../components/MyApplication/ApplicationCard";
import Filtericon from "./../../assets/icons/filter-ico.png";
import * as jobsAppliedServices from "../../services/jobsAppliedServices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import toast from "toastr";

const MyApplications = () => {
  const authData = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [jobsApplied, setJobsApplied] = useState([]);

  const getAppliedJobs = async (id, activePage = activePage, search) => {
    let data = {
      userId: id,
      serachItem: search,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    const resp = await jobsAppliedServices.getAppliedJobsByUserId(data);
    if (resp.status === 200) {
      let response = resp.data.data;
       console.log(response);
      setLoading(false);
      setTotalRecords(resp.data.totalCount);
      if (response.jobs.length > 0) {
        setJobsApplied(response);
      }
    }else {
     setLoading(false);
     toast.error("Something went wrong");
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    getAppliedJobs(authData.id, pageNumber);
  };

  useEffect(() => {
    if (authData) {
      getAppliedJobs(authData.id, activePage);
    }
  }, [authData]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    getAppliedJobs(authData.id, activePage, search);
  };

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner">
            </div>
          </div>
        </section>
        <section className="job-feeds-wrapper">
          <div className="container">
            <div className="profile-feed-inner">
              <div className="jobs-feeds-sec">
                <div className="jobs-com-profile">
                  <div className="profile-update">
                    <ul className="profile-jobs">
                      <li>
                        <Link to="#">
                          <span className="update-name">
                            Job Applied: &nbsp;
                          </span>
                          {totalRecords && totalRecords}
                        </Link>
                      </li>
                    </ul>
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
                <div className="feeds-search-bar">
                  <div className="search-bar">
                    <form className="form-inline" onSubmit={handleSearch}>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Find related Jobs"
                        aria-label="Search"
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
                    {jobsApplied?.jobs?.length > 0 ?
                    <>
                    <h2>Top results you might like</h2>
                    <p>
                      Showing{" "}
                      {activePage == 1
                        ? activePage
                        : 1 + (activePage - 1) * pageSize}
                      -
                      {jobsApplied?.jobs?.length
                        ? (activePage - 1) * pageSize + jobsApplied?.jobs?.length
                        : 0}{" "}
                      of {totalRecords} results
                    </p>
                    </>
                    : null
                  }
                  </div>
                  {loading ? (
                    <div className="fullpage-loader py-5"> <Loader /> </div>
                  ) : (
                    jobsApplied?.jobs?.length > 0 ?
                    <div className="default-feeds-search">
                      <ApplicationCards
                        handlePageChange={handlePageChange}
                        activePage={activePage}
                        pageSize={pageSize}
                        totalRecords={totalRecords}
                        jobsApplied={jobsApplied}
                      />
                    </div>
                    : <h1>No applied jobs found</h1>
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

export default MyApplications;
