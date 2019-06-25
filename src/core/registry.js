import { warn } from '../util/error';
import { mergeObjects, createCustomEvent } from '../util/helpers';

/**
 * Simple registry for storing selector-constructor pairs
 */
class Registry {
  /**
   * @constructor
   */
  constructor() {
    this._registry = {};
    this._registrationQueue = {};
    this._isRegistrationScheduled = false;
  }

  /**
   * Returns both permanent registry and the registration queue entires as one object
   * @returns {{}|*}
   */
  getData() {
    return mergeObjects(this._registry, this._registrationQueue);
  }

  /**
   * Returns an Array of registry entires
   * @returns {Array} registry entries
   */
  getRegisteredSelectors() {
    return Object
      .keys(this._registry);
  }

  /**
   * Returns an Array of temporary registry entires
   * @returns {Array} registry entries
   */
  getSelectorsFromRegistrationQueue() {
    return Object
      .keys(this._registrationQueue);
  }

  /**
   * Moves all entries from the registration queue to permanent registry and clears queue
   * @param {string} selector
   */
  setSelectorsAsRegistered() {
    this._registry = mergeObjects(this._registry, this._registrationQueue);
    this._registrationQueue = {};
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  getComponent(selector) {
    return this._registrationQueue[selector] || this._registry[selector];
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
   */
  registerComponent(selector, klass) {
    if (this._registry[selector] || this._registrationQueue[selector]) {
      warn(`Component registered under selector: ${selector} already exists.`, klass);
    } else {
      this._registrationQueue[selector] = klass;

      if (!this._isRegistrationScheduled) {
        this._isRegistrationScheduled = true;

        window.requestAnimationFrame(() => {
          const ev = createCustomEvent('content:loaded');
          document.dispatchEvent(ev);
        });
      }
    }
  }
}

export default new Registry();
