/**
 * Simple registry for storing selector-constructor pairs
 */
class Registry {
  /**
   * @constructor
   */
  constructor() {
    this._registry = {};
  }

  /**
   * Retunrs all registry data
   * @returns {{}|*}
   */
  getData() {
    return this._registry;
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  getComponent(selector) {
    return this._registry[selector];
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  registerComponent(selector, klass) {
    this._registry[selector] = klass;
  }
}

export default new Registry();
