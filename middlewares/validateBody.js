const { HttpError } = require("../utils/errors");

const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
