const uuid = require("uuid");
const omit = require("lodash/fp/omit");
const { dynamoDBCli } = require("../config/database");
const { removeEmptyStringProps } = require("../helpers/pure");
const {
  itemInTable,
  keyInTable,
  unconditionallyUpdater
} = require("../helpers/dynamo-db");

const addItemInPatients = itemInTable("patients");
const addKeyInPatients = keyInTable("patients");
const omitHistoricalProps = omit(["uuid", "created"]);

function genericCallback(res) {
  return function genericCallbackInner(err, data) {
    if (err) {
      console.error("FAIL:", JSON.stringify(err, null, 2));
      res.status(500).send(err);
    } else {
      // console.log("SUCCESS:", JSON.stringify(data, null, 2));
      res.status(200).send(data);
    }
  };
}

function patients(req, res) {
  dynamoDBCli.scan({ TableName: "patients" }, genericCallback(res));
}

function patient(req, res) {
  if (req.method === "GET") {
    const params = addKeyInPatients({ uuid: req.params.id });
    dynamoDBCli.get(params, genericCallback(res));
    return;
  }

  if (req.method === "POST") {
    const params = addItemInPatients({
      ...removeEmptyStringProps(req.body),
      created: new Date().getTime(),
      uuid: uuid.v4()
    });

    dynamoDBCli.put(params, genericCallback(res));
    return;
  }

  if (req.method === "PUT") {
    const props = {
      ...omitHistoricalProps(removeEmptyStringProps(req.body)),
      updated: new Date().getTime()
    };
    const params = {
      ...addKeyInPatients({ uuid: req.params.id }),
      ...unconditionallyUpdater(props),
      ReturnValues: "UPDATED_NEW"
    };

    dynamoDBCli.update(params, genericCallback(res));
    return;
  }

  if (req.method === "DELETE") {
    const params = addKeyInPatients({ uuid: req.params.id });
    dynamoDBCli.delete(params, genericCallback(res));
    return;
  }

  res.status(200).send();
}

module.exports = {
  patients,
  patient
};
