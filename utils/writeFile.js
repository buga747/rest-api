const fs = require("fs/promises");

const writeFile = (path, data) => {
  return fs.writeFile(path, JSON.stringify(data, 2, null));
};

module.exports = { writeFile };
