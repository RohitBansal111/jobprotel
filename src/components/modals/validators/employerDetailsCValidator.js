const EmployerDetailsValidator = (values) => {
  const error = {};

  if (!values.designationId) {
    error.designationId = "Required designation";
  }
  if (!values.employerName) {
    error.employerName = "Required organisation";
  }
  if (!values.isCurrentEmployer) {
    error.isCurrentEmployer = "Required current employer";
  }
  if (!values.startDate) {
    error.startDate = "Required start-date";
  }
  if (values.isCurrentEmployer == "false" && !values.endDate) {
    error.endDate = "Required end-date";
  }
  // if (!values.salary) {
  //   error.salary = "Required salary";
  // }

  return error;
};

export default EmployerDetailsValidator;
