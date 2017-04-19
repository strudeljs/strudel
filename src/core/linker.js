import DOMElement from './dom';

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
      [].forEach.call(container.querySelectorAll(selector), (element) => {
        if (!element._instance) {
          const el = new DOMElement(element);
          element._instance = this.createComponent(el, this.registry.getComponent(selector));
        }
      });
    }
  }

  /**
   * Creates instance of {Component} for provided DOM element
   * @param {DOMElement} element
   * @param {Function} constructor
     */
  createComponent(element, klass) {
    const data = element.data();
    return new klass({ element, data });
  }
}

export default Linker;
