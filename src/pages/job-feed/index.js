import { Link } from "react-router-dom"
import JobCard from "../../components/Job-card"
import Layout from "../../components/Layout"
import UserAvtar from './../../assets/images/profile-img.jpg'
import ConnectIcon from './../../assets/icons/connect.png'
import Filtericon from './../../assets/icons/filter-ico.png'


const JobFeed = () => {
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="complete-kyc">
                         <div className="container">
                              <div className="kyc-update">
                                   <p><i className="fa fa-info-circle" aria-hidden="true"></i> KYC is pending, please click on button and complete your KYC </p>
                                   <button type="button" className="btn submit-kyc" data-bs-toggle="modal" data-bs-target="#kycpopup">Complete KYC</button>
                              </div>
                         </div>
                    </section>
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner">
                                   <div className="banner-edit">
                                        <Link to="#" className="btn edit-btn">Edit</Link>
                                   </div>
                              </div>
                         </div>
                    </section>
                    <section class="job-feeds-wrapper">
                         <div class="container">
                              <div class="profile-feed-inner">
                                   <div class="user-profile-left">
                                        <div class="user-profile-coll">
                                             <div class="user-profile-detail">
                                                  <div class="profile-pic-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                       <span class="profile-img">
                                                            <img src={UserAvtar} alt="user profile" />
                                                       </span>
                                                  </div>
                                                  <h3>Michael Taylor</h3>
                                                  <p>Washington United States</p>
                                             </div>
                                             <div class="profile-connect">
                                                  <div class="profile-con">
                                                       <img src={ConnectIcon} alt="Connect" />
                                                       <span class="conn-count">92</span>
                                                  </div>
                                                  <h4>Available Connects</h4>
                                             </div>
                                             <div class="user-prof-info">
                                                  <ul class="prof-info-ul">
                                                       <li>Experience <span class="result">5+ <sub>YEARS</sub></span></li>
                                                       <li>College / University <span class="result">Toronto</span></li>
                                                       <li>Education <span class="result">M-Bio Sci.</span></li>
                                                       <li>Hours / day <span class="result">8 Hours/day</span></li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="jobs-feeds-sec">
                                        <div class="jobs-com-profile">
                                             <div class="profile-update">
                                                  <ul class="profile-jobs">
                                                       <li><Link to="#"><span class="update-name">Job Applied</span>2</Link></li>
                                                       <li><Link to="#"><span class="update-name">Inprogress</span>1</Link></li>
                                                       <li><Link to="#"><span class="update-name">Completed</span>170</Link></li>
                                                  </ul>
                                             </div>
                                             <div class="profile-strength">
                                                  <div class="profile-strength-inner">
                                                       <h3>Profile strength: <span class="profile-completed">60% Completed</span></h3>
                                                       <div class="profile-strength-bar">
                                                            <p class="profile-progress" style={{'width': '60%'}}></p>
                                                            <div class="profile-complete-bar">
                                                                 <span class="complete-bar completed" style={{'left': '25%'}}></span>
                                                                 <span class="complete-bar completed" style={{'left': '50%'}}></span>
                                                                 <span class="complete-bar" style={{'left': '75%'}}></span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="feeds-search-bar">
                                             <div class="search-bar">
                                                  <form class="form-inline">
                                                       <input class="form-control" type="search" placeholder="Find related Jobs" aria-label="Search" />
                                                       <button class="btn btn-outline-success" type="submit">Search</button>
                                                  </form>
                                             </div>
                                             <div class="feed-filter">
                                                  <button type="button" class="btn filter-btn">
                                                       <img src={Filtericon} alt="Filter icon" />
                                                  </button>
                                             </div>
                                        </div>
                                        <div class="search-feeds-section">
                                             <div class="feed-title">
                                                  <h2>Top results you might like</h2>
                                                  <p>Showing 1-20 of 581 results</p>
                                             </div>
                                             <div class="default-feeds-search">
                                                  <JobCard />
                                                  <JobCard />
                                                  <JobCard />
                                                  <JobCard />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default JobFeed
