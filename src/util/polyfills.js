/* eslint-disable */

Array.prototype.find = Array.prototype.find || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  const list = Object(this);
  // Makes sures is always has an positive integer as length.
  const length = list.length >>> 0;
  const thisArg = arguments[1];
  for (let i = 0; i < length; i++) {
    const element = list[i];
    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
};
