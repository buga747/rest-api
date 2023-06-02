const { HttpError } = require("../utils/errors");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const registerService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "Email is already used");
  }
  const avatarURL = gravatar.url(body.email);
  const hasedPassword = await bcrypt.hash(body.password, 12);
  return await User.create({ ...body, password: hasedPassword, avatarURL });
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
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

module.exports = {
  registerService,
  loginService,
  logoutService,
  updateSubscriptionService,
  updateAvatarService,
};
