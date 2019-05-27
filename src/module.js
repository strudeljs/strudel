import registry from './core/registry';
import conf from './config';

const VERSION = '__VERSION__';
const config = conf;
const INIT_CLASS = config.initializedClassName;
const INIT_SELECTOR = config.initializedSelector;
const options = {
  components: registry.getData()
};

export { VERSION, INIT_CLASS, INIT_SELECTOR, options };
export { default as EventEmitter } from './util/eventEmitter';
export { default as Component } from './decorators/component';
export { default as Evt } from './decorators/event';
export { default as El } from './decorators/el';
export { default as OnInit } from './decorators/onInit';
/* Backward compatibility */
export { default as element, default as $ } from './dom/element';
