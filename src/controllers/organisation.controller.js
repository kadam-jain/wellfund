const { logger } = require("../../winston");
const {
  getAllOrganisationsService, createCampaignService,
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

async function createCampaign(req, res, next) {
  try {
    const campaign = await createCampaignService(req.body);
    res.status(200).json(campaign);
  } catch (err) {
    logger.error(err);
    next();
  }
}

module.exports = {
  getAllOrganisations,
  createCampaign
};
