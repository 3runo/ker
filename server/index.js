const app = require('express')();
const bodyParser = require('body-parser');
const compression = require('compression');
const { onAppListen } = require('./src/config')(app);
const { dynamoDB } = require('./src/config/database');
const modelsMigration = require('./src/models');
const { jwtRequired } = require('./src/services/passport');
const routeRoot = require('./src/routes/root');
const routeSignup = require('./src/routes/signup');
const routeLogin = require('./src/routes/login');
const routePatient = require('./src/routes/patient');

const port = process.env.PORT || 4000;
const isDevelopment = process.env.NODE_ENV === 'development';

// Middlewares
app.use(compression()); // compresses requests
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', routeRoot);
app.get('/validate-token/:token', routeLogin.getValidateToken);
app.post('/login', routeLogin.postLogin);
app.post('/signup', routeSignup.postSignup);

// Authenticated routes
app.get('/patients', jwtRequired, routePatient.getPatients);
app.post('/patient', jwtRequired, routePatient.postPatient);
app.get('/patient/:id', jwtRequired, routePatient.getPatient);
app.put('/patient/:id', jwtRequired, routePatient.putPatient);
app.delete('/patient/:id', jwtRequired, routePatient.deletePatient);

// App initialization
app.set('port', port);
app.listen(port, onAppListen);

// Database
if (!isDevelopment) {
  modelsMigration(dynamoDB);
}
