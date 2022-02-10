import { Link } from "react-router-dom"
import CompanyLogo from './../assets/images/feed-logo.png'
import VerifiedIcon from './../assets/icons/verify.png'
import LocationIcon from './../assets/icons/loc-ico.png'
import ClockIcon from './../assets/icons/clock-ico.png'

const ReviewListing = () => {
     return (
          <div className="feeds-search-coll">
               <div className="feeds-search-head">
                    <div className="feeds-head-left">
                         <div className="feeds-s-logo">
                              <img src={CompanyLogo} alt="Company Logo" />
                         </div>
                         <div className="feeds-s-name">
                              <h2><Link to="#"> Rahul Singh</Link> <span className="desgination">(FrontEnd Developer)</span> </h2>
                              <ul className="feeds-s-ul">
                                   <li><img src={LocationIcon} alt="Location" />United States</li>
                                   <li><img src={VerifiedIcon} alt="Company Verified" />Verified post</li>
                              </ul>
                         </div>
                    </div>
                    <div className="review-listing-action">
                         <button type="button" className="btn btn-primary mr-2">Accept</button>
                         <button type="button" className="btn btn-reject">Reject</button>
                    </div>
               </div>
               <div className="feeds-search-detail">
                    <p>We have a new project we might consider outsourcing. We need to hear some full stacks experts regarding the difficulty of such project, cost esitmations, and required skills. This job will be fast - a conversation. ------------------ About the project in a nutshell. <Link to="#">See more </Link></p>
               </div>
          </div>
     )
}

export default ReviewListing
