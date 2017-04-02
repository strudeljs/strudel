class DOMElement {
  constructor(element) {
    this["0"] = element;
  }

  html(html) {
    if (!arguments.length) {
      return this["0"].innerHTML;
    }
    this["0"].innerHTML = html;
    return this;
  }

  detach() {
    this["0"].remove();
    return this;
  }

  append(element) {
    this["0"].appendChild(element);
    return this;
  }

  find(selector) {
    return this["0"].querySelector(selector);
  }

  addClass() {
    this["0"].classList.add(className);
    return this;
  }

  removeClass(className) {
    this["0"].classList.remove(className);
    return this;
  }

  toggleClass(className, condition) {
    this["0"].classList.toggle(className, condition);
    return this;
  }

  data() {
    return this["0"].dataset;
  }
}

export default DOMElement;
