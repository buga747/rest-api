const express = require("express");
const authControllers = require("../../controllers/authControllers");

const { validateBody } = require("../../middlewares");
const { authValidationSchemas } = require("../../utils/validationSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(authValidationSchemas.createUserValidationSchema),
  authControllers.register
);

router.post(
  "/login",
  validateBody(authValidationSchemas.loginValidationSchema),
  authControllers.login
);

module.exports = { authRouter: router };
