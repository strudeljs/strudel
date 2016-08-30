/**
 * Class linking components with DOM
 */
class Linker {
  /**
   * @constructor
   * @param {Registry} component registry
   */
  constructor(registry) {
    this.registry = registry;
  }

  /**
   *
   */
  linkAll() {
    this.link(document);
  }

  /**
   * Iterates over selectors in registry, find occurrences in container and initialize components
   * @param {DOMElement} container
   */
  link(container) {
    for (let selector of this.registry.getSelectors()) {
      [].forEach(container.querySelectorAll(selector), (element) => {
        this.createComponent(element, this.registry.getComponent(selector));
      });
    }
  }

  /**
   * Creates instance of {Component} for provided DOM element
   * @param {DOMElement} element
   * @param {Function} constructor
     */
  createComponent(element, klass) {
    return new klass(element);
  }
}

/**
 * Registry
 * @type {Map}
 */
const registry$1 = new Map();

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
    return registry$1.keys();
  }

  /**
   * Clears registry
   */
  clear() {
    registry$1.clear();
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
     */
  getComponent(selector) {
    return registry$1.get(selector);
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  registerComponent(selector, klass) {
    registry$1.set(selector, klass);
  }
}

const registry = new Registry();
const linker = new Linker(registry);

const bootstrap = () => {
  document.addEventListener('DOMContentLoaded', linker.linkAll);
}

/**
 * Check if passed parameter is a function
 * @param obj
 * @returns {boolean}
 */
const isFunction = (obj) => {
  return typeof obj == 'function' || false;
}

/**
 * Simple Event Emitter implementation
 */
class EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    this._listeners = new Map();
  }

  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */
  addListener(label, callback) {
    this._listeners.has(label) || this._listeners.set(label, []);
    this._listeners.get(label).push(callback);
  }

  /**
   * Remove event listener from registry
   * @param {string} label
   * @param {Function} callback
   * @returns {boolean}
   */
  removeListener(label, callback) {
    let listeners = this._listeners.get(label),
      index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback) ? i = index : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this._listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }

  /**
   * Notifies liteners attached to event
   * @param {string} label
   * @param args
   * @returns {boolean}
   */
  emit(label, ...args) {
    let listeners = this._listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}

const emitter = new EventEmitter();

/**
 * Base class for all components, implementing event emitter
 */
class Component {
  /**
   * Facade for EventEmitter addListener
   * @link EventEmitter#addListener
   */
  on(label, callback) {
    emitter.addListener(label, callback);
  }

  /**
   * Facade for EventEmitter removeListener
   * @link EventEmitter#removeListener
   */
  off(label, callback) {
    emitter.removeListener(label, callback);
  }

  /**
   * Facade for EventEmitter emit
   * @link EventEmitter#emit
   */
  emit(label, ...args) {
    emitter.emit(label, ...args);
  }
}

/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
const mixin = (target, source) => {
  target = target.prototype;
  source = source.prototype;

  Object.getOwnPropertyNames(source).forEach(function (name) {
    if (name !== "constructor") Object.defineProperty(target, name,
      Object.getOwnPropertyDescriptor(source, name));
  });
}

const registry$2 = new Registry();

/**
 * Component decorator for classes
 * @param {Object} params
 * @returns (Function} decorator
 */
function decorator(params) {
  return function _decorator(klass) {
    if (!params || !params.selector) {
      throw new Error('Selector must be provided for Component decorator');
    }
    mixin(klass, Component);
    Object.defineProperty(klass.prototype, '_selector', { value: params.selector });
    registry$2.registerComponent(params.selector, klass);
  }
}

bootstrap();

export { decorator as Component, EventEmitter };