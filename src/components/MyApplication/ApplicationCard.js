import { Link } from "react-router-dom"
import CompanyLogo from './../../assets/images/feed-logo.png'
import VerifiedIcon from './../../assets/icons/verify.png'
import LocationIcon from './../../assets/icons/loc-ico.png'
import ChatIcon from './../../assets/icons/chat-icon.png'

const ApplicationCards = () => {
     return (
          <>
               <div className="feeds-search-coll">
                    <div className="feeds-search-head">
                         <div className="feeds-head-left">
                              <div className="feeds-s-logo">
                                   <img src={CompanyLogo} alt="Company Logo" />
                              </div>
                              <div className="feeds-s-name">
                                   <h2><Link to="#">Fullstack project assessment &amp; advice </Link></h2>
                                   <ul className="feeds-s-ul">
                                        <li><img src={LocationIcon} alt="Location" />United States</li>
                                        <li><img src={VerifiedIcon} alt="Company Verified" />Verified post</li>
                                   </ul>
                              </div>
                         </div>
                         <div className="feeds-budget">
                              <p>Est. Budget</p>
                              <span className="project-budget">$550</span>
                         </div>
                    </div>
                    <div className="feeds-search-detail">
                         <p>We have a new project we might consider outsourcing. We need to hear some full stacks experts regarding the difficulty of such project, cost esitmations, and required skills. This job will be fast - a conversation. ------------------ About the project in a nutshell. <Link to="#">See more </Link></p>
                         <div className="application-tag-status">
                              <div className="feeds-tags">
                                   <ul className="feeds-ul">
                                        <li><Link to="#">API </Link></li>
                                        <li><Link to="#">Web Application </Link></li>
                                        <li><Link to="#">Wearable Technology </Link></li>
                                   </ul>
                              </div>
                              <div className="application-status">
                                   <span className="status-pending">Pending</span>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="feeds-search-coll">
                    <div className="feeds-search-head">
                         <div className="feeds-head-left">
                              <div className="feeds-s-logo">
                                   <img src={CompanyLogo} alt="Company Logo" />
                              </div>
                              <div className="feeds-s-name">
                                   <h2><Link to="#">Fullstack project assessment &amp; advice </Link></h2>
                                   <ul className="feeds-s-ul">
                                        <li><img src={LocationIcon} alt="Location" />United States</li>
                                        <li><img src={VerifiedIcon} alt="Company Verified" />Verified post</li>
                                   </ul>
                              </div>
                         </div>
                         <div className="feeds-budget">
                              <p>Est. Budget</p>
                              <span className="project-budget">$550</span>
                         </div>
                    </div>
                    <div className="feeds-search-detail">
                         <p>We have a new project we might consider outsourcing. We need to hear some full stacks experts regarding the difficulty of such project, cost esitmations, and required skills. This job will be fast - a conversation. ------------------ About the project in a nutshell. <Link to="#">See more </Link></p>
                         <div className="application-tag-status">
                              <div className="feeds-tags">
                                   <ul className="feeds-ul">
                                        <li><Link to="#">API </Link></li>
                                        <li><Link to="#">Web Application </Link></li>
                                        <li><Link to="#">Wearable Technology </Link></li>
                                   </ul>
                              </div>
                              <div className="application-status">
                                   <span className="status-approved">Approved</span>
                                   <button type="button" className="btn btn-chatNow">
                                        <img src={ChatIcon} alt="Chat Now" />
                                        Chat Now
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="feeds-search-coll">
                    <div className="feeds-search-head">
                         <div className="feeds-head-left">
                              <div className="feeds-s-logo">
                                   <img src={CompanyLogo} alt="Company Logo" />
                              </div>
                              <div className="feeds-s-name">
                                   <h2><Link to="#">Fullstack project assessment &amp; advice </Link></h2>
                                   <ul className="feeds-s-ul">
                                        <li><img src={LocationIcon} alt="Location" />United States</li>
                                        <li><img src={VerifiedIcon} alt="Company Verified" />Verified post</li>
                                   </ul>
                              </div>
                         </div>
                         <div className="feeds-budget">
                              <p>Est. Budget</p>
                              <span className="project-budget">$550</span>
                         </div>
                    </div>
                    <div className="feeds-search-detail">
                         <p>We have a new project we might consider outsourcing. We need to hear some full stacks experts regarding the difficulty of such project, cost esitmations, and required skills. This job will be fast - a conversation. ------------------ About the project in a nutshell. <Link to="#">See more </Link></p>
                         <div className="application-tag-status">
                              <div className="feeds-tags">
                                   <ul className="feeds-ul">
                                        <li><Link to="#">API </Link></li>
                                        <li><Link to="#">Web Application </Link></li>
                                        <li><Link to="#">Wearable Technology </Link></li>
                                   </ul>
                              </div>
                              <div className="application-status">
                                   <span className="status-rejected">Rejected</span>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default ApplicationCards
