const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");
const { auth } = require("../middlewares/auth");

router.post("/create-order", auth, transactionController.createOrder);
router.post("/webhook", transactionController.webhook);

module.exports = router;
