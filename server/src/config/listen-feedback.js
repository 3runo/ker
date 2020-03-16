module.exports = function listenFeedback(app) {
  return function onListen() {
    console.log(
      '[server] App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    );
  };
};
