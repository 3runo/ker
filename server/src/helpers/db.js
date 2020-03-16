const curryN = require('lodash/fp/curryN');

function itemInTable(table, obj) {
  return { TableName: table, Item: obj };
}

function keyInTable(table, obj) {
  return { TableName: table, Key: obj };
}

function queryFindUserBy(prop, value) {
  return {
    TableName: 'users',
    KeyConditionExpression: '#k = :v',
    ExpressionAttributeNames: { '#k': prop },
    ExpressionAttributeValues: { ':v': value },
  };
}

function unconditionallyUpdater(obj) {
  const baseObj = {
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };

  return Object.entries(obj).reduce((acc, [key, value], i) => {
    acc.UpdateExpression =
      i === 0
        ? `${acc.UpdateExpression}set #${i} = :${i}`
        : `${acc.UpdateExpression}, #${i} = :${i}`;

    acc.ExpressionAttributeNames[`#${i}`] = key;
    acc.ExpressionAttributeValues[`:${i}`] = value;

    return acc;
  }, baseObj);
}

module.exports = {
  itemInTable: curryN(2, itemInTable),
  keyInTable: curryN(2, keyInTable),
  queryFindUserBy: curryN(2, queryFindUserBy),
  unconditionallyUpdater,
};
