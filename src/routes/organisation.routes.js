const router = require("express").Router();
const organisationController = require("../controllers/organisation.controller");
const { auth, adminAuth } = require("../middlewares/auth");

router.post("/get", auth, organisationController.getAllOrganisations);
router.post("/create", adminAuth, organisationController.loginAdmin);

module.exports = router;
