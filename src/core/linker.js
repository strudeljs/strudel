import $ from '../dom/element';
import config from '../config';

const initializedSelector = `.${config.initializedClassName}`;

/**
 * @classdesc Class linking components with DOM
 * @class
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
   * Finds all components within selector and destroy them
   * @param {DOMElement} container
   */
  unlink(container = document) {
    this.registry.getRegisteredSelectors().forEach((selector) => {
      const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(initializedSelector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (el.component) {
          el.component.$teardown();
        }
      });
    });
  }

  /**
   * Iterates over selectors in registry, find occurrences in container and initialize components
   * @param {DOMElement} container
   */
  link(container = document) {
    this.registry.getRegisteredSelectors().forEach((selector) => {
      const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(selector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (!el.component) {
          const element = $(el);
          const data = element.data();
          const Instance = this.registry.getComponent(selector);
          el.component = new Instance({ element, data });
        }
      });
    });
  }
}

export default Linker;
