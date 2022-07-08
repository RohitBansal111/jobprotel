import { Link } from "react-router-dom"
import JobCard from "../../../components/Job-card"
import Layout from "../../../components/Layout"
import UserAvtar from './../../../assets/images/profile-img.jpg'
import ConnectIcon from './../../../assets/icons/connect.png'
import Filtericon from './../../../assets/icons/filter-ico.png'



const Applications = () => {
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
                                   <div className="user-profile-left">
                                        <div className="user-profile-coll">
                                             <div className="user-profile-detail">
                                                  <div className="profile-pic-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                       <span className="profile-img">
                                                            <img src={UserAvtar} alt="user profile" />
                                                       </span>
                                                  </div>
                                                  <h3>Michael Taylor</h3>
                                                  <p>Washington United States</p>
                                             </div>
                                             <div className="profile-connect">
                                                  <div className="profile-con">
                                                       <img src={ConnectIcon} alt="Connect" />
                                                       <span className="conn-count">20</span>
                                                  </div>
                                                  <h4>Available Connects</h4>
                                             </div>
                                             <div className="user-prof-info">
                                                  <ul className="prof-info-ul">
                                                       <li>Experience <span className="result">5+ Years</span></li>
                                                       <li>College / University <span className="result">Toronto</span></li>
                                                       <li>Education <span className="result">M-Bio Sci.</span></li>
                                                       <li>Hours / day <span className="result">8 Hours/day</span></li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="jobs-feeds-sec">
                                        <div className="jobs-com-profile">
                                             <div className="profile-update">
                                                  <ul className="profile-jobs">
                                                       <li><Link to="#"><span className="update-name">Posted Job: &nbsp;</span>2</Link></li>
                                                       {/* <li><Link to="#"><span className="update-name">Inprogress</span>1</Link></li>
                                                       <li><Link to="#"><span className="update-name">Completed</span>170</Link></li> */}
                                                  </ul>
                                             </div>
                                             <div className="profile-strength">
                                                  <div className="profile-strength-inner">
                                                       <h3>Profile strength: <span className="profile-completed">60% Completed</span></h3>
                                                       <div className="profile-strength-bar">
                                                            <p className="profile-progress" style={{'width': '60%'}}></p>
                                                            <div className="profile-complete-bar">
                                                                 <span className="complete-bar completed" style={{'left': '25%'}}></span>
                                                                 <span className="complete-bar completed" style={{'left': '50%'}}></span>
                                                                 <span className="complete-bar" style={{'left': '75%'}}></span>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="feeds-search-bar">
                                             <div className="search-bar">
                                                  <form className="form-inline">
                                                       <input className="form-control" type="search" placeholder="Find related Jobs" aria-label="Search" />
                                                       <button className="btn btn-outline-success" type="submit">Search</button>
                                                  </form>
                                             </div>
                                             <div className="feed-filter">
                                                  <button type="button" className="btn filter-btn">
                                                       <img src={Filtericon} alt="Filter icon" />
                                                  </button>
                                             </div>
                                        </div>
                                        <div className="search-feeds-section">
                                             <div className="feed-title">
                                                  <h2>Top results you might like</h2>
                                                  <p>Showing 1-20 of 581 results</p>
                                             </div>
                                             <div className="default-feeds-search">
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

export default Applications
