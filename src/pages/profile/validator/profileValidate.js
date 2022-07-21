const ProfileValidate = (values) => { 
     const error = {}
     console.log("rahul")
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
          error.houseno = "Required House No."
     }
     if(!values.addressLine1){ 
          error.addressLine1 = "Required Addres line1"
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
     }
     if(!values.experienceInMonths){ 
          error.experienceInMonths = "Required experience in months"
     }
   
     if(!values.experienceInYears){ 
          error.experienceInYears = "Required Experience in years"
     }
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
     if(values.qualificationId == "Other" && !values.qualification){ 
          error.qualificationId = "Required qualification"
     }
     
     if(!values.skills){ 
          error.skills = "Required Skills"
     
     }
     console.log("err",error)
     return error;
   }
   
   export default ProfileValidate