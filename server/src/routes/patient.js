const uuid = require("uuid");
const { dynamoDB, dynamoDBCli } = require("../config/database");
const { tryParseNumber } = require("../helpers/pure");
const { itemInTable, keyInTable } = require("../helpers/dynamo-db");

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
    const id = tryParseNumber(req.params.id);
    const params = findInPatients({ id: { N: String(id) } });
    dynamoDB.getItem(params, genericCB(res));
    return;
  } else if (req.method === "POST") {
    const params = addInPatients({
      address: "address",
      birthday: "birthday",
      email: "name@domain.com",
      firstContact: "firstContact",
      name: "name",
      notes: "notes",
      phone: "phone",
      created: new Date().getTime(),
      uuid: uuid.v4()
    });

    dynamoDBCli.put(params, genericCB(res));
    return;
  } else if (req.method === "DELETE") {
    const params = findInPatients({ id: { N: "4" } });
    dynamoDB.deleteItem(params, genericCB(res));
    return;
  }

  res.status(200).send();
}

module.exports = {
  patients,
  patient
};
