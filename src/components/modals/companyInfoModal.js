import { Field, Form } from "react-final-form"
import { renderField, renderTextareaField } from "./../renderField";
import validate from "./validators/companyInfoValidator";

const CompanyInfoModal = () => {
    const handleCompanyInfo = () => {}
    return (
          <div className="modal fade" id="companyInfo" tabindex="-1" aria-labelledby="companyInfo" aria-hidden="true">
               <div className="modal-dialog modal-large">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title" id="companyInfo">Edit Company Info</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body p-4">
                              <div className="kyc-detail-form">
                                   <Form
                                   onSubmit={handleCompanyInfo}
                                   validate={validate}
                                   >
                                        {({handleSubmit, submitting, values})=>(
                                        <form onSubmit={handleSubmit}> 
                                             <div className="form-field-group mt-0">
                                                  <div className="form-field flex50">
                                                       <Field name="recuritingManager" label="Recruiting Manager" placeholder="Enter recruiting manager" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="contactDetails" label="Contact Details" placeholder="Enter contact detials " component={renderField} />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field name="companyAddress" label="Company Address" placeholder="Enter company address" component={renderTextareaField} />
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

export default CompanyInfoModal
