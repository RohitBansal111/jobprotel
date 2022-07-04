const ForgotPasswordValidator = (values) => { 
     const error = {}
     if(!values.userName){ 
          error.userName = "Required Email Address"
     }
     // if(!values.password){ 
     //      error.password = "Required valid password"
     // }
     return error;
   }
   
   export default ForgotPasswordValidator