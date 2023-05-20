const { ctrlWrapper } = require("../utils/decorators");
const { registerService } = require("../services/authServices");

const register = ctrlWrapper(async (req, res, next) => {
  const newUser = await registerService(req.body);
  res.status(201).json(newUser);
});

const login = ctrlWrapper((req, res, next) => {});

const logout = ctrlWrapper((req, res, next) => {});

module.exports = {
  register,
  login,
  logout,
};
