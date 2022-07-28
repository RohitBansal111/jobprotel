const LoginValidator = (values) => {
  const error = {};
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const pwd = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
  );

  if (!values.userName) {
    error.userName = "Required valid Email Address";
  } else if (!regex.test(values.userName)) {
    error.userName = "Please enter a valid email address";
  }
  if (!values.password) {
    error.password = "Required valid Password";
  } else if (!pwd.test(values.password)) {
    error.password =
      "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.";
  }
  console.log(error,"error")
  return error;
};

export default LoginValidator;
