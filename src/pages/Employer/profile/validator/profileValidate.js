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
     if(!values.timeZone){ 
          error.timeZone = "Required TimeZone"
     }
     if(!values.houseno){ 
          error.houseno = "Required House No."
     }
     if(!values.city){ 
          error.city = "Required City"
     }
     if(!values.pin){ 
          error.pin = "Required PIN"
     }
     if(!values.hours){ 
          error.hours = "Required Hours/day"
     }
     if(!values.salary){ 
          error.salary = "Required Expected Salary"
     }
     if(!values.experience){ 
          error.experience = "Required Experience"
     }
     if(!values.working){ 
          error.working = "Required Working"
     }
     if(!values.education){ 
          error.education = "Required Education"
     }
     if(!values.college){ 
          error.college = "Required college/university"
     }
     if(!values.resume){ 
          error.resume = "Required resume"
     }
     if(!values.documents){ 
          error.documents = "Required documents"
     }
     if(!values.skills){ 
          error.skills = "Required Skills"
     }
     return error;
   }
   
   export default ProfileValidate