import { Component, Observe, DOMEvent } from 'strudel';

@Component('.counter')
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

@Component('.count')
class Count {
  constructor(element) {
    this.element = element;
    this.count = 0;
    this.on('counter.increment', () => this.count++);
    this.on('counter.decrement', () => this.count--);
  }

  @Observe(count)
  render() {
    this.element.html(`<h1>Count: ${this.count}</h1>`);
  }
}
