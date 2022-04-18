import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import UserAvtar from './../../assets/images/profile-img.jpg'
import ConnectIcon from './../../assets/icons/connect.png'
import EditIcon from './../../assets/icons/editicon.png'
import ClockIcon from './../../assets/icons/clock-ico.png'
import AddColeagueModal from "../../components/modals/addColleaguesModal"


const Profile = () => {
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
                    <Link to="#" className="btn edit-btn">
                    Edit Profile</Link>
                    </div>
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
                                  <span className="conn-count">92</span>
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
                          <button type="button" className="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#addColleague"> Add colleague </button>
                          <AddColeagueModal />
                         </div>
                         <div className="jobs-feeds-sec">
                          <div className="jobs-com-profile">
                            <div className="profile-update">
                              <p className="mailto:michael-taylor028@gmail.com">michael-taylor028@gmail.com</p>
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
                         <section className="profile-information-view">
                            <div className="profile-information-coll">
                              <h3>Personal information</h3>
                              <div className="profile-info-list">
                                   <div className="pr-edit-icon"><span>
                                        <img src={EditIcon} alt="icon" /></span></div>
                                   <ul className="info-list-li">
                                   <li><span className="plabel">Age</span> <span className="result">30 years old</span></li>
                                   <li><span className="plabel">Gender </span><span className="result">Male</span></li>
                                   <li><span className="plabel">Qualification</span> <span className="result">Master in bio technology</span></li>
                                   <li>
                                        <span className="plabel">Interested area </span>
                                        <span className="result">
                                        <ul className="tags">
                                        <li>Reading books</li>
                                        <li>Suffering internet</li>
                                        <li>Traveling</li>
                                        </ul>
                                        </span>
                                   </li>
                                   <li><span className="plabel">Time zone </span><span className="result">India (GMT+5:30)</span></li>
                                   <li><span className="plabel">Address </span><span className="result">913 Black Oak Hollow Road, San Jose, California, United States, 95110</span></li>
                                   </ul>
                              </div>
                              </div>
                              </section>
                              <section className="profile-information-view">
                                   <div className="profile-information-coll">
                                   <h3>Professional information</h3>
                                   <div className="profile-info-list">
                                        <div className="pr-edit-icon"><span>
                                             <img src={EditIcon} alt="icon" /></span>
                                        </div>
                                        <ul className="info-list-li">
                                        <li><span className="plabel">Hours / day</span> <span className="result">8 hours / day</span></li>
                                        <li><span className="plabel">Expected salary </span><span className="result">$20 / hours</span></li>
                                        <li><span className="plabel">Experience</span> <span className="result">5 Years</span></li>
                                        <li><span className="plabel">Working</span> <span className="result">Onsite</span></li>
                                        <li><span className="plabel">Education</span> <span className="result">Master in bio technology</span></li>
                                        <li><span className="plabel">College / University</span> <span className="result">university of toronto</span></li>
                                        <li>
                                             <span className="plabel">Resume </span>
                                             <span className="result">
                                             <ul className="tags">
                                             <li>My-resumefile.pdf</li>
                                             </ul>
                                             </span>
                                        </li>
                                        <li>
                                             <span className="plabel">Extra certificates </span>
                                             <span className="result">
                                             <ul className="tags">
                                             <li>Master-of-science.pdf</li>
                                             <li>Certificate of .net technology</li>
                                             </ul>
                                             </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </section>
                <section className="profile-information-view">
                  <div className="Project-information-coll">
                    <h3>Project history</h3>
                    <div className="Project-info-list">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-completed-tab" data-bs-toggle="tab" data-bs-target="#nav-completed" type="button" role="tab" aria-controls="nav-completed" aria-selected="true">Completed</button>
                        <button className="nav-link" id="nav-inprogress-tab" data-bs-toggle="tab" data-bs-target="#nav-inprogress" type="button" role="tab" aria-controls="nav-inprogress" aria-selected="false">In progress</button>
                        <button className="nav-link" id="nav-applied-tab" data-bs-toggle="tab" data-bs-target="#nav-applied" type="button" role="tab" aria-controls="nav-applied" aria-selected="false">Applied</button>
                      </div>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                          <div className="project-detail-list">
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-inprogress" role="tabpanel" aria-labelledby="nav-inprogress-tab">
                        <div className="project-detail-list">
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="nav-applied" role="tabpanel" aria-labelledby="nav-applied-tab">
                        <div className="project-detail-list">
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">JAN 05, 2022 - JAN 15, 2022</span>
                                  <span className="prbudget">With Budget <b>$550</b></span>
                                </div>
                                <div className="prtime">
                                  <span className="complete-pr-time">
                                    <img src={ClockIcon} alt="clock-icon" />
                                  Completed in <b>15 hours</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
     </Layout>
     )
}

export default Profile
