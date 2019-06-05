import { warn } from '../util/error';
import { createDecorator } from '../util/helpers';

/**
 * Element decorator - Creates {@link Element} for matching selector and assigns to decorated property.
 * @param {string} CSS selector
 * @returns (Function} decorator
 */
export default createDecorator((component, property, ...params) => {
  if (params && params[0]) {
    component[property] = component.$element.find(params[0]);
  } else {
    warn('Selector must be provided for El decorator');
  }

  if (!component._els) {
    component._els = [];
  }

  component._els[property] = property;
});
