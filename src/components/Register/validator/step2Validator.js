const Step2Validator = (values) => {
  const error = {};
  const number = /^0|[1-9]\d*$/;
  if (!values.genderId) {
    error.genderId = "Gender is Required";
  }
  // if(!values.profileImage){
  //      error.profileImage = "Profile Image is Required"
  // }
    if (!values.age) {
      error.age = "Age is Required";
    }
  if (!values.address) {
    error.address = "Address is Required";
  }
  if (!values.addressLine1) {
    error.addressLine1 = "Address Line1 is Required";
  }
  if (!values.countryId) {
    error.countryId = "Country is Required";
  }
  if (!values.stateId) {
    error.stateId = "State is Required";
  }
  if (!values.city) {
    error.city = "City is Required";
  }
  if (!values.PostalCode) {
      error.PostalCode = "Zip Code is Required";
  }
  // if(!values.timezone){
  //      error.timezone = "Time Zone is Required"
  // }
  if (!values.qualificationId) {
    error.qualificationId = "Qualification is Required";
  }
  if(!values.interests || values.interests && values.interests.length ===0){
       error.interests = "Interested Area is Required"
  }

  return error;
};

export default Step2Validator;
