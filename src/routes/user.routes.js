const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.patch("/update", auth, userController.updateUser);

module.exports = router;
