import SuggestionCard from "../../../components/Employer/suggestionCard";
import Layout from "../../../components/Layout";
import * as jobServices from "../../../services/jobServices";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader/Loader";

const EmployerJobSuggestion = () => {
  const { jobid } = useParams();
   const [suggestions , setSuggestions]=useState([])
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSuggestions(jobid);
  }, [jobid]);

  const getSuggestions=async (jobid)=>{
    const resp = await jobServices.getStudentListSuggestions({jobId: jobid})
    console.log(resp,"data")
    if (resp.status == 200) {
      setSuggestions(resp.data.data)
      setLoading(false)
    }
  }

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
                      <Loader />
                    ) : suggestions && suggestions.length === 0 ? (
                      <h4>No jobs found</h4>
                    ) : (
                      suggestions &&
                      suggestions.length > 0 &&
                      suggestions.map((data, index) => (
                        <SuggestionCard userData={data} key={index} />
                      ))
                    )}
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EmployerJobSuggestion;
