import { Component, DOMEvent } from 'quantum';

@Component({
  selector: '.carousel'
})
class Carousel {
  constructor(element) {
    this.element = element;
  }

  @DOMEvent('click .carousel-next')
  @DOMEvent('click .carousel-prev')
  slide() {

  }
}

/* TODO: Handle variants exclusiveness/extensiveness */
/* TODO: Handle media queries component different behaviour  */
