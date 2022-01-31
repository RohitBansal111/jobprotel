import { Field, Form } from "react-final-form"
import LocalizedStrings from 'react-localization';
import { RenderImageField } from "../file-input";
import { renderField, renderRadioButtonField } from "../renderField";
import titles from './register.json' 
import Step2Validator from "./validator/step2Validator";

const Step2 = () => {
     let titleStrings = new LocalizedStrings(titles)
     const SaveStep2 = (values) =>{
          console.log(values)
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
                                             <Field label="gender" name="gender" value="Male" component={renderRadioButtonField} type="radio">
                                                  <input name="gender" type="radio" checked="checked" /> {titleStrings.maleTitle}
                                                  <span class="radiobtn"></span>
                                             </Field> 
                                             <Field label="gender" name="gender" value="Female" component={renderRadioButtonField} type="radio">
                                                  <input name="gender" type="radio"/> {titleStrings.feMaleTitle}
                                                  <span class="radiobtn"></span>
                                             </Field>
                                        </div>
                                   </div>
                                   <div className="form-field flex50">
                                        <Field name="age" label={titleStrings.ageTitle} component={renderField} type="text" />
                                   </div>
                                   <div className="form-field flex100 mb-2">
                                        <Field name="address" label={titleStrings.addressTitle} component={renderField} type="text" />
                                   </div>
                                   <div className="form-field flex100 withourLabel">
                                        <Field name="address" label={titleStrings.addressTitle} component={renderField} type="text" />
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="qualification" label={titleStrings.qualificationTitle} component={renderField} type="text" />
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="interestedArea" label={titleStrings.interestedAreaTitle} component={renderField} type="text" />
                                   </div>
                                   <div className="form-field flex100">
                                        <Field name="uploadPhoto" label={titleStrings.uploadPhotoTitle} component={RenderImageField} type="file" />
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

export default Step2
