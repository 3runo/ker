const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { dbCli } = require('../config/database');
const { tokenGenerator } = require('../config/auth');
const { itemInTable } = require('../helpers/db');
const { getUserBy } = require('../queries/user');
const { errorResponse } = require('../helpers/express');

const addItemInUsers = itemInTable('users');
const queryUserUserByEmail = getUserBy('email');

// post /signup
function postSignup(req, res, next) {
  const { email, password } = req.body;
  const respond422 = errorResponse(res)(422);

  if (!email || !password) return respond422('Required fields are missing');

  dbCli.query(queryUserUserByEmail(email), function dbQuery(err, data) {
    if (err) return next(err);
    if (data.Count > 0) return respond422('Email is in use');

    bcrypt.hash(password, 10, function hashPassword(err, hashedPassword) {
      if (err) return next(err);

      const newUser = {
        email,
        password: hashedPassword,
        uuid: uuid.v4(),
        created: new Date().getTime(),
      };

      dbCli.put(addItemInUsers(newUser), function dbSave(err) {
        return err
          ? next(err)
          : res.status(202).send({ token: tokenGenerator(newUser.uuid) });
      });
    });
  });
}

module.exports = {
  postSignup,
};
