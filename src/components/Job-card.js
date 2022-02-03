import { Link } from "react-router-dom"
import CompanyLogo from './../assets/images/feed-logo.png'
import VerifiedIcon from './../assets/icons/verify.png'
import LocationIcon from './../assets/icons/loc-ico.png'
import ClockIcon from './../assets/icons/clock-ico.png'

const JobCard = () => {
     return (
          <>
               <div class="feeds-search-coll">
                    <div class="feeds-search-head">
                         <div class="feeds-head-left">
                              <div class="feeds-s-logo">
                                   <img src={CompanyLogo} alt="Company Logo" />
                              </div>
                              <div class="feeds-s-name">
                                   <h2><Link to="#">Fullstack project assessment &amp; advice </Link></h2>
                                   <ul class="feeds-s-ul">
                                        <li><img src={LocationIcon} alt="Location" />United States</li>
                                        <li><img src={VerifiedIcon} alt="Company Verified" />Verified post</li>
                                   </ul>
                              </div>
                         </div>
                         <div class="feeds-budget">
                              <p>Est. Budget</p>
                              <span class="project-budget">$550</span>
                         </div>
                    </div>
                    <div class="feeds-search-detail">
                         <p>We have a new project we might consider outsourcing. We need to hear some full stacks experts regarding the difficulty of such project, cost esitmations, and required skills. This job will be fast - a conversation. ------------------ About the project in a nutshell. <Link to="#">See more </Link></p>
                         <div class="feeds-tags">
                              <ul class="feeds-ul">
                                   <li><Link to="#">API </Link></li>
                                   <li><Link to="#">Web Application </Link></li>
                                   <li><Link to="#">Wearable Technology </Link></li>
                              </ul>
                         </div>
                         <div class="posted-submit">
                              <p class="post-ago">
                                   <img src={ClockIcon} alt="clock" /> Posted 30 mints ago</p>
                              <button type="button" class="btn submit-btn">Apply</button>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default JobCard
