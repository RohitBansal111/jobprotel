const LoginValidator = (values) => { 
     const error = {}
     if(!values.email){ 
          error.email = "Required Email Address"
     }
     if(!values.password){ 
          error.password = "Required valid password"
     }
     return error;
   }
   
   export default LoginValidator