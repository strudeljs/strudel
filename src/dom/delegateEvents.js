/**
 * Wrapper for Element on method
 * @param {Element} element - element that will receive listener
 * @param {string} eventName - name of the event eg. click
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - function listener
 */
const delegate = (element, eventName, selector, listener) => {
  if (selector) {
    element.on(eventName, selector, listener);
  } else {
    element.on(eventName, listener);
  }
};

/**
 * Utility for binding events to class methods
 * @param {Component} context - context Component to bind elements for
 * @param {object} events - map of event strings / methods
 * @returns {*}
 */
const delegateEvents = (context, events) => {
  if (!events) {
    return false;
  }

  return events.forEach(({ event, selector, callback }) => {
    if (context.$element) {
      delegate(context.$element, event, selector, callback.bind(context));
    }
  });
};

export { delegateEvents, delegate };
