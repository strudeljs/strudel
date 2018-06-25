/**
 * Utility for binding elements to class properties
 * @param {Component} context Component to bind elements for
 * @param {object} elements Map of elements / properties of class
 * @returns {*}
 */
const bindElements = (context, elements) => {
  if (!elements) {
    return false;
  }

  return Object.keys(elements).forEach((key) => {
    const property = elements[key];
    if (context.$element) {
      context[property] = context.$element.find(key);
    }
  });
};

export default bindElements;
