const { logger } = require("../../winston");
const {
  getAllOrganisationsService,
} = require("../services/organisation.services");

async function getAllOrganisations(req, res, next) {
  try {
    const organisations = await getAllOrganisationsService();
    res.status(200).json(organisations);
  } catch (err) {
    logger.error(err);
    next();
  }
}

module.exports = {
  getAllOrganisations,
};
