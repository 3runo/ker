const isNumber = require("lodash/fp/isNumber");

function realTypeOf(it) {
  return Object.prototype.toString.call(it);
}

function tryParseNumber(n) {
  const it = Number(n);
  return isNumber(it) && !Number.isNaN(it) ? it : undefined;
}

module.exports = {
  realTypeOf,
  tryParseNumber
};
