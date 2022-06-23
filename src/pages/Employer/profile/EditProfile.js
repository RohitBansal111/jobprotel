import { Field, Form } from "react-final-form"
import Layout from "../../../components/Layout"
import UserAvtar from './../../../assets/images/profile-img.jpg'
import ConnectIcon from './../../../assets/icons/connect.png'
import badgeCrossIcon from './../../../assets/icons/badge-closeicon.png'
import validate from "./validator/profileValidate"
import { renderField, RenderRadioButtonField, RenderFileUploadField, renderSelect } from './../../../components/renderField'
import { RenderImageField } from "../../../components/file-input"

const EmployerEditProfile = () => {
     const saveProfile = (values) => {
          console.log(values)
     }
     
     return (
          <Layout>
               <div className="inner-page-wrapper">
                    <section className="topbg-banner">
                         <div className="container">
                              <div className="innerbg-banner">
                                   <div className="banner-edit">
                                        {/* <Link to="#" className="btn edit-btn">Edit Profile</Link> */}
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

     <Form
          onSubmit={saveProfile}
          validate={validate}
          >
               {({handleSubmit, submitting, values})=>(
               <form onSubmit={handleSubmit}> 
                    <section className="profile-information-view">
                         <div className="profile-information-coll">
                              <h3>Personal information</h3>
                              <div className="profile-edit-info-list">
                                   <div className="form-field-group">
                                        <div className="form-field flex50">
                                             <Field name="firstname" label="First name" placeholder="Enter first name" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="lastname" label="Last name" placeholder="Enter last name" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="age" label="Age" placeholder="Enter age" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <label htmlFor="gender"> Gender </label> 
                                             <div className="radio-button-groupss">
                                                  <Field label="Male" name="gender" value="Male" component={RenderRadioButtonField} type="radio">
                                                       Male
                                                  </Field>
                                                  <Field label="Female" name="gender" value="Female" component={RenderRadioButtonField} type="radio">
                                                       Female
                                                  </Field>
                                             </div>
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="email" placeholder="Enter email Address" label="Email Address" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="timeZone" label="Timezone" component={renderSelect}>  
                                                  <option defaultValue="">Select timezone</option>
                                                  <option value="1">India (GMT+5:30)</option>
                                                  <option value="2">India (GMT+5:30)</option>
                                                  <option value="3">India (GMT+5:30)</option>
                                             </Field>
                                        </div>
                                        <div className="form-field flex100">
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
                                        <div className="form-field flex50">
                                             <Field name="houseno" placeholder="Enter H. No. / village / street" label="H. No. / Village / Street" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="city" placeholder="city" label="City" component={renderSelect}>
                                                  <option defaultValue="">City</option>
                                                  <option value="New York">New York</option>
                                                  <option value="Bergingam">Bergingam</option>
                                                  <option value="Los Angales">Los Angales</option>
                                             </Field>
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="state" placeholder="state" label="State" component={renderSelect}>
                                                  <option defaultValue="">State</option>
                                                  <option value="New York">New York</option>
                                                  <option value="Bergingam">Bergingam</option>
                                                  <option value="Los Angales">Los Angales</option>
                                             </Field>
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="state" placeholder="state" label="State" component={renderSelect}>
                                                  <option defaultValue="">State</option>
                                                  <option value="New York">New York</option>
                                                  <option value="Bergingam">Bergingam</option>
                                                  <option value="Los Angales">Los Angales</option>
                                             </Field>
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="pin" placeholder="Enter pin" label="PIN" component={renderField} />
                                        </div>
                                        <div className="form-field flex100">
                                             <div className="form-field flex100">
                                                  <Field name="uploadPhoto2" label="Photo" component={RenderImageField} type="file" />
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
                                   <div className="form-field-group">
                                        <div className="form-field flex50">
                                             <Field name="hours" placeholder="Hours" label="Hours / day" component={renderSelect}> 
                                                  <option defaultValue="">Select hours</option>
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                             </Field>
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="salary" placeholder="Enter expected salary" label="Expected salary" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="experience" placeholder="Enter experience" label="Total Experience" component={renderField} />
                                        </div>
                                        <div className="form-field flex50">
                                             <Field name="working" placeholder="Enter working (onsite/offsite)" label="Working" component={renderField} />
                                        </div>
                                        <div className="form-field flex100">
                                             <Field name="resume" label="Resume" uploadLabel="Browse resume file" component={RenderFileUploadField} type="text" />
                                        </div>
                                        <div className="form-field flex100">
                                             <Field name="documents" label="Extra Certificates" uploadLabel="Browse documents" component={RenderFileUploadField} type="text" />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
                    <section className="profile-information-view">
                        <div className="profile-information-coll">
                            <h3>Skill</h3>
                            <div className="profile-edit-info-list">
                              <div className="form-field flex100">
                                   <Field name="skills" placeholder="skill" label="Add Skills" component={renderSelect}>
                                             <option defaultValue="">Add More Skill</option>
                                             <option value="Html">Html</option>
                                             <option value="Css">Css</option> 
                                   </Field>
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
                                        <img src={badgeCrossIcon} alt="close icon" />
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
                    </section>
                    <div className="form-field flex100 mb-5 d-flex justify-content-end">
                         <button type="button" className="btn btn-save btn-primary">Update</button>
                    </div>
               </form>
          )}
          </Form>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
          </Layout>
     )
}

export default EmployerEditProfile
