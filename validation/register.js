const isEmpty = require("./is_empty");
const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.universityid = !isEmpty(data.universityid) ? data.universityid : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be betweeb 3 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Emain is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password too short";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password cannot be empty";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords should match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
