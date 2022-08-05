const ForgotPasswordValidator = (values) => { 
     const error = {}
     const regex = new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
     if(!values.email){ 
          error.email = "Required Email Address"
     }else if (!regex.test(values.email)) {
          error.email = "Please enter a valid email address";
        }
     return error;
   }
   
   export default ForgotPasswordValidator