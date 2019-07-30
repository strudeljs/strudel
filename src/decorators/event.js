import handleError, { warn } from '../util/error';
import { createDecorator } from '../util/helpers';

const delegate = (element, eventName, selector, listener, componentName) => {
  if (selector) {
    element.on(eventName, selector, listener, componentName);
  } else {
    element.on(eventName, listener, null, componentName);
  }
};

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default createDecorator((component, property, params) => {
  let event;
  let selector;

  if (!params || !params[0]) {
    warn('Event descriptor must be provided for Evt decorator');
  } else {
    [event, selector] = params;
  }

  if (!component._events) {
    component._events = [];
  }

  const callback = function handler(...argz) {
    try {
      component[property].apply(this, argz);
    } catch (e) {
      handleError(e, component.constructor, 'component handler');
    }
  };

  if (event) {
    const eventName = (selector) ? `${event} ${selector}` : event;

    component._events[eventName] = callback;
    delegate(component.$element, event, selector, callback.bind(component), component.name);
  }
});
