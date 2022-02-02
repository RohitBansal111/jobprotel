const ChooseValidate = (values) => { 
     const error = {}
     if(!values.role){ 
          error.role = "Required Role"
     }
     return error;
   }
   
   export default ChooseValidate