const jwt = require('jwt-simple');
const jwtSecret = String(process.env.JWT_SECRET_KEY);

function tokenGenerator(userId) {
  return jwt.encode({ sub: userId, iat: new Date().getTime() }, jwtSecret);
}

module.exports = {
  tokenGenerator,
};
