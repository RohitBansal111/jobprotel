import { Field, Form } from "react-final-form"
import { renderField, RenderFileUploadField, renderTextareaField } from "./../renderField";
import validate from "./validators/postedJobValidator";

const PostedJobModal = () => {
    const handleJobPost = () => {}
    return (
          <div className="modal fade" id="postedJob" tabIndex="-1" aria-labelledby="postedJob" aria-hidden="true">
               <div className="modal-dialog modal-large">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="postedJob">Post New Job</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body p-4">
                              <div className="kyc-detail-form">
                                   <Form
                                   onSubmit={handleJobPost}
                                   validate={validate}
                                   >
                                        {({handleSubmit, submitting, values})=>(
                                        <form onSubmit={handleSubmit}> 
                                             <div className="form-field-group mt-0">
                                                  <div className="form-field flex50">
                                                       <Field name="designation" label="Designation" placeholder="Enter Designation" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="education" label="Education" placeholder="Enter education " component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="skills" label="Skills" placeholder="Enter skills" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="software" label="Software" placeholder="Enter software" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="experience" label="Experience" placeholder="Enter experience" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="onsite" label="Onsite" placeholder="Enter onsite" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="jobLocation" label="Job location" placeholder="Enter jobLocation" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="hoursDays" label="Hours/days" placeholder="Enter hours/days" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="jobTimingDays" label="Job Timings/days" placeholder="Enter jobTiming/days" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="salary" label="Salary" placeholder="Enter salary" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="tags" label="Tags" placeholder="Enter tags" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="description" label="Job Description" placeholder="Enter job description" component={renderTextareaField} />
                                                  </div>
                                                  <div className="form-field flex100 d-flex justify-content-end">
                                                       <button type="submit" className="btn btn-primary button-submit">Post Now</button>
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
     )
}

export default PostedJobModal
