const router = require("express").Router();
const organisationController = require("../controllers/organisation.controller");
const { auth } = require("../middlewares/auth");

router.get("/get", auth, organisationController.getAllOrganisations);

module.exports = router;
