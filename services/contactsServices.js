const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const Joi = require("joi");

const { HttpError } = require("../utils/HttpError");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(3).required(),
});

const contactsPath = path.join(__dirname, "..", "/models", "contacts.json");

const listContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();

  const contact = contacts.filter((contact) => contact.id === contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
};

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, 2, null));
  return deletedContact;
};

const addContactService = async (body) => {
  const { error } = contactSchema.validate(body);

  if (error) {
    throw new HttpError(400, "missing required name field");
  }

  const contacts = await listContactsService();
  const newContact = { id: crypto.randomUUID(), ...body };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, 2, null));
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contacts = await listContactsService();

  const { error } = contactSchema.validate(body);

  if (error) {
    throw new HttpError(400, "missing fields");
  }

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
