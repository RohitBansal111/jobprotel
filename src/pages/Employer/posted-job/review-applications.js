import { useEffect } from "react";
import EmployerReviewCard from "../../../components/Employer/reviewListing";
import Layout from "../../../components/Layout";
import * as reviewApplications from "../../../services/studentReviewApplicatonservices";

const ReviewApplications = () => {
  const getReviewApplications = async () => {
    const resp = await reviewApplications.getStudentReviewApplicationData();
    console.log(resp);
  };

  useEffect(() => {
    getReviewApplications();
  }, []);

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
            <h4 className="text-white mb-3">Review Applications</h4>
            <div className="application-list-card mb-5">
              <ul>
                <li>
                  <div className="default-feeds-search">
                    <EmployerReviewCard />
                    <EmployerReviewCard />
                    <EmployerReviewCard />
                    <EmployerReviewCard />
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

export default ReviewApplications;
