const curryN = require('lodash/fp/curryN');

function getUserBy(prop, value) {
  return {
    TableName: 'users',
    KeyConditionExpression: '#k = :value',
    ExpressionAttributeNames: { '#k': prop },
    ExpressionAttributeValues: { ':value': value },
  };
}

function scanUserById(uuid) {
  return {
    TableName: 'users',
    ProjectionExpression: '#uuid, email, userName',
    FilterExpression: '#uuid = :value',
    ExpressionAttributeNames: { '#uuid': 'uuid' },
    ExpressionAttributeValues: { ':value': uuid },
  };
}

function scanUserByEmail(email) {
  return {
    TableName: 'users',
    ProjectionExpression: '#uuid, email, password, userName',
    FilterExpression: '#email = :value',
    ExpressionAttributeNames: { '#email': 'email', '#uuid': 'uuid' },
    ExpressionAttributeValues: { ':value': email },
  };
}

module.exports = {
  getUserBy: curryN(2, getUserBy),
  scanUserByEmail,
  scanUserById,
};
