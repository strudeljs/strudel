import registry from '../core/registry';
import Component from '../component/instance';
import { mixPrototypes } from '../util/helpers';
import { warn } from '../util/error';

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const register = (target, selector) => {
  if (target.kind === 'class' && selector) {
    const component = class extends Component {
      constructor(...args) { /* eslint no-useless-constructor: 0 */
        super(...args);
      }
    };

    return {
      ...target,
      finisher: (targetClass) => {
        mixPrototypes(component, targetClass);
        Object.defineProperty(component.prototype, '_selector', { value: selector });
        Object.defineProperty(component.prototype, 'isStrudelClass', { value: true });
        Object.defineProperty(component, 'name', { value: targetClass.name });
        registry.registerComponent(selector, component);

        return component;
      }
    };
  }
  if (!selector) {
    warn('Selector must be provided for Component decorator', target);
    return target;
  }
  warn('Decorator works only for classes', target);
  return target;
};

export default function decorator(selector) {
  return function _decorator(target) {
    return register(target, selector);
  };
}
