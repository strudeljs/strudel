import { warn } from '../util/error';

/**
 * Element decorator - Creates {@link Element} for matching selector and assigns to decorated property.
 * @param {string} CSS selector
 * @returns (Function} decorator
 */
export default function decorator(selector) {
  return function _decorator(target) {
    if (!selector) {
      warn('Selector must be provided for El decorator', target);
      return target;
    }
    return {
      ...target,
      finisher: (targetClass) => {
        if (!targetClass._els) {
          targetClass.prototype._els = {};
        }
        targetClass.prototype._els[selector] = target.key;
        return targetClass;
      }
    };
  };
}
