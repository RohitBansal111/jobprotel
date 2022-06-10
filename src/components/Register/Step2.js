import { Field, Form } from "react-final-form"
import LocalizedStrings from 'react-localization';
import { RenderImageField } from "../file-input";
import { renderField, RenderRadioButtonField, renderSelect } from "../renderField";
import titles from './register.json' 
import Step2Validator from "./validator/step2Validator";

const Step2 = (props) => {
     let titleStrings = new LocalizedStrings(titles)
     const SaveStep2 = (values) =>{
          console.log(values)
          props.nextPage()
     }
     return (
          <div className="register-form">
               <h4 className="text-primary text-left">Personal Information</h4>
               <div className="form-main">
                    <Form
                    onSubmit={SaveStep2}
                    validate={Step2Validator}
                    >
                         {({handleSubmit, submitting, values})=>(
                         <form onSubmit={handleSubmit}> 
                              <div className="form-field-group">
                                   <div className="form-field flex50">
                                        <label htmlFor="gender"> {titleStrings.genderTitle} </label> 
                                        <div className="radio-button-groupss">
                                             <Field label={titleStrings.maleTitle} name="gender" value="Male" component={RenderRadioButtonField} type="radio">
                                                  Male
                                             </Field>
                                             <Field label={titleStrings.feMaleTitle} name="gender" value="Female" component={RenderRadioButtonField} type="radio">
                                                  Female
                                             </Field>
                                        </div>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="age" label={titleStrings.ageTitle} component={renderField} placeholder="Enter age" type="text" />
                                   </div>
                                   <div className="form-field flex100 mb-2">
                                        <Field name="address" label={titleStrings.addressTitle} component={renderField} placeholder="Enter Address"type="text" />
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="country" label={titleStrings.countryTitle} component={renderSelect}>
                                          <option>Select Country</option>
                                          <option>India</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="state" label={titleStrings.stateTitle} component={renderSelect}>
                                         <option>Select State</option>
                                         <option>Chandigarh</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="city" label={titleStrings.cityTitle} component={renderField} placeholder="Enter City" type="text" />
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="zipcode" label={titleStrings.zipcodeTitle} component={renderField} placeholder="Enter Zip Code" type="text" />
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="qualification" label={titleStrings.qualificationTitle} component={renderSelect}>
                                             <option>B.Tech Computer science</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="interestedArea" label={titleStrings.interestedAreaTitle} component={renderSelect}>
                                           <option>Writing</option>
                                           <option>Photography</option>
                                           <option>Action</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="uploadPhoto2" label={titleStrings.uploadPhotoTitle} component={RenderImageField} type="file" />
                                   </div>
                                  
                              </div>
                              <div className="form-action">
                                   <button type="button" onClick={() => props.prevPage()} className="btn btn-secondary prev-btn text-white text-center"> {titleStrings.prevTitle} </button>
                                   <button type="submit" className="btn btn-primary next-btn text-white text-center"> {titleStrings.nextTitle} </button>
                              </div>
                         </form>
                         )}
                    </Form>
               </div>
          </div>
     )
}

export default Step2
