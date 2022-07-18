import SuggestionCard from "../../../components/Employer/suggestionCard";
import Layout from "../../../components/Layout";

const EmployerJobSuggestion = () => {
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
                    <SuggestionCard />
                    <SuggestionCard />
                    <SuggestionCard />
                    <SuggestionCard />
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
