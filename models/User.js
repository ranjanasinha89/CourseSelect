const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true
  },
  user_type: {
    type: String
  },
  university_id: {
    type: String
  },
  local: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    randomSecretToken: {
      type: String
    },
    active: {
      type: Boolean
    },
    avatar: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
