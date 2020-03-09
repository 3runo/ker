const curryN = require("lodash/fp/curryN");

function itemInTable(table, obj) {
  return { TableName: table, Item: obj };
}

function keyInTable(table, obj) {
  return { TableName: table, Key: obj };
}

function uniq(shardId) {
  const number = 512;
  const randomId = Math.floor(Math.random() * number);
  let ts = new Date().getTime() - 553262400000;
  ts = ts * 64;
  ts = ts + shardId;

  return ts * number + (randomId % number);
}

module.exports = {
  itemInTable: curryN(2, itemInTable),
  keyInTable: curryN(2, keyInTable),
  uniq
};
