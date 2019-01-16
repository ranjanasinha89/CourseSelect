const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  studentid: {
    type: String
  },
  coursenumber: {
    type: String
  },
  grade: {
    type: String
  }
});

module.exports = Grade = mongoose.model("grade", GradeSchema);
