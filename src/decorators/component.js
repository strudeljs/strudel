import registry from '../core/registry';
import Component from '../component/instance';
import { mixPrototypes } from '../util/helpers';

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const register = (target, selector) => {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  if (!target.prototype) {
    throw new Error('Decorator works only for classes');
  }

  const component = class extends Component {
    constructor(...args) { /* eslint no-useless-constructor: 0 */
      super(...args);
    }
  };

  mixPrototypes(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  Object.defineProperty(component.prototype, 'isStrudelClass', { value: true });
  registry.registerComponent(selector, component);

  return component;
};

export default function decorator(selector) {
  return function _decorator(target) {
    return register(target, selector);
  };
}
