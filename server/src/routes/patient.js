const uuid = require("uuid");
const { dynamoDB, dynamoDBCli } = require("../config/database");
const { itemInTable, keyInTable } = require("../helpers/dynamo-db");
const { removeEmptyStringProps } = require("../helpers/pure");

const addInPatients = itemInTable("patients");
const findInPatients = keyInTable("patients");

function genericCB(res) {
  return function genericCBInner(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  };
}

function patients(req, res) {
  dynamoDBCli.scan({ TableName: "patients" }, genericCB(res));
}

function patient(req, res) {
  if (req.method === "GET") {
    const params = findInPatients({ uuid: { S: req.params.id } });
    dynamoDB.getItem(params, genericCB(res));
    return;
  } else if (req.method === "POST") {
    const params = addInPatients({
      ...removeEmptyStringProps(req.body),
      created: new Date().getTime(),
      uuid: uuid.v4()
    });

    dynamoDBCli.put(params, genericCB(res));
    return;
  } else if (req.method === "DELETE") {
    const params = findInPatients({ uuid: { S: req.params.id } });
    dynamoDB.deleteItem(params, genericCB(res));
    return;
  }

  res.status(200).send();
}

module.exports = {
  patients,
  patient
};
