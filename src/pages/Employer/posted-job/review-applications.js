import EmployerReviewCard from "../../../components/Employer/reviewListing"
import Layout from "../../../components/Layout"

const ReviewApplications = () => {
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
     )
}

export default ReviewApplications
