import Layout from "../../../components/Layout"
import ConnectIcon from './../../../assets/icons/connect.png'
import EditIcon from './../../../assets/icons/editicon.png'
import ClockIcon from './../../../assets/icons/clock-ico.png'
import CompanyProfile from './../../../assets/images/company-logo.png'
import CompanyInfoModal from "../../../components/modals/companyInfoModal"
import { Link } from "react-router-dom"

const EmployerProfile = () => {
return (
        <Layout>
          <div className="inner-page-wrapper">
               <section className="topbg-banner">
                <div className="container">
                  <div className="innerbg-banner">
                    <div className="banner-edit">
                   
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
                                                  <img src={CompanyProfile} alt="Company profile" />
                                              </span>
                                        </div>
                                        <h3>Eminence Technology</h3>
                                        <p>Sector 72, Sahibzada Ajit Singh Nagar, Punjab</p>
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
                                              <li>Recruiting Manager <span className="result">Akshika Singh</span></li>
                                              <li>Contact Number <span className="result">+91-9315189662</span></li>
                                        </ul>
                                    </div>
                              </div>
                          </div>
                         <div className="jobs-feeds-sec">
                          <div className="jobs-com-profile">
                            <div className="profile-update">
                              {/* <p className="mailto:michael-taylor028@gmail.com">info@eminencetechnology.com</p> */}
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
                              <div className="profile-card-head">
                                <h3>Personal Information</h3>
                              </div>
                              <div className="profile-info-list">
                                   <ul className="info-list-li">
                                    <li><span className="plabel">Name</span> <span className="result">Rahul Nair</span></li>
                                    <li><span className="plabel">Email ID </span><span className="result">rahulnair.eminence@gmail.com</span></li>
                                   </ul>
                              </div>
                            </div>
                          </section>
                          <section className="profile-information-view">
                            <div className="profile-information-coll">
                              <div className="profile-card-head">
                                <h3>Company Information</h3>
                                <div className="pr-edit-icon">
                                    <button type="button" className="btn-edit" data-bs-toggle="modal" data-bs-target="#companyInfo"><img src={EditIcon} alt="icon" /></button>
                                </div>
                              </div>
                              <div className="profile-info-list">
                             
                              <CompanyInfoModal />
                              <ul className="info-list-li">
                                <li><span className="plabel">Recruiting Manager</span><span className="result">Akshika Singh</span></li>
                                <li><span className="plabel">Contact Number</span> <span className="result">+91-9315189662</span></li>
                                <li><span className="plabel">Company Address</span> <span className="result">Sector 72, Sahibzada Ajit Singh Nagar, Punjab</span></li>
                            </ul>
                          </div>
                        </div>
                      </section>
                      <section className="profile-information-view">
                  <div className="Project-information-coll">
                    <div className="profile-card-head">
                      <h3>Jobs history</h3>
                    </div>
                    <div className="Project-info-list">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-completed-tab" data-bs-toggle="tab" data-bs-target="#nav-completed" type="button" role="tab" aria-controls="nav-completed" aria-selected="true">Active Jobs</button>
                        <button className="nav-link" id="nav-inprogress-tab" data-bs-toggle="tab" data-bs-target="#nav-inprogress" type="button" role="tab" aria-controls="nav-inprogress" aria-selected="false">Archive Jobs</button>
                      </div>
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                          <div className="project-detail-list">
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><Link className="page-link" to="/">Prev</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                                <li className="page-item active"><Link className="page-link" to="/">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">Next</Link></li>
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
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><Link className="page-link" to="/">Prev</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                                <li className="page-item active"><Link className="page-link" to="/">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">Next</Link></li>
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
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-dbox">
                              <h2 className="prname">Fullstack project assessment &amp; advice</h2>
                              <div className="prd-buget-column">
                                <div className="prdate-budgetprice">
                                  <span className="prdate">July 05, 2022 - Aug 15, 2022</span>
                                  {/* <span className="prbudget">With Budget <b>$550</b></span> */}
                                </div>
                              </div>
                            </div>
                            <div className="project-pagination">
                              <ul className="pagination">
                                <li className="page-item"><Link className="page-link" to="/">Prev</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                                <li className="page-item active"><Link className="page-link" to="/">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">Next</Link></li>
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

export default EmployerProfile
