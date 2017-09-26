import Registry from '../core/registry';
import Component from '../core/component';
import mixin from '../util/mixin';

const registry = new Registry();

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const register = (target, selector) => {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  const component = class extends Component {
    constructor(...args) { /* eslint no-useless-constructor: 0 */
      super(...args);
    }
  };

  mixin(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  registry.registerComponent(selector, component);

  return component;
};

export default (selector) => {
  return (target) => {
    return register(target, selector);
  };
};
