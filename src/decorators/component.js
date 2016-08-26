import Registry from '../core/registry';
import Component from '../core/component';
import mixin from '../util/mixin';

const registry = new Registry();

/**
 * Component decorator for classes
 * @param {Object} params
 * @returns (Function} decorator
 */
export default function decorator(params) {
  return function _decorator(klass) {
    if (!params || !params.selector) {
      throw new Error('Selector must be provided for Component decorator');
    }
    mixin(klass, Component);
    Object.defineProperty(klass.prototype, '_selector', { value: params.selector });
    registry.registerComponent(params.selector, klass);
  }
}
