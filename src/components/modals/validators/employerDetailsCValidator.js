const EmployerDetailsValidator = (values) => {
  const error = {};

  if (!values.designation) {
    error.designation = "Required designation";
  }
  if (!values.organisation) {
    error.organisation = "Required organisation";
  }
  if (!values.currentEmployer) {
    error.currentEmployer = "Required current employer";
  }
  if (!values.startDate) {
    error.startDate = "Required start-date";
  }
  if (!values.endDate) {
    error.endDate = "Required end-date";
  }
  if (!values.experienceInYears) {
    error.experienceInYears = "Required experience in Years";
  }
  if (!values.experienceInMonth) {
    error.experienceInMonth = "Required experience in Months";
  }
  if (!values.salary) {
    error.salary = "Required salary";
  }
  if (!values.noticePeriod) {
    error.noticePeriod = "Required notice period";
  }
  return error;
};

export default EmployerDetailsValidator;
