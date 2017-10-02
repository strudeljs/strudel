/**
 * Registry
 * @type {Map}
 */
const registry = {};

/**
 * Singleton instance
 * @type {Object}
 */
let instance = null;

/**
 * Simple registry for storing selector-constructor pairs
 */
class Registry {

  /**
   * @constructor
   */
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Returns keys from registry
   * @returns {Array.<string>}
     */
  getSelectors() {
    return Object.keys(registry);
  }

  /**
   * Clears registry
   */
  clear() {
    this.getSelectors().forEach((selector) => {
      delete registry[selector];
    });
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
     */
  getComponent(selector) {
    return registry[selector];
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  registerComponent(selector, klass) {
    registry[selector] = klass;
  }
}

export default Registry;
