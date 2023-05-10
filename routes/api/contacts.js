const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.route("/").get(listContacts).post(addContact);

router
  .route("/:contactId")
  .get(getContactById)
  .delete(removeContact)
  .put(updateContact);

module.exports = router;
