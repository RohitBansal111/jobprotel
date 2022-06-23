import { Field, Form } from "react-final-form"
import { renderField } from "./../renderField";
import validate from "./validators/postedJobValidator";

const ModifyEmploymentModal = () => {
    const handleJobPost = () => {}
    return (
          <div className="modal fade" id="modifyEmploymentModal" tabIndex="-1" aria-labelledby="modifyEmploymentModal" aria-hidden="true">
               <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="modifyEmploymentModal">Modify Employment Detail</h5>
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
                                                  <div className="form-field flex100">
                                                       <Field name="designation" label="Designation" placeholder="Enter Designation" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="organisation" label="Organisation" placeholder="Enter organisation " component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="startDate" label="Start Date" placeholder="Enter start date" component={renderField} type="date" />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="endDate" label="End Date" placeholder="Enter end date" component={renderField} type="date" />
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

export default ModifyEmploymentModal
