const { ctrlWrapper } = require("../utils/decorators");
const {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
  updateAvatarService,
  verifyEmailService,
} = require("../services/authServices");

const register = ctrlWrapper(async (req, res, next) => {
  const newUser = await registerService(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
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

const logout = ctrlWrapper(async (req, res, next) => {
  await logoutService(req.user);
  res.status(204).json();
});

const getCurrent = ctrlWrapper(async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
});

const updateSubscription = ctrlWrapper(async (req, res, next) => {
  const updatedUser = await updateSubscriptionService(req);

  res.status(201).json({
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
});

const updateAvatar = ctrlWrapper(async (req, res, next) => {
  const { id } = req.user;

  const updatedUser = await updateAvatarService(id, req.file);

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
});

const verifyEmail = ctrlWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;

  await verifyEmailService(verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
};
