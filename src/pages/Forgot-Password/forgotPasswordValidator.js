const ForgotPasswordValidator = (values) => { 
     const error = {}
     if(!values.email){ 
          error.email = "Required Email Address"
     }
     return error;
   }
   
   export default ForgotPasswordValidator