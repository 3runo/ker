const jwt = require("jwt-simple");

function tokenGenerator(userId) {
  return jwt.encode(
    { sub: userId, iat: new Date().getTime() },
    String(process.env.JWT_SECRET_KEY)
  );
}

module.exports = {
  tokenGenerator
};
