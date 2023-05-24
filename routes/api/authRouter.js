const express = require("express");
const authControllers = require("../../controllers/authControllers");

const { validateBody, authenticate } = require("../../middlewares");
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

router.post("/logout", authenticate, authControllers.logout);

router.get("/current", authenticate, authControllers.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(authValidationSchemas.updateSubscriptionSchema),
  authControllers.updateSubscription
);

module.exports = { authRouter: router };
