import { Component } from 'quantum';

@Component({
  selector: '.greeter'
})
class Greeter {
  constructor(element) {
    element.html("Hello world!");
  }
}
