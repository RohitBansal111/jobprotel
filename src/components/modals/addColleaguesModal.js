import { Field, Form } from "react-final-form"
import { renderField, renderTextareaField } from "./../renderField";
import validate from "./validators/postedJobValidator";

const AddColeagueModal = () => {
    const handleAddColleague = () => {}
    return (
          <div className="modal fade" id="addColleague" tabindex="-1" aria-labelledby="addColleague" aria-hidden="true">
               <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="addColleague">Add New Colleague</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body p-4">
                              <div className="kyc-detail-form">
                                   <Form
                                   onSubmit={handleAddColleague}
                                   validate={validate}
                                   >
                                        {({handleSubmit, submitting, values})=>(
                                        <form onSubmit={handleSubmit}> 
                                             <div className="form-field-group mt-0">
                                                  <div className="form-field flex100">
                                                       <Field name="name" label="Name" placeholder="Enter name" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="email" label="Email Address" placeholder="Enter email" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="role" label="Role" placeholder="Enter role" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="access" label="Access" placeholder="Enter access" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100 d-flex justify-content-end">
                                                       <button type="submit" className="btn btn-primary button-submit">Add Colleague</button>
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

export default AddColeagueModal
