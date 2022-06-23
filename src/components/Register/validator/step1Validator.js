const Step1Validator = (values) => {
  const error = {};
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const pwd = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
  );
  if (!values.firstName) {
    error.firstName = "Required First Name";
  }
  if (!values.lastName) {
    error.lastName = "Required Last Name";
  }
  if (!values.email) {
    error.email = "Required Email Address";
  } else if (!regex.test(values.email)) {
    error.email = "Please enter a valid email address";
  }
  if (!values.password) {
    error.password = "Required Password";
  } else if (!pwd.test(values.password)) {
    error.password =
      "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.";
  }
  if (!values.confirmPassword) {
    error.confirmPassword = "Required Confirm Password";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "Password doest not match";
  }
  return error;
};

export default Step1Validator;
