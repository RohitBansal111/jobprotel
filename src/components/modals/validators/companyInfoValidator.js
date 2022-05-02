const CompanyInfoValidator = (values) => { 
    const error = {}
     if(!values.recuritingManager){ 
          error.recuritingManager = "Required recuriting manager"
     }
     if(!values.contactDetails){ 
          error.contactDetails = "Required contact details"
     }
     if(!values.companyAddress){ 
          error.companyAddress = "Required company address"
     }
    return error;
}
  
export default CompanyInfoValidator