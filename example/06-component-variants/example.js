import { Component, DOMEvent } from 'strudel';

@Component('.carousel')
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
