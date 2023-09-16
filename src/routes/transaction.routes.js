const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/create-order", transactionController.createOrder);
router.post("/webhook", transactionController.webhook);

module.exports = router;
