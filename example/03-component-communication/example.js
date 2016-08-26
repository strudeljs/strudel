import { Component, DOMEvent } from 'quantum';

@Component({
  selector: '.counter'
})
class Counter {
  @DOMEvent('click .counter-increment')
  increment() {
    this.emit('counter.increment');
  }

  @DOMEvent('click .counter-decrement')
  decrement() {
    this.emit('counter.decrement');
  }
}

@Component({
  selector: '.count'
})
class Count {
  constructor(element) {
    this.element = element;
    this.count = 0;
    this.on('counter.increment', () => this.count++);
    this.on('counter.decrement', () => this.count--);
  }

  get count() {
    return this.count;
  }

  set count(val) {
    this.count = val;
    this.render();
  }

  render() {
    this.element.html(`<h1>Count: ${this.count}</h1>`);
  }
}
