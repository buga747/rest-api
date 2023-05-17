const ctrlWrapper = (cntrl) => {
  return async (req, res, next) => {
    try {
      await cntrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { ctrlWrapper };
