import { Component, Inject } from 'quantum';

class Browser {
  isLegacyBrowser() {
    return true;
  }
}

@Component('.canvas')
class Canvas {
  @Inject('element', 'Browser');
  constructor({element, browser}) {
    this.element = element;
    if (browser.isLegacyBrowser()) {
      throw new Error();
    }
  }
}
