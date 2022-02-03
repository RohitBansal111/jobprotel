import { Field, Form } from "react-final-form"
import LocalizedStrings from 'react-localization';
import Logo from './../../assets/images/logo.png'
import validate from "./forgotPasswordValidator";
import { renderField } from "../../components/renderField";
import titles from './forgot-password.json'
import { Link } from "react-router-dom"; 

const ForgotPassword = () => {
     let titleStrings = new LocalizedStrings(titles)
     const handleForgotPassword = () =>{

     }
     return (
          <div className="page-wrapper">
               <div className="register-page-main">
                    <div className="register-sidebar">
                         <div className="register-info-steps justify-content-start">
                              <div className="brand-media">
                                   <img src={Logo} alt="Real Job" />
                              </div>
                              <div className="register-content">
                                   <h1 className="text-white mb-4">Welcome to Jobs Portal</h1>
                                   <h3 className="text-white">#1 Intelligent time tracking application for jobs</h3>
                                   <h5 className="text-white mt-5 d-flex"><i className="fa fa-user me-2"></i>Enter your email id and password to get into your account.</h5>
                              </div>
                         </div>
                    </div>
                    <div className="register-form-area">
                         <div className="register-form-boxen forgotP-form-box">
                              <div className="register-form">
                                   <h4 className="text-primary text-left">{titleStrings.pageTitle}</h4>
                                   <div className="form-main">
                                        <Form
                                        onSubmit={handleForgotPassword}
                                        validate={validate}
                                        >
                                             {({handleSubmit, submitting, values})=>(
                                             <form onSubmit={handleSubmit}> 
                                                  <div className="form-field-group">
                                                       <div className="form-field flex100">
                                                            <Field name="email" label={titleStrings.emailTitle} component={renderField} placeholder="Enter email address" type="text" />
                                                       </div>
                                                       <div className="form-action w-100">
                                                            <button type="submit" className="btn btn-primary next-btn text-white text-center"> {titleStrings.ButtonTitle} </button>
                                                       </div>
                                                       <div className="form-field flex100 mb-0 p-2">
                                                            <p className='content-link'>Already have an account! <Link to="/"> Login </Link></p>
                                                       </div>
                                                  </div>
                                             </form>
                                             )}
                                        </Form>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ForgotPassword
