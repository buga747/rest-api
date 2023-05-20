const { HttpError } = require("../utils/errors");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const registerService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "Email is already used");
  }

  body.password = await bcrypt.hash(body.password, 12);
  return await User.create(body);
};

const loginService = () => {};

const logoutService = () => {};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
