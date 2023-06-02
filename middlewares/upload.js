const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 5 * Math.pow(2, 20) },
});

module.exports = upload;
