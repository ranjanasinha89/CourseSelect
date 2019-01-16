const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaidSchema = new Schema({
  University_ID: {
    type: String
  },
  Name: {
    type: String
  },
  faid: {
    type: String
  }
});

module.exports = Faid = mongoose.model("faid", FaidSchema);
