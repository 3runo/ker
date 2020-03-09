module.exports = function listenFeedback(app) {
  return function onListen() {
    console.log(
      "  [node] App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  press CTRL-C to stop\n");
  };
};
