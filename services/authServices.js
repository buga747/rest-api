const { HttpError } = require("../utils/errors");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY, PROJECT_URL } = process.env;

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const sendEmail = require("../utils/sendEmail");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registerService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "Email is already used");
  }
  const avatarURL = gravatar.url(body.email);
  const hasedPassword = await bcrypt.hash(body.password, 12);

  const verificationToken = uuidv4();

  const verifyEmail = {
    to: body.email,
    subject: "Email verification from Contacts",
    html: `<strong>Please verify your email by clicking this <a target="_blank" href="${PROJECT_URL}/users/auth/verify/${verificationToken}">verification link</a></strong>`,
  };

  await sendEmail(verifyEmail);

  return await User.create({
    ...body,
    password: hasedPassword,
    avatarURL,
    verificationToken,
  });
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw new HttpError(401, "Please verify your email");
  }

  const passwordCompare = await bcrypt.compare(body.password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  await User.findByIdAndUpdate(user._id, { token });

  return { user, token };
};

const logoutService = (user) => {
  const { _id } = user;
  return User.findByIdAndUpdate(_id, { token: null });
};

const updateSubscriptionService = (req) => {
  const user = req.user;
  const { subscription } = req.body;

  return User.findByIdAndUpdate(user._id, { subscription }, { new: true });
};

const updateAvatarService = async (userId, file) => {
  const { path: tempUpload, originalname } = file;
  const extension = originalname.split(".").pop();

  const image = await Jimp.read(`temp/${originalname}`);
  image.resize(250, 250);
  // image.writeAsync(`temp/${originalname}`);

  const filename = `${userId}.${extension}`;
  const uploadFullPath = path.join(avatarDir, filename);

  fs.rename(tempUpload, uploadFullPath);
  const avatarURL = path.join("avatars", filename);

  return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
};

const verifyEmailService = async (token) => {
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return User.findByIdAndUpdate(
    user._id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );
};

const resentVerifyEmailService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: user.email,
    subject: "Email verification from Contacts",
    html: `<strong>Please verify your email by clicking this <a target="_blank" href="${PROJECT_URL}/users/auth/verify/${user.verificationToken}">verification link</a></strong>`,
  };

  await sendEmail(verifyEmail);
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
  updateAvatarService,
  verifyEmailService,
  resentVerifyEmailService,
};
