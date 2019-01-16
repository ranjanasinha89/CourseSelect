const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EdatesSchema = new Schema({
  University_ID: {
    type: String
  },
  Edates: {
    type: String
  }
});

module.exports = Edates = mongoose.model("edates", EdatesSchema);
