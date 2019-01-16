const isEmpty = require("./is_empty");
const Validator = require("validator");

module.exports = function validateVerificationUser(data) {
  let errors = {};
  data.secrettoken = !isEmpty(data.secrettoken) ? data.secrettoken : "";

  if (Validator.isEmpty(data.secrettoken)) {
    errors.secrettoken = "Secret token is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
