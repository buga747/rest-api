const { HttpError } = require("../utils/errors");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    } else {
      next();
    }
  };
};

module.exports = validateBody;
