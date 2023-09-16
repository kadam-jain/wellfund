const Joi = require("joi");
const createOrderSchema = Joi.object({
  organisationId: Joi.string().required(),
  amount: Joi.number().required(),
});

module.exports = {
  createOrderSchema,
};
