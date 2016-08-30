import { Component } from 'quantum';

@Component('.greeter')
class Greeter {
  constructor(element) {
    element.html("Hello world!");
  }
}
