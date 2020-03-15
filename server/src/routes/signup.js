const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { dbCli } = require("../config/database");
const { tokenGenerator } = require("../config/auth");
const { genericCallback } = require("../helpers/express");
const { itemInTable, queryFindUserByEmail } = require("../helpers/dynamo-db");

const addItemInUsers = itemInTable("users");

// post /signup
function postSignup(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ statusCode: 422, message: "Required fields are missing" });
  }

  dbCli.query(queryFindUserByEmail(email), function dbQuery(err, data) {
    if (err) return next(err);
    if (data.Count > 0) {
      return res
        .status(422)
        .send({ statusCode: 422, message: "Email is in use" });
    }

    bcrypt.hash(password, 10, function hashPassword(err, hashedPassword) {
      if (err) return next(err);

      const newUser = {
        email,
        password: hashedPassword,
        uuid: uuid.v4(),
        created: new Date().getTime()
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
  postSignup
};
