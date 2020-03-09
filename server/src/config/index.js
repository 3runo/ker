module.exports = function config(app) {
  return {
    onAppListen: require("./listen-feedback")(app)
  };
};
