const isNumber = require("lodash/fp/isNumber");

function realTypeOf(it) {
  return Object.prototype.toString.call(it);
}

function tryParseNumber(n) {
  const it = Number(n);
  return isNumber(it) && !Number.isNaN(it) ? it : undefined;
}

function removeEmptyStringProps(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {});
}

module.exports = {
  realTypeOf,
  removeEmptyStringProps,
  tryParseNumber
};
