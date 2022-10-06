const ProfileValidate = (values) => {
  const error = {};
  if (!values.firstname) {
    error.firstname = "Required First Name";
  }
  if (!values.lastname) {
    error.lastname = "Required Last Name";
  }
  if (!values.age) {
    error.age = "Required Age";
  }
  if (!values.genderName) {
    error.genderName = "Required Gender";
  }
  if (!values.email) {
    error.email = "Required Email Address";
  }
  if (values.intrestedArea?.length == 0) {
    error.intrestedArea = "Required Interests";
  }
  if (!values.houseno) {
    error.houseno = "Required Address.";
  }
  if (!values.addressLine1) {
    error.addressLine1 = "Required Address line1";
  }
  if (!values.city) {
    error.city = "Required City";
  }
  if (!values.Country) {
    error.Country = "Required Country";
  }
  if (!values.state) {
    error.state = "Required state";
  }
  if (!values.zipCode) {
    error.zipCode = "Required PIN";
  }
  if (!values.hours) {
    error.hours = "Required Hours/day";
  }
  if (!values.phone) {
    error.phone = "Phone Number is required";
  }
  if (!values.salary) {
    error.salary = "Required Expected Salary";
  } else if (values.salary == 0) {
    error.salary = "Expected Salary must be greater than 0";
  }
  // if(!values.experienceInMonths){
  //      error.experienceInMonths = "Required experience in months"
  // }

  // if(!values.experienceInYears){
  //      error.experienceInYears = "Required experience in years"
  // }
  if (!values.working) {
    error.working = "Required Working Type";
  }
  if (values.working == 1) {
    if (!values.location) {
      error.location = "Required Working Location";
    }
  }
  //  else if (values.working == 2) {
  //   if (!values.timezone) {
  //     error.timezone = "Required Time-Zone";
  //   }
  // }
  if (!values.courseStatus) {
    error.courseStatus = "Required Status";
  }
  if (values.courseStatus == "ongoing" && !values.startDate) {
    error.startDate = "Required  College start-date";
  }
  if (values.courseStatus == "completed" && !values.endDate) {
    error.endDate = "Required College end-date";
  }
  if (values.courseStatus == "completed" && !values.startDate) {
    error.startDate = "Required College start-date";
  }
  if (!values.categoryOfJob) {
    error.categoryOfJob = "Required Category Of Job";
  }
  if (!values.collegeId) {
    error.collegeId = "Required college/university";
  }
  if (
    (values.collegeId == "d5436e27-34e0-11ed-984a-068f5cec9f16" &&
      !values.collegeOthers) ||
    (values.collegeId == "be1ef22b-34e0-11ed-984a-068f5cec9f16" &&
      !values.collegeOthers) ||
    (values.collegeId == "b0b26c3a-34e0-11ed-984a-068f5cec9f16" &&
      !values.collegeOthers) ||
    (values.collegeId == "cab1eccd-34e0-11ed-984a-068f5cec9f16" &&
      !values.collegeOthers) ||
    (values.collegeId == "a6032bdf-34e0-11ed-984a-068f5cec9f16" &&
      !values.collegeOthers)
  ) {
    error.collegeOthers = "Required college/university";
  }
  if (!values.qualificationId) {
    error.qualificationId = "Required qualification";
  }
  if (
    values.qualificationId == "879f9960-14ba-11ed-984a-068f5cec9f16" &&
    !values.qualification
  ) {
    error.qualification = "Required qualification";
  }
  if (values.skills?.length == 0) {
    error.skills = "Required Skills";
  }

  return error;
};

export default ProfileValidate;
