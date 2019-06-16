import handleError, { warn } from '../util/error';
import { createDecorator } from '../util/helpers';

const delegate = (element, eventName, selector, listener) => {
  if (selector && typeof selector !== 'boolean') {
    element.on(eventName, selector, listener);
  } else {
    element.on(eventName, listener);
  }
};

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
export default createDecorator((component, property, params) => {
  if (!params || !params[0]) {
    warn('Event descriptor must be provided for Evt decorator');
  }

  if (!component._events) {
    component._events = [];
  }

  const shouldPreventDefault =
    !!((typeof params[1] === 'boolean' && params[1] === true)
    || (typeof params[2] === 'boolean' && params[2] === true));

  const cb = function handler(...args) {
    try {
      component[property].apply(this, args);
    } catch (e) {
      handleError(e, component.constructor, 'component handler');
    }

    if (shouldPreventDefault) {
      args[0].preventDefault();
    }
  };

  if (params && params[0]) {
    const eventName = (typeof params[1] === 'boolean')
      ? params[0] : `${params[0]} ${params[1]}`;

    component._events[eventName] = cb;
    delegate(component.$element, params[0], params[1], cb.bind(component));
  }
});
