import registry from './core/registry';
import config from './config';

const VERSION = '__VERSION__';
const INIT_CLASS = config.initializedClassName;
const INIT_SELECTOR = config.initializedSelector;

const options = {
  components: registry.getData()
};

export { VERSION, INIT_CLASS, INIT_SELECTOR, options, config };
export { default as Component } from './decorators/component';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as OnInit } from './decorators/onInit';
export { default as EventEmitter } from './util/eventEmitter';
export { createDecorator } from './util/helpers';
export { default as Element, default as $ } from './dom/element';
