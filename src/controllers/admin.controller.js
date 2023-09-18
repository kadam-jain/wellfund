const { logger } = require("../../winston");
const { loginAdminService } = require("../services/admin.services");
const { loginUserSchema } = require("../validation/user.schemas");

async function loginAdmin(req, res, next) {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error?.details[0]) {
      return res.status(400).json({
        error: true,
        data: error.details[0],
      });
    }
    const admin = await loginAdminService(req.body);
    res.status(200).json(admin);
  } catch (err) {
    logger.error(err);
    next();
  }
}

module.exports = {
  loginAdmin,
};
