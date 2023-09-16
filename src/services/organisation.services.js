const Organisation = require("../models/Organisation");

async function getAllOrganisationsService() {
  const organisations = await Organisation.find({});
  return {
    error: false,
    message: "List fetched!",
    data: organisations,
  };
}

module.exports = {
  getAllOrganisationsService,
};
