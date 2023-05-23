const express = require("express");
const contactsControllers = require("../../controllers/contactsControllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactValidationSchemas } = require("../../utils/validationSchemas");

const router = express.Router();

router
  .route("/")
  .get(authenticate, contactsControllers.getContacts)
  .post(
    authenticate,
    validateBody(contactValidationSchemas.createContactValidationSchema),
    contactsControllers.addContact
  );

router
  .route("/:contactId")
  .get(authenticate, isValidId, contactsControllers.getContact)
  .delete(authenticate, isValidId, contactsControllers.removeContact)
  .put(
    authenticate,
    isValidId,
    validateBody(contactValidationSchemas.createContactValidationSchema),
    contactsControllers.updateContact
  );

router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(contactValidationSchemas.updateFavoriteContactSchema),
    contactsControllers.updateStatusContact
  );

module.exports = { contactsRouter: router };
