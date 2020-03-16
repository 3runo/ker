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
    ProjectionExpression: '#key, email',
    FilterExpression: '#key = :value',
    ExpressionAttributeNames: { '#key': 'uuid' },
    ExpressionAttributeValues: { ':value': uuid },
  };
}

function scanUserByEmail(email) {
  return {
    TableName: 'users',
    ProjectionExpression: '#id, email, password',
    FilterExpression: '#key = :value',
    ExpressionAttributeNames: { '#key': 'email', '#id': 'uuid' },
    ExpressionAttributeValues: { ':value': email },
  };
}

module.exports = {
  getUserBy: curryN(2, getUserBy),
  scanUserByEmail,
  scanUserById,
};
