const Step3Validator = (values) => {
  const error = {};
  const number = /^0|[1-9]\d*$/;

  if (!values.collegeId) {
    error.collegeId = "Required College Name";
  }
  if (!values.experienceInYears) {
    error.experienceInYears = "Required Years";
  }
  if (!values.experienceInMonths) {
    error.experienceInMonths = "Required Month";
  }
  if (!values.expectedSalary) {
    error.expectedSalary = "Required Salary";
  }
  if (!values.days) {
    error.days = "Required Days/week";
  }
  if (!values.workHoursPerDay) {
    error.workHoursPerDay = "Required Hours/day";
  }
  if (!values.category) {
    error.category = "Required Category";
  }
  
  if(!values.skills || values.skills && values.skills.length ===0){
    error.skills = "Required Skills"
 }
  if (!values.workingType) {
    error.workingType = "Required Working Type";
  }
  if(!values.certificate){
       error.certificate = "Required Certificate"
  }
  return error;
};

export default Step3Validator;
