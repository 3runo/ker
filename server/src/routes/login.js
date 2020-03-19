const bcrypt = require('bcrypt');
const { dbCli } = require('../config/database');
const { generateJwtToken, decodeJwtToken } = require('../config/auth');
const { errorResponse } = require('../helpers/express');
const { scanUserByEmail, scanUserById } = require('../queries/user');

function comparePassword(candidatePassword, currentPassword, callback) {
  bcrypt.compare(
    candidatePassword,
    currentPassword,
    function bcryptCompareCallback(err, isMatch) {
      return err ? callback(err) : callback(null, isMatch);
    }
  );
}

// post /login
function postLogin(req, res, next) {
  const { email, password } = req.body;
  const respond422 = errorResponse(res)(422);

  if (!email || !password) return respond422('Required fields are missing');

  dbCli.scan(scanUserByEmail(email), function scanByEmailCb(err, response) {
    if (err) return next(err);
    if (response.Count === 0) return respond422('User not registered');

    const foundUser = response.Items[0];

    comparePassword(
      password,
      foundUser.password,
      function comparePasswordCallback(err, isMatch) {
        if (err) return next(err);
        return isMatch
          ? res.status(202).send({
              token: generateJwtToken(foundUser.uuid),
              userName: foundUser.userName,
            })
          : respond422('Invalid credentials');
      }
    );
  });
}

// get /validate-token/:token
function getValidateToken(req, res, next) {
  const respond422 = errorResponse(res)(422);
  const token = req.params.token;
  const { sub: uuid } = decodeJwtToken(token);

  if (uuid) {
    dbCli.scan(scanUserById(uuid), function scanByIdCb(err, response) {
      if (err) return next(err);
      return response.Count > 0
        ? res.status(200).send({
            token,
            userName: response.Items[0].userName,
          })
        : respond422('Invalid credentials');
    });
  } else {
    return respond422('Invalid credentials');
  }
}

module.exports = {
  getValidateToken,
  postLogin,
};
