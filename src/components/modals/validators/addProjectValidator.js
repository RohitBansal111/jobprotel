const AddProjectValidator = (values) => {
  const error = {};
  if (!values.title) {
    error.title = "Required title";
  }
  if (!values.description) {
    error.description = "Required description";
  }
  if (!values.roleResponsiblity) {
    error.roleResponsiblity = "Required role & responsiblity ";
  }
  if (!values.projectUrl) {
    error.projectUrl = "Required projectUrl";
  }
  if (!values.startdate) {
    error.startdate = "Required startDate";
  }
  if (!values.endDate) {
    error.endDate = "Required endDate";
  }
  if (!values.totalTeamSize) {
    error.totalTeamSize = "Required Team Size";
  }
  if (!values.companyEmail) {
    error.companyEmail = "Required company email address";
  }
  console.log(error)
  return error;
};

export default AddProjectValidator;
