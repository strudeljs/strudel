/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default function decorator(event, preventDefault) {
  return function _decorator(klass, method) {
    if (!event) {
      throw new Error('Event descriptor must be provided for Evt decorator');
    }

    if (!klass._events) {
      klass._events = [];
    }

    const cb = !preventDefault ? klass[method] : function (...args) {
      klass[method].apply(this, args);
      args[0].preventDefault();
    };

    klass._events[event] = cb;
  };
}
