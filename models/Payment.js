const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({

  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  creditcardnumber : {
    type: String,
    required: true
  },
  expirationmonthyear : {
    type: String,
    required: true
  },
  ccv : {
    type: String,
    required: true
  },


  });

module.exports = TheSchemaPayment = mongoose.model("payment", PaymentSchema);
