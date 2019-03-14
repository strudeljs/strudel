import registry from '../core/registry';
import Component from '../component/instance';
import { mixPrototypes } from '../util/helpers';
import { warn } from '../util/error';

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const register = (target, selector) => {
  if (!selector) {
    warn('Selector must be provided for Component decorator', target);
  }

  if (!target.prototype) {
    warn('Decorator works only for classes', target);
    return target;
  }

  const component = class extends Component {
    constructor(...args) { /* eslint no-useless-constructor: 0 */
      super(...args);
    }
  };

  mixPrototypes(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  Object.defineProperty(component.prototype, 'isStrudelClass', { value: true });
  Object.defineProperty(component.prototype, 'name', { value: target.name });
  registry.registerComponent(selector, component);

  return component;
};

export default function decorator(selector) {
  return function _decorator(target) {
    return register(target, selector);
  };
}
