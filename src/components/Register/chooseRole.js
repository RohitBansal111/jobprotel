import Student from './../../assets/icons/student.png'
import Employer from './../../assets/icons/employer.png'


const ChooseRole = (props) => {
     
     const formStep = () => {
         
     }
     return (
          <div className="register-form">
               <h2 className="text-primary text-center">Choose a role</h2>
               <div className="form-main">
                    <form action="" onSubmit={formStep}>
                         <div className="choose-role-box">
                              <div className="role-box">
                                   <label htmlFor="studentRole">
                                        <input name="role" type="radio" value="student" />
                                        <div className="role-icon">
                                             <img src={Student} alt="Student Role" />
                                             <h4>STUDENT</h4>
                                        </div>
                                        <div className="role-circle">
                                             <span></span>
                                        </div>
                                   </label>
                              </div>
                              <div className="role-box">
                                   <label htmlFor="studentRole">
                                        <input name="role" type="radio" value="employer" />
                                        <div className="role-icon">
                                             <img src={Employer} alt="Employer Role" />
                                             <h4>EMPLOYER</h4>
                                        </div>
                                        <div className="role-circle">
                                             <span></span>
                                        </div>
                                   </label>
                              </div>
                         </div>
                         <div className="form-action">
                              <button type="button" className="btn btn-primary w-100 next-btn text-white text-center"> Next </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default ChooseRole
