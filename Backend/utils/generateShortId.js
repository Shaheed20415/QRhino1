const crypto = require("crypto");

module.exports = function generateShortId(length = 7) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};
