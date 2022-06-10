const Step2Validator = (values) => { 
     const error = {}
     if(!values.gender){ 
          error.gender = "Gender is Required"
     }
     if(!values.age){ 
          error.age = "Age is Required"
     }
     if(!values.address){ 
          error.address = "Address is Required"
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
     if(!values.zipcode){ 
          error.zipcode = "Zip Code is Required"
     }
     if(!values.qualification){ 
          error.qualification = "Qualification is Required"
     }
     if(!values.interestedArea){ 
          error.interestedArea = "Interested Area is Required"
     }
     // if(!values.uploadPhoto){ 
     //      error.uploadPhoto = "Required Upload Photo"
     // }
     return error;
   }
   
   export default Step2Validator