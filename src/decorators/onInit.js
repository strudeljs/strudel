import { createDecorator } from '../util/helpers';

/**
 * OnInit decorator - sets method to be run at init
 * @returns {Function} decorator
 */

export default createDecorator((component, property) => {
  const emptyFnc = function () {};
  const org = component.init || emptyFnc;

  component.init = function (...args) {
    component[property].apply(this, ...args);
    return org.apply(this, ...args);
  };
})();
