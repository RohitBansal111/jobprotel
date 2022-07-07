const EmployerStep2Validate = (values) => { 
     const error = {}
     // if(!values.logoUrl){ 
     //      error.logoUrl = "Required Company Logo"
     // }
     if(!values.address){ 
          error.address = "Required Company Address"
     }
     if(!values.recruitingManagerName){ 
          error.recruitingManagerName = "Required Manager Name"
     }
     // if(!values.companyPhone){ 
     //      error.companyPhone = "Required Contact Details"
     // }
     return error;
   }
   
   export default EmployerStep2Validate