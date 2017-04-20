/**
 * Dom decorator for functions
 * @param {Object} params
 * @returns (Function} decorator
 */
export default function decorator(selector) {
  return function _decorator(klass, property) {
    if (!event) {
      throw new Error('Selector must be provided for Evt decorator');
    }
    if (!klass._dom) {
      klass._dom = [];
    }
    klass._dom[selector] = klass[property];
  };
}
