const ProfileValidate = (values) => { 
     const error = {}
     if(!values.firstname){ 
          error.firstname = "Required First Name"
     }
     if(!values.lastname){ 
          error.lastname = "Required Last Name"
     }
     if(!values.age){ 
          error.age = "Required Age"
     }
     if(!values.email){ 
          error.email = "Required Email Address"
     }
     if(!values.intrestedArea){ 
          error.intrestedArea = "Required Interests"
     }
    
     if(!values.houseno){ 
          error.houseno = "Required Address."
     }
     if(!values.addressLine1){ 
          error.addressLine1 = "Required Address line1"
     }
     if(!values.city){ 
          error.city = "Required City"
     }
     if(!values.Country){ 
          error.Country = "Required Country"
     }
     if(!values.state){ 
          error.state = "Required state"
     }
     if(!values.pin){ 
          error.pin = "Required PIN"
     }
     if(!values.hours){ 
          error.hours = "Required Hours/day"
     }
     if(!values.days){ 
          error.days = "Required days"
     }
     if(!values.salary){ 
          error.salary = "Required Expected Salary"
     }else if(values.salary == 0) {
          error.salary = "Expected Salary must be greater than 0"
     }
     // if(!values.experienceInMonths){ 
     //      error.experienceInMonths = "Required experience in months"
     // }
   
     // if(!values.experienceInYears){ 
     //      error.experienceInYears = "Required experience in years"
     // }
     if(!values.working){ 
          error.working = "Required Working"
     }
     
     if(!values.collegeId){ 
          error.collegeId = "Required college/university"
     }
     if(!values.designation){ 
          error.designation = "Required designation"
     }
     if(!values.qualificationId){ 
          error.qualificationId = "Required qualification"
     }
     if(values.qualificationId == "879f9960-14ba-11ed-984a-068f5cec9f16" && !values.qualification){ 
          error.qualification = "Required qualification"
     }
     
     if(!values.skills){ 
          error.skills = "Required Skills"
     
     }
     return error;
   }
   
   export default ProfileValidate