const Joi = require("joi");

const createContactValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiContactValidationSchemas = {
  createContactValidationSchema,
  updateFavoriteContactSchema,
};

module.exports = joiContactValidationSchemas;
