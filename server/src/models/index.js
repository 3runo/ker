const omit = require('lodash/fp/omit');
const patients = require('./patients');
const users = require('./users');

const requiredTables = { patients, users };

function onTableCreateCallBack(err, data) {
  if (err) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Created table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = function databaseMigration(dynamoDB) {
  console.log('Running database migration');
  dynamoDB.listTables({ Limit: 10 }, function onListTables(err, data) {
    if (err) {
      console.log('Database migration error', err.code);
    } else {
      const tablesToCreate = omit(data.TableNames, requiredTables);

      Object.entries(tablesToCreate).forEach(([tableName, tableSpecs]) => {
        console.log('creating table :', tableName);
        dynamoDB.createTable(tableSpecs, onTableCreateCallBack);
      });
    }
  });

  return undefined;
};
