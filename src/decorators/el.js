/**
 * Element decorator - Creates {@link Element} for matching selector and assigns to decorated property.
 * @param {string} CSS selector
 * @returns (Function} decorator
 */
export default function decorator(selector) {
  return function _decorator(klass, property) {
    if (!selector) {
      throw new Error('Selector must be provided for El decorator');
    }
    if (!klass._els) {
      klass._els = [];
    }
    klass._els[selector] = property;
  };
}
