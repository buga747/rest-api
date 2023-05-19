const { Schema, model } = require("mongoose");
const { handleMongooseSchemaError } = require("../utils/errors");

const contact = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contact.post("save", handleMongooseSchemaError);

const Contact = model("contact", contact);

module.exports = Contact;
