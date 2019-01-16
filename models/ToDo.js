const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  University_ID: {
    type: String
  },
  Todo_Comment: {
    type: String
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
