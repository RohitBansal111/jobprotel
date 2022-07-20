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
  if (!values.enddate) {
    error.enddate = "Required endDate";
  }
  if (!values.totalTeamSize) {
    error.totalTeamSize = "Required Team Size";
  }
  if (!values.companyEmail) {
    error.companyEmail = "Required company email address";
  }
  return error;
};

export default AddProjectValidator;
