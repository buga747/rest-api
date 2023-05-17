const express = require("express");
const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const { validateBody, isValidId } = require("../../middlewares");
const { joiSchemas } = require("../../utils/schemas");

const router = express.Router();

router
  .route("/")
  .get(getContacts)
  .post(validateBody(joiSchemas.contactSchema), addContact);

router
  .route("/:contactId")
  .get(isValidId, getContact)
  .delete(isValidId, removeContact)
  .put(isValidId, validateBody(joiSchemas.contactSchema), updateContact);

router
  .route("/:contactId/favorite")
  .patch(
    isValidId,
    validateBody(joiSchemas.updateFavoriteSchema),
    updateStatusContact
  );

module.exports = router;
