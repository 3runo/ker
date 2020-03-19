const jwt = require('jwt-simple');
const jwtSecret = String(process.env.JWT_SECRET_KEY);

function generateJwtToken(userId) {
  return jwt.encode({ sub: userId, iat: new Date().getTime() }, jwtSecret);
}

function decodeJwtToken(token) {
  try {
    return jwt.decode(token, jwtSecret);
  } catch (error) {
    return {};
  }
}

module.exports = {
  decodeJwtToken,
  generateJwtToken,
};
