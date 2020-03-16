const bcrypt = require('bcrypt');
const { dbCli } = require('../config/database');
const { tokenGenerator } = require('../config/auth');
const { errorResponse } = require('../helpers/express');
const { scanUserByEmail } = require('../queries/user');

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
    if (response.Count === 0) return respond422('define message - 1');

    const foundUser = response.Items[0];

    comparePassword(
      password,
      foundUser.password,
      function comparePasswordCallback(err, isMatch) {
        if (err) return next(err);
        return isMatch
          ? res.status(202).send({ token: tokenGenerator(foundUser.uuid) })
          : respond422('define message - 2');
      }
    );
  });
}

module.exports = {
  postLogin,
};
