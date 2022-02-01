import { Field, Form } from "react-final-form"
import LocalizedStrings from 'react-localization';
import { renderField, RenderImageField, RenderRadioButtonField, renderSelect } from "../renderField";
import titles from './register.json' 
import Step3Validator from "./validator/step3Validator";

const Step3 = () => {
     let titleStrings = new LocalizedStrings(titles)
     const SaveStep3 = (values) =>{
          console.log(values)
     }
     return (
          <div className="register-form">
               <h4 className="text-primary text-left">Professional Information</h4>
               <div className="form-main">
                    <Form
                    onSubmit={SaveStep3}
                    validate={Step3Validator}
                    >
                         {({handleSubmit, submitting, values})=>(
                         <form onSubmit={handleSubmit}> 
                              <div className="form-field-group">
                                   <div className="form-field flex100">
                                        <Field name="collegeName" label={titleStrings.collegeTitle} component={renderField} placeholder="Enter college / university name" type="text" />
                                   </div>
                                   <div className="form-field flex50 mb-2 withoutLabel">
                                        <label htmlFor="">Experience</label>
                                        <div class="inner-multi-field">
                                             <Field name="years" label="Experience" component={renderField} placeholder="Year's" type="text" />
                                             <Field name="months" label="Experience" component={renderField} placeholder="Month's" type="text" />
                                        </div>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="salary" label="Expected Salary" component={renderField} placeholder="Enter salary expectations" type="text" />
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="days" label="Hours / day" component={renderSelect} type="text">
                                             <option selected="">Select hours</option>
                                             <option value="1">1</option>
                                             <option value="2">2</option>  
                                             <option value="3">3</option>
                                             <option value="3">4</option>
                                             <option value="3">5</option>
                                             <option value="3">6</option>
                                             <option value="3">7</option>
                                             <option value="3">8</option>
                                             <option value="3">9</option>
                                             <option value="3">10</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="timeZone" label="Time Zone" component={renderSelect} type="text">
                                             <option selected="">Select timezone</option>
                                             <option value="1">India (GMT+5:30)</option>
                                             <option value="2">India (GMT+5:30)</option>  
                                             <option value="3">India (GMT+5:30)</option>
                                        </Field>
                                   </div>
                                   <div className="form-field flex50">
                                        <label htmlFor="Working"> {titleStrings.genderTitle} </label> 
                                        <div className="radio-button-groupss">
                                             <Field label={titleStrings.onSiteTitle} name="working" value="OnSite" checked="checked" component={RenderRadioButtonField} type="radio" />
                                             <Field label={titleStrings.offSiteTitle} name="working" value="OffSite" component={RenderRadioButtonField} type="radio" />
                                        </div>
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="resume" label="Upload resume" uploadLabel="Browse resume file" component={RenderImageField} type="text" />
                                   </div>
                                   <div className="form-field flex50">
                                        <label htmlFor="Working"> Extra certificates </label> 
                                        <div className="radio-button-groupss">
                                             <Field label={titleStrings.noTitle} name="certificate" value="No" component={RenderRadioButtonField} type="radio" />
                                             <Field label={titleStrings.yesTitle} name="certificate" value="Yes" component={RenderRadioButtonField} type="radio" />
                                        </div>
                                   </div>
                              </div>
                              <div className="form-action">
                                   <button type="submit" className="btn btn-secondary prev-btn text-white text-center"> {titleStrings.prevTitle} </button>
                                   <button type="submit" className="btn btn-primary next-btn text-white text-center"> {titleStrings.nextTitle} </button>
                              </div>
                         </form>
                         )}
                    </Form>
               </div>
          </div>
     )
}

export default Step3
