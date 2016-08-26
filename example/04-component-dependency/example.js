import { Component } from 'quantum';

class Browser {
  isLegacyBrowser() {
    return true;
  }
}

@Component({
  selector: '.canvas',
  require: ['element', 'Browser']
})
class Canvas {
  constructor(element, browser) {
    this.element = element;

    if (browser.isLegacyBrowser()) {
      throw new Error();
    }
  }
}
