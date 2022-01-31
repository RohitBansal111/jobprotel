const Step1Validator = (values) => { 
     const error = {}
     if(!values.firstname){ 
          error.firstname = "Required First Name"
     }
     if(!values.lastname){ 
          error.lastname = "Required Last Name"
     }
     if(!values.email){ 
          error.email = "Required Email Address"
     }
     if(!values.password){ 
          error.password = "Required Password"
     }
     if(!values.confirmpassword){ 
          error.confirmpassword = "Required Confirm Password"
     }
     return error;
   }
   
   export default Step1Validator