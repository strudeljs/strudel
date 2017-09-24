import Registry from '../core/registry';
import Component from '../core/component';
import mixin from '../util/mixin';

const registry = new Registry();

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const component = (target, selector) => {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  const klass = class extends Component {
    constructor(...args) { /* eslint no-useless-constructor: 0 */
      super(...args);
    }
  };

  mixin(klass, target);
  Object.defineProperty(klass.prototype, '_selector', { value: selector });
  registry.registerComponent(selector, klass);

  return klass;
};

export default (selector) => {
  return (target) => {
    return component(target, selector);
  };
};
