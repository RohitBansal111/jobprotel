const Step3Validator = (values) => { 
     const error = {}
     if(!values.collegeName){ 
          error.collegeName = "Required College Name"
     }
     if(!values.age){ 
          error.age = "Required Age"
     }
     if(!values.address){ 
          error.address = "Required Address"
     }
     if(!values.qualification){ 
          error.qualification = "Required Qualification"
     }
     if(!values.interestedArea){ 
          error.interestedArea = "Required Interested Area"
     }
     if(!values.uploadPhoto){ 
          error.uploadPhoto = "Required Upload Photo"
     }
     return error;
   }
   
   export default Step3Validator