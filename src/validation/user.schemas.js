const Joi = require("joi");

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  mobile: Joi.string().min(10).max(10).required(),
  pincode: Joi.number().min(6).max(6),
  state: Joi.string(),
  city: Joi.string(),
  address: Joi.string(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  userType: Joi.string()
});

module.exports = {
  registerUserSchema,
  loginUserSchema
};
