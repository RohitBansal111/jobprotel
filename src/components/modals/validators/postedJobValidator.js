const PostedJobValidator = (values) => { 
    const error = {}
     if(!values.designation){ 
          error.designation = "Required designation"
     }
     if(!values.qualification){ 
          error.qualification = "Required education"
     }
     if(!values.skills){ 
          error.skills = "Required skills"
     }
     if(!values.software){ 
          error.software = "Required software"
     }
     if(!values.experienceInYears){ 
          error.experienceInYears = "Required experience in Years"
     }
     if(!values.onsite){ 
          error.onsite = "Required onsite"
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
    return error;
}
  
export default PostedJobValidator