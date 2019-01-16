const isEmpty = require("./is_empty");
const Validator = require("validator");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.coursenumber = !isEmpty(data.coursenumber) ? data.coursenumber : "";

  if (!Validator.isLength(data.name, { min: 5, max: 50 })) {
    errors.name = "Course Name needs to be atleast 5 characters long";
  }

  if (!Validator.isLength(data.description, { min: 30, max: 500 })) {
    errors.description =
      "Course description needs to be atleast 30 characters long";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Course Name is required";
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = "Department is required";
  }
  if (Validator.isEmpty(data.coursenumber)) {
    errors.coursenumber = "Course Number is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Course Description is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Class Location is required";
  }

  if (Validator.isEmpty(data.schedule)) {
    errors.schedule = "Class Schedule is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
