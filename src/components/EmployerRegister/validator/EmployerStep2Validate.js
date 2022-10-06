const EmployerStep2Validate = (values) => {
  const error = {};
  // if (!values.logoUrl) {
  //   error.logoUrl = "Required Company Logo";
  // }
  if (!values.companyPhone) {
    error.companyPhone = "Required Contact Details";
  }
  if (!values.companyName) {
    error.companyName = "Required Company Name";
  }
  if (!values.countryId) {
    error.countryId = "Required Country";
  }
  if (!values.stateId) {
    error.stateId = "Required State";
  }
  if (!values.city) {
    error.city = "Required City";
  }
  if (!values.address) {
    error.address = "Required Company Address";
  }
  // if (!values.recruitingManagerName) {
  //   error.recruitingManagerName = "Required Manager Name";
  // }
  return error;
};
export default EmployerStep2Validate;
