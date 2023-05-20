const Contact = require("../models/contact");

function getContactsService(page, limit, favorite) {
  const skip = (page - 1) * limit;
  const filter = {};
  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }

  return Contact.find(filter).skip(skip).limit(limit);
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
