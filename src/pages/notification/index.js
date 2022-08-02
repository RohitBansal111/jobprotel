import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import UserAvtar from "./../../assets/images/profile-img.jpg";
import LocationIcon from "./../../assets/icons/loc-ico.png";

const Notification = () => {
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
                              <h4 className="text-white mb-3">Notification</h4>
                              <div className="Notification-list text-white default-feeds-search">
                                   <div className="feeds-search-coll">
                                        <div className="feeds-search-head">
                                             <div className="feeds-head-left">
                                                  <div className="feeds-s-logo">
                                                  <Link to="/public">
                                                       <img
                                                       src={UserAvtar}
                                                       style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                                                       alt="profile"
                                                       />{" "}
                                                  </Link>
                                                  </div>
                                                  <div className="feeds-s-name pe-4">
                                                       <h2><Link to="/public"> Rahul Singh</Link>{" "}</h2>
                                                       <ul className="feeds-s-ul  mb-2">
                                                            <li>
                                                                 <img src={LocationIcon} alt="Location" />
                                                                 New Delhi
                                                            </li>
                                                       </ul>
                                                       <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                                                  </div>
                                             </div>
                                             <div className="review-listing-action">
                                                  <button type="button"className="btn btn-primary me-2">
                                                       Accepted
                                                  </button>
                                                  <button type="button"className="btn btn-reject">
                                                       Rejected
                                                  </button>
                                             </div>
                                        </div>
                                        <div className="feeds-search-head">
                                             <div className="feeds-head-left">
                                                  <div className="feeds-s-logo">
                                                  <Link to="/public">
                                                       <img
                                                       src={UserAvtar}
                                                       style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                                                       alt="profile"
                                                       />{" "}
                                                  </Link>
                                                  </div>
                                                  <div className="feeds-s-name pe-4">
                                                       <h2><Link to="/public"> Rahul Singh</Link>{" "}</h2>
                                                       <ul className="feeds-s-ul mb-2">
                                                            <li>
                                                                 <img src={LocationIcon} alt="Location" />
                                                                 New Delhi
                                                            </li>
                                                       </ul>
                                                       <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                                                  </div>
                                             </div>
                                             <div className="review-listing-action">
                                                  <button type="button"className="btn btn-primary me-2">
                                                       Accepted
                                                  </button>
                                                  <button type="button"className="btn btn-reject">
                                                       Rejected
                                                  </button>
                                             </div>
                                        </div>
                                        <div className="feeds-search-head">
                                             <div className="feeds-head-left">
                                                  <div className="feeds-s-logo">
                                                  <Link to="/public">
                                                       <img
                                                       src={UserAvtar}
                                                       style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                                                       alt="profile"
                                                       />{" "}
                                                  </Link>
                                                  </div>
                                                  <div className="feeds-s-name pe-4">
                                                       <h2><Link to="/public"> Rahul Singh</Link>{" "}</h2>
                                                       <ul className="feeds-s-ul mb-2">
                                                            <li>
                                                                 <img src={LocationIcon} alt="Location" />
                                                                 New Delhi
                                                            </li>
                                                       </ul>
                                                       <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                                                  </div>
                                             </div>
                                             <div className="review-listing-action">
                                                  <button type="button"className="btn btn-primary me-2">
                                                       Accepted
                                                  </button>
                                                  <button type="button"className="btn btn-reject">
                                                       Rejected
                                                  </button>
                                             </div>
                                        </div>
                                        <div className="feeds-search-detail">
                                        </div>
                                        {/* <div>
                                             {totalRecords > 0 && (
                                             <Pagination
                                             activePage={activePage}
                                             itemsCountPerPage={pageSize}
                                             totalItemsCount={totalRecords}
                                             pageRangeDisplayed={4}
                                             onChange={handlePageChangeReview}
                                             />
                                             )}
                                        </div> */}
                                        </div>
                              </div>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default Notification
