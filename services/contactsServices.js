const Contact = require("../models/contact");
const { HttpError } = require("../utils/errors");

function getContactsService(user, page, limit, favorite) {
  const { _id: owner } = user;

  const skip = (page - 1) * limit;
  const filter = {};
  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }

  return Contact.find({ owner }, "-createdAt -updatedAt", filter)
    .skip(skip)
    .limit(limit);
}

const getContactService = (contactId) => {
  return Contact.findById(contactId);
};

const addContactService = async (req) => {
  const { _id: owner } = req.user;
  const newContact = req.body;

  const existingEmailInUserContacts = await Contact.findOne({
    email: newContact.email,
    owner,
  });

  if (existingEmailInUserContacts) {
    throw new HttpError(
      409,
      `Contact with email ${newContact.email} already in your contacts`
    );
  }

  const existingNumberInUserContacts = await Contact.findOne({
    phone: newContact.phone,
    owner,
  });

  if (existingNumberInUserContacts) {
    throw new HttpError(
      409,
      `Contact with phone ${newContact.phone} already in your contacts`
    );
  }

  const result = await Contact.create({ ...newContact, owner });

  return result;
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
