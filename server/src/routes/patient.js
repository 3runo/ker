const uuid = require('uuid');
const omit = require('lodash/fp/omit');
const { dbCli } = require('../config/database');
const { removeEmptyStringProps } = require('../helpers/pure');
const { genericCallback } = require('../helpers/express');
const {
  itemInTable,
  keyInTable,
  unconditionallyUpdater,
} = require('../helpers/db');

const addItemInPatients = itemInTable('patients');
const addKeyInPatients = keyInTable('patients');
const omitHistoricalProps = omit(['uuid', 'created']);

// get /patients
function getPatients(_, res) {
  dbCli.scan({ TableName: 'patients' }, genericCallback(res));
}

// get /patient/:id
function getPatient(req, res) {
  const params = addKeyInPatients({ uuid: req.params.id });
  dbCli.get(params, genericCallback(res));
}

// post /patient
function postPatient(req, res) {
  const params = addItemInPatients({
    ...removeEmptyStringProps(req.body),
    created: new Date().getTime(),
    uuid: uuid.v4(),
  });

  dbCli.put(params, genericCallback(res));
}

// put /patient/:id
function putPatient(req, res) {
  const props = {
    ...omitHistoricalProps(removeEmptyStringProps(req.body)),
    updated: new Date().getTime(),
  };
  const params = {
    ...addKeyInPatients({ uuid: req.params.id }),
    ...unconditionallyUpdater(props),
    ReturnValues: 'UPDATED_NEW',
  };

  dbCli.update(params, genericCallback(res));
}

// delete /patient/:id
function deletePatient(req, res) {
  const params = addKeyInPatients({ uuid: req.params.id });
  dbCli.delete(params, genericCallback(res));
}

module.exports = {
  getPatients,
  getPatient,
  postPatient,
  putPatient,
  deletePatient,
};
