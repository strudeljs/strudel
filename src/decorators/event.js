import handleError, { warn } from '../util/error';

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default function decorator(event, preventDefault) {
  return function _decorator(klass, method) {
    if (!event) {
      warn('Event descriptor must be provided for Evt decorator');
    }

    if (!klass._events) {
      klass._events = [];
    }

    const cb = function handler(...args) {
      try {
        klass[method].apply(this, args);
      } catch (e) {
        handleError(e, klass.constructor, 'component handler');
      }

      if (preventDefault) {
        args[0].preventDefault();
      }
    };

    klass._events[event] = cb;
  };
}
