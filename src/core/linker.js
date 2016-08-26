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

export default Linker;
