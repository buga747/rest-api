const express = require("express");
const contactsControllers = require("../../controllers/contactsControllers");

const { validateBody, isValidId } = require("../../middlewares");
const { contactValidationSchemas } = require("../../utils/validationSchemas");

const router = express.Router();

router
  .route("/")
  .get(contactsControllers.getContacts)
  .post(
    validateBody(contactValidationSchemas.createContactValidationSchema),
    contactsControllers.addContact
  );

router
  .route("/:contactId")
  .get(isValidId, contactsControllers.getContact)
  .delete(isValidId, contactsControllers.removeContact)
  .put(
    isValidId,
    validateBody(contactValidationSchemas.createContactValidationSchema),
    contactsControllers.updateContact
  );

router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBody(contactValidationSchemas.updateFavoriteContactSchema),
    contactsControllers.updateStatusContact
  );

module.exports = { contactsRouter: router };
