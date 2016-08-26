/**
 * Registry
 * @type {Map}
 */
const registry = new Map();

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
   * @returns {Iterator.<string>}
     */
  getSelectors() {
    return registry.keys();
  }

  /**
   * Clears registry
   */
  clear() {
    registry.clear();
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
     */
  getComponent(selector) {
    return registry.get(selector);
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  registerComponent(selector, klass) {
    registry.set(selector, klass);
  }
}

export default Registry;
