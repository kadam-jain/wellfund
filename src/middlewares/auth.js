const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const token = authorization.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = {
  auth,
};
