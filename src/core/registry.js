import { warn } from '../util/error';

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
  }

  /**
   * Returns both permanent registry and the registration queue entires
   * @returns {{}|*}
   */
  getData() {
    const registryArray = [this._registry, this._registrationQueue];

    const mergedRegistry = registryArray.reduce((prev, curr) => {
      Object.keys(curr).forEach((key) => {
        prev[key] = curr[key];
      });
      return prev;
    });

    return mergedRegistry;
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
   * Moves selected registry entry from temporary to permanent
   * @param {string} selector
   */
  setSelectorAsRegistered(selector) {
    this._registry[selector] = this._registrationQueue[selector];
    delete this._registrationQueue[selector];
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  getComponent(selector) {
    if (this._registrationQueue[selector]) {
      return this._registrationQueue[selector];
    }
    return this._registry[selector];
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
    }
  }
}

export default new Registry();
