const Step3Validator = (values) => { 
     const error = {}
     if(!values.collegeName){ 
          error.collegeName = "Required College Name"
     }
     if(!values.years){ 
          error.years = "Required Years"
     }
     if(!values.months){ 
          error.months = "Required Month"
     }
     if(!values.salary){ 
          error.salary = "Required Salary"
     }
     if(!values.days){ 
          error.days = "Required Days/week"
     }
     if(!values.hours){ 
          error.hours = "Required Hours/day"
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
     if(!values.certificate){ 
          error.certificate = "Required Certificate"
     }
     return error;
   }
   
   export default Step3Validator