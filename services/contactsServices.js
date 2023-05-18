const Contact = require("../models/contact");

function getContactsService() {
  return Contact.find();
}

const getContactService = (contactId) => {
  return Contact.findById(contactId);
};

const addContactService = (newContact) => {
  return Contact.create(newContact);
};

const updateContactService = (contactId, updatedContact) => {
  return Contact.findByIdAndUpdate(contactId, updatedContact, {
    new: true,
  });
};

const updateStatusContactService = (contactId, newStatus) => {
  return Contact.findByIdAndUpdate(contactId, newStatus, {
    new: true,
  });
};

const removeContactService = (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

module.exports = {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
