import { Field, Form } from "react-final-form"
import validate from './kycValidation'
import { renderField, RenderFileUploadField } from "./../renderField";

const SendInvitationModal = () => {
     const handleKycForm = () => {

     }
     return (
          <div className="modal fade" id="invitationPopup" tabIndex="-1" aria-labelledby="inivitationLabel" aria-hidden="true">
               <div className="modal-dialog">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="kycLabel">Send Invitation</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body p-4">
                              <div className="kyc-detail-form">
                                   <Form
                                   onSubmit={handleKycForm}
                                   validate={validate}
                                   >
                                        {({handleSubmit, submitting, values})=>(
                                        <form onSubmit={handleSubmit}> 
                                             <div className="form-field-group mt-0">
                                                  <div className="form-field flex100">
                                                       <Field name="candidateName" label="Candidate Name" placeholder="Enter candidate name" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100 d-flex justify-content-end">
                                                       <button type="submit" className="btn btn-primary button-submit">Send</button>
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

export default SendInvitationModal
