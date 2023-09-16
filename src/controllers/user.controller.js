const { logger } = require("../../winston");
const {
  registerNewUserService,
  loginUserService,
  updateUserService,
} = require("../services/user.services");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../validation/user.schemas");

async function registerNewUser(req, res, next) {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error?.details[0]) {
      return res.status(400).json({
        error: true,
        data: error.details[0],
      });
    }
    const user = await registerNewUserService(req.body);
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    next();
  }
}
async function loginUser(req, res, next) {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error?.details[0]) {
      return res.status(400).json({
        error: true,
        data: error.details[0],
      });
    }
    const user = await loginUserService(req.body);
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    next();
  }
}
async function updateUser(req, res, next) {
  try {
    const user = await updateUserService(req.body, req.user.id);
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    next();
  }
}

module.exports = { registerNewUser, loginUser, updateUser };
