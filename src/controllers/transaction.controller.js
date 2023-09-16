const { logger } = require("../../winston");
const {
  createOrderService,
  webhookService,
} = require("../services/transaction.service");
const { createOrderSchema } = require("../validation/transaction.schema");

async function createOrder(req, res, next) {
  try {
    const { error } = createOrderSchema.validate(req.body);
    if (error?.details[0]) {
      return res.status(400).json({
        error: true,
        data: error.details[0],
      });
    }
    const { amount, organisationId } = req.body;
    const id = req.user.id;
    const transaction = await createOrderService({
      amount,
      organisationId,
      id,
    });
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
  webhook,
};
