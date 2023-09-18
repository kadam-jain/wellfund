const { logger } = require("../../winston");
const {
  loginAdminService
} = require("../services/admin.services");

async function loginAdmin(req, res, next) {
  try {
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
