const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerNewUserService(data) {
  const { email, password, name, mobile } = data;
  const user = await User.findOne({ email });
  if (user) {
    return {
      error: true,
      message: "user already exists!",
    };
  }
  const newPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
  const newUser = await User.create({
    name,
    email,
    password: newPassword,
    mobile,
  });
  delete newUser.password;
  return {
    error: false,
    message: "user added successfully!",
    data: {
      name,
      email,
      _id: newUser._id,
      mobile,
    },
  };
}

async function loginUserService(data) {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: true,
      message: "user doesn't exist!",
    };
  }

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    return {
      error: true,
      message: "invalid credentials",
    };

  const token = await jwt.sign(
    { name: user.name, email, id: user._id },
    process.env.SECRET,
    { expiresIn: process.env.EXPIRY }
  );

  return {
    error: false,
    message: "Login success!",
    data: { token },
  };
}

async function updateUserService(data, id) {
  const user = User.findById(id);
  if (!user) {
    return {
      error: true,
      message: "user doesn't exist!",
    };
  }
  const updateDetails = await User.findByIdAndUpdate(id, data, { new: true });
  return {
    error: false,
    message: "user updated successfully!",
    data: updateDetails,
  };
}

async function getUserByIdService(id) { 
  const user = await User.findById(id);
  return {
    error: false,
    message: "user fetched",
    data: user,
  };
}

module.exports = {
  registerNewUserService,
  loginUserService,
  updateUserService,
  getUserByIdService,
};
