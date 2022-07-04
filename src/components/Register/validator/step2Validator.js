const Step2Validator = (values) => { 
     const error = {}
     if(!values.gender){ 
          error.gender = "Gender is Required"
     }
     // if(!values.uploadPhoto){ 
     //      error.uploadPhoto = "Upload Profile is Required"
     // }
     if(!values.age){ 
          error.age = "Age is Required"
     }
     if(!values.addressLine1){ 
          error.addressLine1 = "Address is Required"
     }
     if(!values.country){ 
          error.country = "Country is Required"
     }
     if(!values.state){ 
          error.state = "State is Required"
     }
     if(!values.city){ 
          error.city = "City is Required"
     }
     if(!values.PostalCode){ 
          error.PostalCode = "Zip Code is Required"
     }
     if(!values.timezone){ 
          error.timezone = "Time Zone is Required"
     }
     if(!values.qualification){ 
          error.qualification = "Qualification is Required"
     }
     // if(!values.interests){ 
     //      error.interests = "Interested Area is Required"
     // }
     // if(!values.uploadPhoto){ 
     //      error.uploadPhoto = "Required Upload Photo"
     // }
     return error;
   }
   
   export default Step2Validator