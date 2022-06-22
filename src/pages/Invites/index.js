import { Link } from "react-router-dom"
import InviteCard from "../../components/Invite/InviteCard"
import Layout from "../../components/Layout"
import Filtericon from './../../assets/icons/filter-ico.png'

const Invites = () => {
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner">
                                   {/* <div className="banner-edit">
                                        <Link to="#" className="btn edit-btn">Edit</Link>
                                   </div> */}
                              </div>
                         </div>
                    </section>
                    <section className="job-feeds-wrapper">
                         <div className="container">
                              <div className="profile-feed-inner">
                                   <div className="jobs-feeds-sec">
                                        <div className="jobs-com-profile">
                                             <div className="profile-update">
                                                  <ul className="profile-jobs">
                                                       <li><Link to="#"><span className="update-name">Job Applied: &nbsp;</span>2</Link></li>
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
                                                  <InviteCard />
                                                  <InviteCard />
                                                  <InviteCard />
                                                  <InviteCard />
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

export default Invites
