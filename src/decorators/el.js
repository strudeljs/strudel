/**
 * Element decorator for functions
 * @param {Object} params
 * @returns (Function} decorator
 */
export default function decorator(selector) {
  return function _decorator(klass, property) {
    if (!event) {
      throw new Error('Selector must be provided for El decorator');
    }
    if (!klass._els) {
      klass._els = [];
    }
    klass._els[selector] = property;
  };
}
