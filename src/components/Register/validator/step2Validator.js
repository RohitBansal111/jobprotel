const Step2Validator = (values) => { 
     const error = {}
     if(!values.gender){ 
          error.gender = "Required gender"
     }
     if(!values.age){ 
          error.age = "Required Age"
     }
     if(!values.address){ 
          error.address = "Required house no."
     }
     if(!values.address2){ 
          error.address2 = "Required PIN Number"
     }
     if(!values.qualification){ 
          error.qualification = "Required Qualification"
     }
     if(!values.interestedArea){ 
          error.interestedArea = "Required Interested Area"
     }
     // if(!values.uploadPhoto){ 
     //      error.uploadPhoto = "Required Upload Photo"
     // }
     return error;
   }
   
   export default Step2Validator