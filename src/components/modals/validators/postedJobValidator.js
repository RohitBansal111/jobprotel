const PostedJobValidator = (values) => { 
    const error = {}
     if(!values.designationId){ 
          error.designationId = "Required designation"
     }
     if(!values.qualification){ 
          error.qualification = "Required education"
     }
     if(!values.skills){ 
          error.skills = "Required skills"
     }
     if(!values.title){ 
          error.title = "Required job-title"
     }
     if(!values.experienceInYears){ 
          error.experienceInYears = "Required experience in Years"
     }
     if(!values.experienceInMonths){ 
          error.experienceInMonths = "Required experience in Months"
     }
     if(!values.hoursPerDay){ 
          error.hoursPerDay = "Required hours/Days"
     }
     if(!values.timing){ 
          error.timing = "Required Job Timing/Days"
     }
     if(!values.salary){ 
          error.salary = "Required salary"
     }
     if(!values.tags){ 
          error.tags = "Required Tags"
     }
     if(!values.description){ 
          error.description = "Required Job Description"
     }
     if(!values.location){ 
          error.location = "Required Job Description"
     }
     if(!values.hoursDays){ 
          error.hoursDays = "Required Hours/Day"
     }
     if(!values.days){ 
          error.days = "Required Job Days/Week"
     }
    return error;
}
  
export default PostedJobValidator