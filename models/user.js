const { Schema, model } = require("mongoose");
const { handleMongooseSchemaError } = require("../utils/errors");

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: [true, "avatarURL is required"],
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },

    token: String,
  },
  { versionKey: false, timestamps: true }
);

user.post("save", handleMongooseSchemaError);

const User = model("user", user);

module.exports = { User };
