const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { dbCli } = require('../config/database');
const { scanUserById } = require('../queries/user');

const jwtLogin = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: String(process.env.JWT_SECRET_KEY),
  },
  function jwtPassportStrategyCallback(payload, done) {
    dbCli.scan(scanUserById(payload.sub), function scanByIdCb(err, response) {
      if (err) return done(err, false);
      return response.Count > 0
        ? done(null, response.Items[0])
        : done(null, false);
    });
  }
);

passport.use(jwtLogin);

module.exports = {
  passport,
  jwtRequired: passport.authenticate('jwt', { session: false }),
};
