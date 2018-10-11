import handleError, { warn } from '../util/error';

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default function decorator(event, preventDefault) {
  return function _decorator(target) {
    if (!event) {
      warn('Event descriptor must be provided for Evt decorator');
    }

    return {
      ...target,
      finisher: (targetClass) => {
        if (!targetClass.prototype._events) {
          targetClass.prototype._events = [];
        }

        const callback = function handler(...args) {
          try {
            targetClass.prototype[target.key].apply(this, args);
          } catch (e) {
            handleError(e, targetClass.constructor, 'component handler');
          }

          if (preventDefault) {
            args[0].preventDefault();
          }
        };

        targetClass.prototype._events[event] = callback;
        return targetClass;
      }
    };
  };
}
