import { Component } from 'strudel';

@Component('.greeter')
class Greeter {
  constructor(element) {
    element.html("Hello world!");
  }
}
