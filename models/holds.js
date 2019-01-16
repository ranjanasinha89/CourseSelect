const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoldsSchema = new Schema({
  University_ID: {
    type: String
  },
  Holds_Comment: {
    type: String
  }
});

module.exports = Holds = mongoose.model("holds", HoldsSchema);
