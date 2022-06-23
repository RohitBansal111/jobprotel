const EmployerStep2Validate = (values) => { 
     const error = {}
     // if(!values.companyLogo){ 
     //      error.companyLogo = "Required Company Logo"
     // }
     if(!values.companyAddress){ 
          error.companyAddress = "Required Company Address"
     }
     if(!values.manageName){ 
          error.manageName = "Required Manager Name"
     }
     if(!values.contactDetails){ 
          error.contactDetails = "Required Contact Details"
     }
     return error;
   }
   
   export default EmployerStep2Validate