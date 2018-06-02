import { isFunction } from './helpers';

/**
 * Event listeners
 * @type {{}}
 */
const events = {};

/**
 * Get event listeners
 * @returns {{}}
 */
const getEvents = () => {
  return events;
};

/**
 * Remove all event listeners
 */
const removeAllListeners = () => {
  Object.keys(events).forEach((prop) => {
    delete events[prop];
  });
};

/**
 * @classdesc Simple Event Emitter implementation - global
 * @class
 */
class EventEmitter {
  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */
  $on(label, callback) {
    if (!events[label]) {
      events[label] = [];
    }
    events[label].push(callback);
  }

  /**
   * Remove event listener from registry
   * @param {string} label
   * @param {Function} callback
   * @returns {boolean}
   */
  $off(label, callback) {
    const listeners = events[label];

    if (listeners && listeners.length) {
      const index = listeners.reduce((i, listener, ind) => {
        return (isFunction(listener) && listener === callback) ? i = ind : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        events[label] = listeners;
        return true;
      }
    }
    return false;
  }

  /**
   * Notifies listeners attached to event
   * @param {string} label
   * @param args
   * @returns {boolean}
   */
  $emit(label, ...args) {
    const listeners = events[label];

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}

export { getEvents, removeAllListeners };
export default EventEmitter;
