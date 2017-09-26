import $ from './element';

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
    Array.from(this.registry.getSelectors()).forEach((selector) => {
      [].forEach.call(container.querySelectorAll(selector), (element) => {
        if (!element.scope) {
          const el = $(element);
          element.scope = this.createComponent(el, this.registry.getComponent(selector));
        }
      });
    });
  }

  /**
   * Creates instance of {Component} for provided DOM element
   * @param {DOMElement} element
   * @param {Function} constructor
   */
  createComponent(element, Klass) {
    const data = element.data();
    return new Klass({ element, data });
  }
}

export default Linker;
