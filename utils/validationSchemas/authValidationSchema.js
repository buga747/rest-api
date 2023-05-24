const Joi = require("joi");

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "sting.pattern.base":
      "Password should contain minimum eight characters, at least one letter and one number",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.boolean()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Favorite is a required field",
    }),
});

const authValidationSchemas = {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
};

module.exports = authValidationSchemas;
