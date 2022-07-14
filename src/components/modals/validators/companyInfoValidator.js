const CompanyInfoValidator = (values) => { 
    const error = {}
    if(!values.companyLogo){ 
     error.companyLogo = "Required company logo"
    }
     if(!values.recuritingManager){ 
          error.recuritingManager = "Required recuriting manager"
     }
    
     if(!values.companyAddress){ 
          error.companyAddress = "Required company address"
     }
     if(!values.companyName){ 
          error.companyName = "Required company name"
     }
     if(!values.companyPhone){ 
          error.companyPhone = "Required company phone"
     }
     if(!values.cityId){ 
          error.cityId = "Required city"
     }
     if(!values.countryId){ 
          error.countryId = "Required country"
     }
     if(!values.stateId){ 
          error.stateId = "Required state"
     }
     if(!values.address){ 
          error.address = "Required address"
     }
    return error;
}
  
export default CompanyInfoValidator