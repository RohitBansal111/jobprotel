const PostedJobValidator = (values) => { 
    const error = {}
     if(!values.designation){ 
          error.designation = "Required designation"
     }
     if(!values.education){ 
          error.education = "Required education"
     }
     if(!values.skills){ 
          error.skills = "Required skills"
     }
     if(!values.software){ 
          error.software = "Required software"
     }
     if(!values.experience){ 
          error.experience = "Required experience"
     }
     if(!values.onsite){ 
          error.onsite = "Required onsite"
     }
     if(!values.hoursDays){ 
          error.hoursDays = "Required hours/Days"
     }
     if(!values.jobTimingDays){ 
          error.jobTimingDays = "Required Job Timing/Days"
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
    return error;
}
  
export default PostedJobValidator