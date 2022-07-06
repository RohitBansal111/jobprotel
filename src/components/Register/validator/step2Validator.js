const Step2Validator = (values) => {
  const error = {};
  const number = /^0|[1-9]\d*$/;
  if (!values.genderId) {
    error.genderId = "Gender is Required";
  }
  // if(!values.profileImage){
  //      error.profileImage = "Profile is Required"
  // }
  //   if (!values.age) {
  //     error.age = "Age is Required";
  //   }else if (!(values.age + "").match(number)) {
  //     error.age = "Age must be numeric";
  //   }
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
  //   if (!values.PostalCode) {
  //     error.PostalCode = "Zip Code is Required";
  //   } else if (!(values.PostalCode + "").match(number)) {
  //     error.PostalCode = "PostalCode must be numeric";
  //   }
  // if(!values.timezone){
  //      error.timezone = "Time Zone is Required"
  // }
  if (!values.qualificationId) {
    error.qualificationId = "Qualification is Required";
  }
  // if(!values.interests){
  //      error.interests = "Interested Area is Required"
  // }
  // if(!values.uploadPhoto){
  //      error.uploadPhoto = "Required Upload Photo"
  // }
  return error;
};

export default Step2Validator;
