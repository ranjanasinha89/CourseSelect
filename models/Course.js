const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coursenumber: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  officehours: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: false
  },
  semester: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Course = mongoose.model("course", CourseSchema);
