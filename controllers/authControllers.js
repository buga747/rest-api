const { ctrlWrapper } = require("../utils/decorators");
const { registerService, loginService } = require("../services/authServices");

const register = ctrlWrapper(async (req, res, next) => {
  const newUser = await registerService(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

const login = ctrlWrapper(async (req, res, next) => {
  const { user, token } = await loginService(req.body);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

const logout = ctrlWrapper((req, res, next) => {});

module.exports = {
  register,
  login,
  logout,
};
