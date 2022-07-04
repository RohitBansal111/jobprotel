const Step3Validator = (values) => { 
     const error = {}
     if(!values.collegeName){ 
          error.collegeName = "Required College Name"
     }
     if(!values.experienceInYears){ 
          error.experienceInYears = "Required Years"
     }
     if(!values.experienceInMonths){ 
          error.experienceInMonths = "Required Month"
     }
     if(!values.expectedSalary){ 
          error.expectedSalary = "Required Salary"
     }
     if(!values.days){ 
          error.days = "Required Days/week"
     }
     if(!values.workHoursPerDay){ 
          error.workHoursPerDay = "Required Hours/day"
     }
     if(!values.category){ 
          error.category = "Required Category"
     }
     if(!values.skills){ 
          error.skills = "Required Skills"
     }
     if(!values.skills){ 
          error.skills = "Required Working"
     }
     // if(!values.certificate){ 
     //      error.certificate = "Required Certificate"
     // }
     return error;
   }
   
   export default Step3Validator