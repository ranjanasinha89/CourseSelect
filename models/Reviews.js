const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  studentname: {
    type: String
  },
  coursenumber: {
    type: String
  },
  Reviews_Comment: {
    type: String
  },
  rating: {
    type: String
  }
});

module.exports = Reviews = mongoose.model("reviews", ReviewsSchema);
