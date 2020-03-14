const app = require("express")();
const bodyParser = require("body-parser");
const compression = require("compression");
const { onAppListen } = require("./src/config")(app);
const { dynamoDB } = require("./src/config/database");
const modelsMigration = require("./src/models");
const routePatient = require("./src/routes/patient");
const routeRoot = require("./src/routes/root");
const port = process.env.PORT || 4000;
const isDevelopment = process.env.NODE_ENV === "development";

// Middlewares
app.use(compression()); // compresses requests
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", routeRoot);
app.get("/patients", routePatient.patients);
app.post("/patient", routePatient.patient);
app.get("/patient/:id", routePatient.patient);
app.put("/patient/:id", routePatient.patient);
app.delete("/patient/:id", routePatient.patient);

// App initialization
app.set("port", port);
app.listen(port, onAppListen);

// Database
if (!isDevelopment) {
  modelsMigration(dynamoDB);
}
