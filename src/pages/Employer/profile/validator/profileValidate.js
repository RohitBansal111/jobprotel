const ProfileValidate = (values) => {
  const error = {};
  if (!values.firstName) {
    error.firstName = "Required First Name";
  }
  if (!values.lastName) {
    error.lastName = "Required Last Name";
  }
  if (!values.email) {
    error.email = "Required Email Address";
  }
  // if(!values.city){
  //      error.city = "Required City"
  // }
  // if(!values.countryId){
  //      error.countryId = "Required Country"
  // }
  // if(!values.stateId){
  //      error.stateId = "Required state"
  // }
  if (!values.companyPhone) {
    error.companyPhone = "Required Phone";
  }
  if (!values.companyAddress) {
    error.companyAddress = "Required Address";
  }
  return error;
};

export default ProfileValidate;
