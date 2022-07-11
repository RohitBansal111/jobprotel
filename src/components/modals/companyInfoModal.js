import { useState } from "react";
import { Field, Form } from "react-final-form"
import RenderPhoneInput from "../renderPhoneInput";
import { renderField, renderSelect } from "./../renderField";
import validate from "./validators/companyInfoValidator";

const CompanyInfoModal = () => {

    const handleCompanyInfo = () => {}
    const [img, setImg] = useState({
     personalInfoImg:
       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
   });

    return (
          <div className="modal fade" id="companyInfo" tabIndex="-1" aria-labelledby="companyInfo" aria-hidden="true">
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
                                                  <div className="form-field flex100">
                                                       <div className="uploadImageSection mb-2">
                                                            <div className="file-label-image">
                                                                 <label>Upload Profile</label>
                                                                 <div className="file-upload">
                                                                      <input
                                                                           name="logoUrl"
                                                                           label="CompanyLogo"
                                                                           accept=".jpg, .jpeg, .png"
                                                                           // onChange={handleImageChange}
                                                                           type="file"
                                                                      />
                                                                 </div>
                                                            </div>
                                                            <div className="aws-placeholder image4">
                                                                 <img
                                                                      src={img.personalInfoImg}
                                                                      className="img-aws"
                                                                      alt="user"
                                                                      width={100}
                                                                      height={100}
                                                                      layout="fill"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field
                                                            name="companyName"
                                                            label="Company Name"
                                                            component={renderField}
                                                            placeholder="Enter company name"
                                                            type="text"
                                                       />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field name="companyEmailAddress" label="Company Email Address" value="info@eminencetechnolofy.com" component={renderField} />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field
                                                            name="contactDetails"
                                                            label="Company Phone Number"
                                                            component={RenderPhoneInput}
                                                            placeholder="Enter Company Phone Number"
                                                            type="text"
                                                            pattern="[0-9]*"
                                                       />
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field
                                                            name="countryId"
                                                            label="Country"
                                                            component={renderSelect}
                                                       >
                                                            <option value="">Select Country</option>
                                                            <option>India</option>
                                                            <option>USA</option>
                                                       </Field>
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field
                                                            name="stateId"
                                                            label="State"
                                                            component={renderSelect}
                                                       >
                                                            <option value="" disabled>Select State</option>
                                                            <option>Haryana</option>
                                                            <option>Punjab</option>
                                                            <option>Alaska</option>
                                                       </Field>
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field
                                                            name="city"
                                                            label="City"
                                                            component={renderField}
                                                            placeholder="Enter City"
                                                            type="text"
                                                       ></Field>
                                                  </div>
                                                  <div className="form-field flex50">
                                                       <Field
                                                            name="recruitingManagerName"
                                                            label="Recuriting Manager Name"
                                                            component={renderField}
                                                            placeholder="Enter recuriting manager name"
                                                            type="text"
                                                       />
                                                  </div>
                                                  <div className="form-field flex100">
                                                       <Field
                                                            name="address"
                                                            label="Company Address"
                                                            component={renderField}
                                                            placeholder="Enter company address"
                                                            type="text"
                                                       />
                                                  </div>
                                                  <div className="form-field flex100 d-flex mt-3 justify-content-end">
                                                       <button type="submit" className="btn btn-primary button-submit">Update Info</button>
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
