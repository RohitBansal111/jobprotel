import Student from './../../assets/icons/student.png'
import Employer from './../../assets/icons/employer.png'
import { Field, Form } from "react-final-form"
import ChooseRoleValidate from './validator/chooseValidate'
import { RenderRadioButtonField } from '../renderField'
import { useState } from 'react'


const ChooseRole = (props) => {
     const [activeRole, setactiveRole] = useState('student')

     const SaveChooseRole = (values) => {
          console.log(values)
          props.nextPage()
     }
     const handleStudentRole = () =>{
          setactiveRole('student')
     }
     const handleEmployerRole = () =>{
          setactiveRole('employer')
     }

     return (
          <div className="register-form">
               <h2 className="text-primary text-center">Choose a role</h2>
               <div className="form-main">
                    <Form
                    onSubmit={SaveChooseRole}
                    validate={ChooseRoleValidate}
                    >
                         {({handleSubmit,submitting, values})=>(
                         <form onSubmit={handleSubmit}> 
                              <div className="choose-role-box">
                                   <div className={activeRole == 'student' ? 'role-box active': 'role-box'} onClick={handleStudentRole}>
                                        <Field name="role" type="radio" value="student" component={RenderRadioButtonField}  />
                                        <div className="role-icon">
                                             <img src={Student} alt="Student Role" />
                                             <h4>STUDENT</h4>
                                        </div>
                                   </div>
                                   <div className={activeRole == 'employer' ? 'role-box active': 'role-box'} onClick={handleEmployerRole}>
                                        <Field name="role" type="radio" value="employer" component={RenderRadioButtonField}  />
                                        <div className="role-icon">
                                             <img src={Employer} alt="Employer Role" />
                                             <h4>EMPLOYER</h4>
                                        </div>
                                   </div>
                              </div>
                              <div className="form-action">
                                   <button type="submit" className="btn btn-primary w-100 next-btn text-white text-center"> Next </button>
                              </div>
                         </form>
                         )}
                    </Form>
               </div>
          </div>
     )
}

export default ChooseRole
