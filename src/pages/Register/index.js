import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import ChooseRole from '../../components/Register/chooseRole'
import Step1 from '../../components/Register/Step1'
import Step2 from '../../components/Register/Step2'
import Step3 from '../../components/Register/Step3'
import Logo from './../../assets/images/logo.png'

const Register = () => {
     const [currentPage, setPage] = useState(0);
     const nextPage = () => setPage((prev) => ++prev);
     const prevPage = () => setPage((prev) => --prev);
     const history = useNavigate()
     const finalSubmit = () =>{
          alert('Final Form Submit');
          history('/find-work')
     }
     console.log(currentPage)
     return (
          <div className="page-wrapper">
               <div className="register-page-main">
                    <div className="register-sidebar">
                         <div className="register-info-steps">
                              <div className="brand-media">
                                   <img src={Logo} alt="Real Job" />
                              </div>
                              <div className="register-content">
                                   <h1 className="text-white mb-4">Welcome to Jobs Portal</h1>
                                   <h3 className="text-white">#1 Intelligent time tracking application for jobs</h3>
                                   <ul className="resgiter-listing-steps">
                                        <li className={currentPage == 0 ? 'active' : (currentPage == 1 || currentPage == 2 || currentPage == 3) ? 'finish' : ''}>
                                             <div className="register-steps">
                                                  <h5>Choose role</h5>
                                                  <p>Choose your journey to proceed</p>
                                             </div>
                                        </li>
                                        <li className={currentPage == 1 ? 'active' : (currentPage == 2 || currentPage == 3) ? 'finish' : ''}>
                                             <div className="register-steps">
                                                  <h5>Basic Information</h5>
                                                  <p>Please provide your Name and email</p>
                                             </div>
                                        </li>
                                        <li className={currentPage == 2 ? 'active' : (currentPage == 3) ? 'finish' : ''}>
                                             <div className="register-steps">
                                                  <h5>Personal Information</h5>
                                                  <p>Please provide address, qualification etc</p>
                                             </div>
                                        </li>
                                        <li className={currentPage == 3 ? 'active' : ''}>
                                             <div className="register-steps">
                                                  <h5>Professional Information</h5>
                                                  <p>Please provide vour experience colleae details etc</p>
                                             </div>
                                        </li>
                                   </ul>
                                   <ul className="step-strips">
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="register-form-area">
                         <div className="register-form-boxen">
                              { currentPage === 0 && <ChooseRole nextPage={nextPage} /> }
                              { currentPage === 1 && <Step1 prevPage={prevPage} nextPage={nextPage} /> }
                              { currentPage === 2 && <Step2 prevPage={prevPage} nextPage={nextPage} /> }
                              { currentPage === 3 && <Step3 prevPage={prevPage} finalSubmit={finalSubmit} /> }
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Register
