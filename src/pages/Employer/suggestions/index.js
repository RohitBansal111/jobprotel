import SuggestionCard from "../../../components/Employer/suggestionCard";
import Layout from "../../../components/Layout";
import * as jobServices from "../../../services/jobServices";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import Pagination from "react-js-pagination";

const EmployerJobSuggestion = () => {
  const { jobid } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    getSuggestions(jobid);
  }, [jobid]);

  const getSuggestions = async (jobid) => {
    let data = {
      jobId: jobid,
      pageNumber: activePage,
      pageSize: pageSize,
    };
    const resp = await jobServices.getStudentListSuggestions(data);
    if (resp.status == 200) {
      setSuggestions(resp.data.data);
      // console.log(resp.data.data, "::::")
      setLoading(false);
    } else if (resp.status == 400) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setLoading(true);
    if (jobid) {
      getSuggestions(jobid, pageNumber);
    }
  };

  return (
    <Layout>
      <div className="inner-page-wrapper">
        <section className="topbg-banner">
          <div className="container">
            <div className="innerbg-banner"></div>
          </div>
        </section>
        <section className="job-feeds-wrapper">
          <div className="container">
            <h4 className="text-white mb-3">Suggestion for this job</h4>
            <div className="application-list-card mb-5">
              <ul>
                <li>
                  <div className="default-feeds-search">
                    {loading ? (
                      <div className="fullpage-loader py-5">
                        {" "}
                        <Loader />{" "}
                      </div>
                    ) : suggestions?.length === 0 ? (
                      <h4>No suggestions found</h4>
                    ) : (
                      suggestions?.length > 0 &&
                      suggestions.map((data, index) => (
                        <SuggestionCard
                          userData={data}
                          key={index}
                          jobId={jobid}
                          userIdd={data?.userId}
                        />
                      ))
                    )}
                  </div>
                </li>
              </ul>
            </div>

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
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmployerJobSuggestion;
