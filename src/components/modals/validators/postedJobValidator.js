const PostedJobValidator = (values) => {
  const error = {};
  if (!values.designation) {
    error.designation = "Required designation";
  }
  if (!values.qualificationId) {
     error.qualificationId = "Required qualification";
   }
   if (
     values.qualificationId == "879f9960-14ba-11ed-984a-068f5cec9f16" &&
     !values.qualification
   ) {
     error.qualification = "Required qualification";
   }
  if (!values.skills) {
    error.skills = "Required skills";
  }
  if (!values.title) {
    error.title = "Required job-title";
  }
  if (!values.tags) {
    error.tags = "Required Tags";
  }
  if (!values.description) {
    error.description = "Required Job Description";
  }
  if (!values.hoursDays) {
    error.hoursDays = "Required Hour/Day";
  }
  if (!values.days) {
    error.days = "Required Job DayWeek";
  }
  if (!values.working) {
    error.working = "Required Working Type";
  }
  if (values.working == 1) {
    if (!values.location) {
      error.location = "Required Working Location";
    }
  }
  if (!values.category) {
    error.category = "Required job category";
  }
  return error;
};

export default PostedJobValidator;
