const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 10 
    },
    pincode:{
      type: Number,
      minlength: 6,
      maxlength: 6 
    },
    address:{
      type: String
    },
    city:{
      type: String
    },
    state: {
      type: String
    },
    type:{
      type: String
    }

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
