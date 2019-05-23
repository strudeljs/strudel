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
    this._tempRegistry = {};
  }

  /**
   * Retunrs all registry data
   * @returns {{}|*}
   */
  getData() {
    return Object.assign(this._registry, this._tempRegistry);
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
  getNewlyRegisteredSelectors() {
    return Object
      .keys(this._tempRegistry);
  }

  /**
   * Moves selected registry entry from temporary to permanent
   * @param {string} selector
   */
  setSelectorAsRegistered(selector) {
    this._registry[selector] = this._tempRegistry[selector];
    delete this._tempRegistry[selector];
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  getComponent(selector) {
    return this._tempRegistry[selector];
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
   */
  registerComponent(selector, klass) {
    if (this._registry[selector] || this._tempRegistry[selector]) {
      warn(`Component registered under selector: ${selector} already exists.`, klass);
    } else {
      this._tempRegistry[selector] = klass;
    }
  }
}

export default new Registry();
