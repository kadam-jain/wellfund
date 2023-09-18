const Organisation = require("../models/Organisation");

async function getAllOrganisationsService() {
  const organisations = await Organisation.find({});
  return {
    error: false,
    message: "List fetched!",
    data: organisations,
  };
}

async function createCampaignService(data) {
  const campaign = await Organisation.create(data);
  return {
    error: false,
    message: "Campaign created!",
    data: campaign,
  };
}

module.exports = {
  getAllOrganisationsService,
  createCampaignService,
};
