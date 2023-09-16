const { logger } = require("../../winston");
const { createOrderService, webhookService } = require("../services/transaction.service");

async function createOrder(req, res, next) {
  try {
    const transaction = await createOrderService(req.body.amount);
    res.status(200).json(transaction);
  } catch (err) {
    logger.error(err);
    next();
  }
}
async function webhook(req, res, next) {
  try {
    const transaction = await webhookService(req.body);
    res.status(200).json(transaction);
  } catch (err) {
    logger.error(err);
    next();
  }
}

module.exports = {
  createOrder,
  webhook
};
