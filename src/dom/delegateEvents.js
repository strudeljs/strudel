import nonBubblingEvents from '../util/nonBubblingEvents';

const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

/**
 * Utility for checking if event can bubble
 * @param {string} eventName - name of the event eg. click
 */
const canBubble = (eventName) => {
  return nonBubblingEvents.includes(eventName);
};

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

  return Object.keys(events).forEach((key) => {
    const method = events[key];
    const match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.$element) {
      const eventName = match[1];
      const selector = match[2];
      let $el = context.$element;

      if (selector && canBubble(eventName)) {
        $el = $el.find(selector) || $el;
        delegate($el, eventName, method.bind(context));
        return;
      }

      delegate($el, eventName, selector, method.bind(context));
    }
  });
};

export { delegateEvents, delegate };
