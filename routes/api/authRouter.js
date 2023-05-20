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

module.exports = { authRouter: router };
