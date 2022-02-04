import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import UserAvtar from './../../assets/images/profile-img.jpg'
import ConnectIcon from './../../assets/icons/connect.png'
import badgeCrossIcon from './../../assets/icons/badge-closeicon.png'
import StudentAvtar from './../../assets/images/student-img.jpg'
import CrossIcon from './../../assets/icons/cross-btn.png'

const EditProfile = () => {
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
                                        <Link to="#" className="btn edit-btn">Edit Profile</Link>
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
                              <div className="profile-edit-info-list">
                                   <div className="inner-form-block">
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>First name</label>
                                        <input type="text" className="form-control" value="Michael" />
                                        </div>
                                        <div className="form-group">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" value="Taylor" />
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Age</label>
                                        <input type="text" className="form-control" value="30 Years" />
                                        </div>
                                        <div className="form-group">
                                        <label>Gender</label>
                                        <div className="custom-check">
                                        <label className="custom-check-box">Male
                                        <input type="radio" name="gender" checked="checked" />
                                        <span className="radiobtn"></span>
                                        </label>
                                        <label className="custom-check-box">Female
                                        <input type="radio" name="gender" />
                                        <span className="radiobtn"></span>
                                        </label>
                                        </div>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Email address</label>
                                        <input type="text" className="form-control" placeholder="Enter email address" />
                                        </div>
                                        <div className="form-group">
                                        <label>Timezone</label>
                                        <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">Select timezone</option>
                                        <option value="1">India (GMT+5:30)</option>
                                        <option value="2">India (GMT+5:30)</option>
                                        <option value="3">India (GMT+5:30)</option>
                                        </select>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Interested area</label>
                                        <div className="Interested-areabox">
                                        <div className="addskill-badge">
                                             <span className="badge badge-primary">
                                             Reading Books
                                             <button type="button" className="close" aria-label="Dismiss">
                                             <img src={badgeCrossIcon} alt="close icon" />
                                             </button>
                                             </span>
                                             <span className="badge badge-primary">
                                             Suffering internet
                                             <button type="button" className="close" aria-label="Dismiss">
                                             <img src={badgeCrossIcon} alt="close icon" />
                                             </button>
                                             </span>
                                             <span className="badge badge-primary">
                                             Traveling
                                             <button type="button" className="close" aria-label="Dismiss">
                                             <img src={badgeCrossIcon} alt="close icon" />
                                             </button>
                                             </span>
                                        </div>
                                        </div>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>H. No. / Village / Street</label>
                                        <input type="text" className="form-control" value="1592 Pratt Avenue" />
                                        </div>
                                        <div className="form-group">
                                        <label>City</label>
                                        <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">City</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        </select>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>State</label>
                                        <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">State</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        </select>
                                        </div>
                                        <div className="form-group">
                                        <label>Country</label>
                                        <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">Country</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        <option value="Silverdale">Silverdale</option>
                                        </select>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Pin</label>
                                        <input type="text" className="form-control" value="95713" />
                                        </div>
                                        <div className="form-group">
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>photo</label>
                                        <div className="upload-image">
                                        <div className="upload-btn">
                                             <input type="file" id="upload" hidden="" />
                                             <label className="upload-file" for="upload"><i className="fa fa-upload" aria-hidden="true"></i> Browse Photo</label>
                                        </div>
                                        <div className="student-image">
                                             <img src={StudentAvtar} alt="" />
                                        </div>
                                        </div>
                                        </div>
                                   </div>
                                   </div>
                              </div>
                              </div>
                              </section>
                    <section className="profile-information-view">
                         <div className="profile-information-coll">
                              <h3>Professional information</h3>
                              <div className="profile-edit-info-list">
                                   <div className="inner-form-block">
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Hours / day</label>
                                        <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">Select hours</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                        <option value="3">5</option>
                                        <option value="3">6</option>
                                        <option value="3">7</option>
                                        <option value="3">8</option>
                                        <option value="3">9</option>
                                        <option value="3">10</option>
                                        </select>
                                        </div>
                                        <div className="form-group">
                                        <label>Expected salary</label>
                                        <input type="text" className="form-control" value="$20 / hours" />
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Experience</label>
                                        <input type="text" className="form-control" value="5 Years" />
                                        </div>
                                        <div className="form-group">
                                        <label>Working</label>
                                        <input type="text" className="form-control" value="OnSite" />
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group">
                                        <label>Education</label>
                                        <input type="text" className="form-control" value="Master in bio technology" />
                                        </div>
                                        <div className="form-group">
                                        <label>Collage/University</label>
                                        <input type="text" className="form-control" value="University of toronto" />
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group file-full">
                                        <label>Resume</label>
                                        <div className="upload-btn">
                                        <input type="file" id="upload" hidden="" />
                                        <label className="upload-file" for="upload"><i className="fa fa-upload" aria-hidden="true"></i> Browse resume file</label>
                                        </div>
                                        <div className="uploaded-file">
                                        <p>my_resume.pdf <span className="cross"><img src={CrossIcon} alt="" /></span></p>
                                        </div>
                                        </div>
                                   </div>
                                   <div className="form-row">
                                        <div className="form-group file-full">
                                        <label>Resume</label>
                                        <div className="upload-btn">
                                        <input type="file" id="upload" hidden="" />
                                        <label className="upload-file" for="upload"><i className="fa fa-upload" aria-hidden="true"></i> Browse Documents</label>
                                        </div>
                                        <div className="uploaded-file">
                                        <p>Bachelor_of_Science.pdf <span className="cross"><img src={CrossIcon} alt="" /></span></p>
                                        <p>Master_of_Bio_Science.pdf <span className="cross"><img src={CrossIcon} alt="" /></span></p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    </div>
               </section>
               <section className="profile-information-view">
                        <div className="profile-information-coll">
                            <h3>Skill</h3>
                            <div className="profile-edit-info-list">
                             <div className="form-row">
                                <div className="form-group">
                                   <label>Add Skill</label>
                                   <select className="form-control form-select" aria-label="Default select example">
                                        <option selected="">Add More Skill</option>
                                        <option value="Html">Html</option>
                                        <option value="Css">Css</option> 
                                   </select>
                              </div>
                              <div className="addskill-badge">
                                   <span className="badge badge-primary">
                                        HTML-5
                                        <button type="button" className="close" aria-label="Dismiss">
                                        <img src={badgeCrossIcon} alt="close icon" />
                                        </button>
                                   </span>
                                   <span className="badge badge-primary">
                                        Photoshop
                                        <button type="button" className="close" aria-label="Dismiss">
                                        <img src={badgeCrossIcon} alt="close icon" />
                                        </button>
                                   </span>
                                   <span className="badge badge-primary">
                                        Javascript
                                        <button type="button" className="close" aria-label="Dismiss">
                                        <img src={StudentAvtar} alt="close icon" />
                                        </button>
                                   </span>
                                   <span className="badge badge-primary">
                                        .net technology
                                        <button type="button" className="close" aria-label="Dismiss">
                                        <img src={badgeCrossIcon} alt="close icon" />
                                        </button>
                                   </span>
                                   <span className="badge badge-primary">
                                        Social Media
                                        <button type="button" className="close" aria-label="Dismiss">
                                        <img src={badgeCrossIcon} alt="close icon" />
                                        </button>
                                   </span>
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

export default EditProfile
