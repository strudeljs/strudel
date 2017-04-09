import Registry from '../core/registry';
import Component from '../core/component';
import mixin from '../util/mixin';

const registry = new Registry();

const component = (target, selector) => {
  if (!selector) {
    throw new Error('Selector must be provided for Component decorator');
  }

  let component = class extends Component {
    constructor(...args) {
      super(...args);
    }
  }

  mixin(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  registry.registerComponent(selector, component);

  return component;
}

export default (selector) => {
  return (target) => component(target, selector)
}
