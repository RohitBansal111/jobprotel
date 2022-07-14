const EmployerStep2Validate = (values) => {
  const error = {};
  if (!values.logoUrl) {
    error.logoUrl = "Required Company Logo";
  }
  if (!values.companyPhone) {
    error.companyPhone = "Required Contact Details";
  }
  if (!values.companyName) {
    error.companyName = "Required Contact Name";
  }
  if (!values.countryId) {
    error.countryId = "Required Company Logo";
  }
  if (!values.stateId) {
    error.stateId = "Required Company Logo";
  }
  if (!values.city) {
    error.city = "Required Company Logo";
  }
  if (!values.address) {
    error.address = "Required Company Address";
  }
  if (!values.recruitingManagerName) {
    error.recruitingManagerName = "Required Manager Name";
  }
  return error;
};

export default EmployerStep2Validate;
