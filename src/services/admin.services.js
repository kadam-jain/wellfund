const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function loginAdminService(data) {
  const { email, password } = data;
  const user = await User.findOne({ email, type: "super-admin" });
  if (!user) {
    return {
      error: true,
      message: "admin doesn't exist!",
    };
  }

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    return {
      error: true,
      message: "invalid credentials",
    };

  const token = await jwt.sign(
    { name: user.name, email, id: user._id, type: "super-admin" },
    process.env.SECRET,
    { expiresIn: process.env.EXPIRY }
  );

  return {
    error: false,
    message: "Login success!",
    data: { token, type: "super-admin" },
  };
}

module.exports = {
  loginAdminService,
};
