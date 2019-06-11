import $ from '../dom/element';
import config from '../config';
import { warn } from '../util/error';

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
      if (container !== document && $(container).is(config.initializedSelector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (el.__strudel__) {
          el.__strudel__.$teardown();
        }
      });
    });
  }

  /**
   * Iterates over selectors in registry, find occurrences in container and initialize components
   * @param {DOMElement} container
   */
  link(container = document) {
    const isRootNode = (container === document);

    const selectors = (isRootNode)
      ? this.registry.getSelectorsFromRegistrationQueue()
      : this.registry.getRegisteredSelectors();

    if (selectors.length === 0) {
      return;
    }

    selectors.forEach((selector) => {
      const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(selector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (!el.__strudel__) {
          const element = $(el);
          const data = element.data();
          const Instance = this.registry.getComponent(selector);
          el.__strudel__ = new Instance({ element, data });
        } else {
          warn(`Trying to attach component to already initialized node, component with selector ${selector} will not be attached`);
        }
      });
    });

    if (isRootNode) {
      this.registry.setSelectorsAsRegistered();
    }
  }
}

export default Linker;
