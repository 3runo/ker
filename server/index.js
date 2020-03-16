const app = require('express')();
const bodyParser = require('body-parser');
const compression = require('compression');
const { onAppListen } = require('./src/config')(app);
const { dynamoDB } = require('./src/config/database');
const modelsMigration = require('./src/models');
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
app.post('/signup', routeSignup.postSignup);
app.post('/login', routeLogin.postLogin);

app.get('/patients', routePatient.getPatients);

app.post('/patient', routePatient.postPatient);
app.get('/patient/:id', routePatient.getPatient);
app.put('/patient/:id', routePatient.putPatient);
app.delete('/patient/:id', routePatient.deletePatient);

// App initialization
app.set('port', port);
app.listen(port, onAppListen);

// Database
if (!isDevelopment) {
  modelsMigration(dynamoDB);
}
