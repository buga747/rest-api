const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils/errors");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(new HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
