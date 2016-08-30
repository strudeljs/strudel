import { Component, DOMEvent } from 'strudel';

@Component('.toggle')
class Toggle {
  constructor({element}) {
    this.element = element;
  }

  @DOMEvent('click .toggle-trigger')
  toggle() {
    this.element.find('.toggle-content').toggleClass('is-visible');
  }
}
