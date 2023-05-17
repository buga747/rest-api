const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsControllers");

const { validateBody, isValidId } = require("../../middlewares");
const { joiSchemas } = require("../../schemas");

const router = express.Router();

router
  .route("/")
  .get(listContacts)
  .post(validateBody(joiSchemas.contactSchema), addContact);

router
  .route("/:contactId")
  .get(isValidId, getContactById)
  .delete(isValidId, removeContact)
  .put(isValidId, validateBody(joiSchemas.contactSchema), updateContact);

module.exports = router;
