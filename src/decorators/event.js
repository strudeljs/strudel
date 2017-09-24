/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default function decorator(event) {
  return function _decorator(klass, method) {
    if (!event) {
      throw new Error('Event descriptor must be provided for Evt decorator');
    }
    if (!klass._events) {
      klass._events = [];
    }
    klass._events[event] = klass[method];
  };
}
