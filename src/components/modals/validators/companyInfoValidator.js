const CompanyInfoValidator = (values) => {
  const error = {};
  if (!values.firstName) {
    error.firstName = "Required First Name";
  }
  if (!values.lastName) {
     error.lastName = "Required Last Name";
   }
  // if (!values.recruitingManagerName) {
  //   error.recruitingManagerName = "Required recuriting manager";
  // }
  if (!values.email) {
    error.email = "Required email address";
  }
  if (!values.companyName) {
    error.companyName = "Required company name";
  }
  if (!values.companyPhone) {
    error.companyPhone = "Required company phone";
  }
  // if (!values.cityName) {
  //   error.cityName = "Required city";
  // }
  // if (!values.countryId) {
  //   error.countryId = "Required country";
  // }
  // if (!values.stateId) {
  //   error.stateId = "Required state";
  // }
  if (!values.address) {
    error.address = "Required address";
  }
  return error;
};

export default CompanyInfoValidator;
